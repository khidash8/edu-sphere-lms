import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { env } from '@/lib/env';
import prisma from '@/lib/db';

/**
 * Stripe Webhook Handler - POST endpoint
 *
 * This endpoint receives and processes webhook events from Stripe.
 * Primary purposes:
 * 1. Update enrollment status to ACTIVE when payment succeeds
 * 2. Update enrollment status to FAILED when payment fails
 * 3. Handle expired checkout sessions
 *
 * Webhook flow:
 * 1. Stripe sends POST request with event data
 * 2. We verify the request signature for security
 * 3. Process the event based on event type
 * 4. Update database accordingly
 *
 * @param req - The incoming webhook request from Stripe
 * @returns Response with status code
 */
export const POST = async (req: Request) => {
  // === STEP 1: GET RAW REQUEST BODY ===
  // IMPORTANT: Must use raw text body (not JSON) for signature verification
  const body = await req.text();

  // === STEP 2: GET STRIPE SIGNATURE FROM HEADERS ===
  // Stripe includes a signature header to verify the webhook is authentic
  const headersList = await headers();
  const stripeSignature = headersList.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    // === STEP 3: VERIFY WEBHOOK SIGNATURE ===
    // This prevents malicious actors from sending fake webhook events
    // constructEvent will throw an error if signature is invalid
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      env.STRIPE_WEBHOOK_SECRET // Secret key from Stripe dashboard
    );
  } catch (err) {
    // Signature verification failed - reject the request
    console.error('Webhook signature verification failed:', err);
    return new Response(`Webhook error ${err}`, { status: 400 });
  }

  // === STEP 4: EXTRACT EVENT DATA ===
  // Get the checkout session object from the event
  const session = event.data.object as Stripe.Checkout.Session;

  // === STEP 5: HANDLE DIFFERENT CHECKOUT EVENTS ===

  // ==================== SUCCESS SCENARIO ====================
  if (event.type === 'checkout.session.completed') {
    console.log('Processing completed checkout session:', session.id);

    // Extract metadata that we attached during checkout session creation
    const courseId = session.metadata?.courseId;
    const enrollmentId = session.metadata?.enrollmentId;
    const customerId = session.customer as string; // Stripe customer ID

    // === VALIDATION: CHECK REQUIRED DATA ===
    if (!courseId || !customerId || !enrollmentId) {
      console.error('Missing required metadata:', {
        courseId,
        customerId,
        enrollmentId,
      });
      return new Response('Webhook error: missing required metadata', {
        status: 400,
      });
    }

    // === STEP 6: FIND USER BY STRIPE CUSTOMER ID ===
    const user = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId,
      },
    });

    if (!user) {
      console.error('User not found for customerId:', customerId);
      return new Response('Webhook error: user not found', { status: 400 });
    }

    // === STEP 7: ACTIVATE ENROLLMENT (PAYMENT SUCCESS) ===
    await prisma.enrollment.update({
      where: {
        id: enrollmentId,
      },
      data: {
        userId: user.id,
        courseId: courseId,
        amount: session.amount_total as number, // Amount in cents
        status: 'ACTIVE', // Grant course access
        updatedAt: new Date(),
      },
    });

    console.log('Enrollment activated successfully:', enrollmentId);
  }

  // ==================== FAILURE SCENARIOS ====================

  // Payment failed during checkout (card declined, insufficient funds, etc.)
  else if (event.type === 'checkout.session.async_payment_failed') {
    console.log('Processing failed payment session:', session.id);

    const enrollmentId = session.metadata?.enrollmentId;

    if (!enrollmentId) {
      console.error('Missing enrollmentId in failed payment');
      return new Response('Webhook error: missing enrollmentId', {
        status: 400,
      });
    }

    // === UPDATE ENROLLMENT TO FAILED STATUS ===
    // This allows users to retry payment or marks the enrollment as unsuccessful
    await prisma.enrollment.update({
      where: {
        id: enrollmentId,
      },
      data: {
        status: 'FAILED', // Mark as failed
        updatedAt: new Date(),
      },
    });

    console.log('Enrollment marked as failed:', enrollmentId);
  }

  // Checkout session expired (user didn't complete payment within time limit)
  else if (event.type === 'checkout.session.expired') {
    console.log('Processing expired checkout session:', session.id);

    const enrollmentId = session.metadata?.enrollmentId;

    if (!enrollmentId) {
      console.error('Missing enrollmentId in expired session');
      return new Response('Webhook error: missing enrollmentId', {
        status: 400,
      });
    }

    // === UPDATE ENROLLMENT TO CANCELLED STATUS ===
    // User abandoned checkout - mark enrollment as cancelled
    await prisma.enrollment.update({
      where: {
        id: enrollmentId,
      },
      data: {
        status: 'CANCELLED', // Mark as cancelled/expired
        updatedAt: new Date(),
      },
    });

    console.log('Enrollment marked as cancelled (expired):', enrollmentId);
  }

  // ==================== OTHER EVENTS ====================
  else {
    // Log unhandled events for monitoring (optional)
    console.log('Unhandled webhook event type:', event.type);
  }

  // === STEP 8: ACKNOWLEDGE WEBHOOK RECEIPT ===
  // Return 200 status to Stripe to confirm successful processing
  // If we don't return 200, Stripe will retry sending the webhook
  return new Response('Webhook processed', { status: 200 });
};
