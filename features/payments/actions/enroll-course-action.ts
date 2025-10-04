'use server';

import prisma from '@/lib/db';
import { getAuthenticatedSession } from '@/data-access-layer/validate-user';
import { ApiResponse } from '@/lib/general-types';
import { stripe } from '@/lib/stripe';
import { env } from '@/lib/env';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import arcjet, { fixedWindow } from '@/lib/arcjet';
import { request } from '@arcjet/next';
import { revalidatePath } from 'next/cache';
import { publicCoursesPath } from '@/features/constants/path-constants';

// Configure Arcjet security rules
// - Rate limiting: Maximum 5 requests per minute window
const aj = arcjet.withRule(
  fixedWindow({
    mode: 'LIVE',
    window: '1m',
    max: 5,
  })
);

/**
 * Server action to enroll a user in a course and create a Stripe checkout session
 * @param courseId - The ID of the course to enroll in
 * @returns ApiResponse with status and message, or redirects to Stripe checkout
 */
export const enrollCourseAction = async (
  courseId: string
): Promise<ApiResponse | never> => {
  // Get the authenticated user session
  const session = await getAuthenticatedSession();
  const user = session.user;

  let checkoutUrl = '';

  try {
    // === SECURITY CHECK ===
    // Apply Arcjet protection (bot detection + rate limiting)
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: user.id, // Use user ID as fingerprint for rate limiting
    });

    // Handle security violations
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: 'error',
          message: 'Rate limit exceeded. Try again 1 minute later',
        };
      } else {
        return {
          status: 'error',
          message: 'Bot detected. Contact support',
        };
      }
    }

    // === STEP 1: VERIFY COURSE EXISTS ===
    // Fetch course details from database
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
        title: true,
        price: true,
        slug: true,
        stripePriceId: true,
      },
    });

    // Return error if course doesn't exist
    if (!course) {
      return {
        status: 'error',
        message: 'Course not found',
      };
    }

    // === STEP 2: GET OR CREATE STRIPE CUSTOMER ===
    // Check if user already has a Stripe customer ID
    const userWithStripeCustomerId = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    let stripeCustomerId: string;

    // If user has existing Stripe customer ID, use it
    if (userWithStripeCustomerId?.stripeCustomerId) {
      stripeCustomerId = userWithStripeCustomerId.stripeCustomerId;
    } else {
      // Create new Stripe customer if none exists
      const customer = await stripe.customers.create({
        name: user.name,
        email: user.email,
        metadata: {
          userId: user.id, // Store user ID for reference
        },
      });

      stripeCustomerId = customer.id;

      // === STEP 3: UPDATE USER WITH STRIPE CUSTOMER ID ===
      // Save the Stripe customer ID to user record
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId: stripeCustomerId,
        },
      });
    }

    // === STEP 4: CREATE ENROLLMENT & CHECKOUT SESSION ===
    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Check if user is already enrolled in this course
      const existingEnrollment = await tx.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId,
          },
        },
        select: {
          status: true,
          id: true,
        },
      });

      // If already actively enrolled, return success message
      if (existingEnrollment?.status === 'ACTIVE') {
        return {
          status: 'success',
          message: 'You are already enrolled in this course',
        };
      }

      let enrollment;

      // If enrollment exists but not active (e.g., CANCELLED or PENDING)
      if (existingEnrollment) {
        // Update existing enrollment to PENDING status
        enrollment = await tx.enrollment.update({
          where: {
            id: existingEnrollment.id,
          },
          data: {
            status: 'PENDING',
            amount: course.price,
            updatedAt: new Date(),
          },
        });
      } else {
        // Create new enrollment record with PENDING status
        enrollment = await tx.enrollment.create({
          data: {
            userId: user.id,
            courseId: courseId,
            amount: course.price,
            status: 'PENDING',
          },
        });
      }

      // === STEP 4.2: CREATE STRIPE CHECKOUT SESSION ===
      // Create checkout session for payment
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        line_items: [
          {
            price: course.stripePriceId, // Stripe price ID
            quantity: 1,
          },
        ],
        mode: 'payment', // One-time payment (not subscription)
        success_url: `${env.BETTER_AUTH_URL}/payments/success`, // Redirect on success
        cancel_url: `${env.BETTER_AUTH_URL}/payments/cancel`, // Redirect on cancel
        metadata: {
          // Store enrollment details for webhook processing
          enrollmentId: enrollment.id,
          courseId: course.id,
          userId: user.id,
        },
      });

      // Return transaction results
      return {
        enrollment,
        checkoutSession,
        checkoutUrl: checkoutSession.url,
      };
    });

    // Store checkout URL for redirect
    checkoutUrl = result.checkoutUrl as string;
  } catch (error) {
    // === ERROR HANDLING ===
    // Handle generic JavaScript errors
    if (error instanceof Error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
    // Handle Stripe-specific errors
    else if (error instanceof Stripe.errors.StripeError) {
      return {
        status: 'error',
        message: `Payment error: ${error.message}`,
      };
    }
    // Fallback error message
    return {
      status: 'error',
      message: 'Failed to enroll in course',
    };
  }

  // === REDIRECT TO STRIPE CHECKOUT ===
  // Redirect user to Stripe checkout page
  redirect(checkoutUrl);
};
