'use server';

import {
  courseCreateSchema,
  CourseCreateSchemaType,
} from '@/features/dashboard/schemas/course-create-schema-type';
import { ApiResponse } from '@/lib/general-types';
import prisma from '@/lib/db';
import { validateUserRole } from '@/data-access-layer/validate-user';
import {
  notAdminPath,
  publicCoursesPath,
} from '@/features/constants/path-constants';
import arcjet, { fixedWindow } from '@/lib/arcjet';
import { request } from '@arcjet/next';
import { revalidatePath } from 'next/cache';
import { stripe } from '@/lib/stripe';

const aj = arcjet.withRule(
  fixedWindow({
    mode: 'LIVE',
    window: '1m',
    max: 5,
  })
);

interface CourseUpsertData extends CourseCreateSchemaType {
  id?: string; // Optional for create, required for update
}

export const courseUpsertAction = async (
  data: CourseUpsertData
): Promise<ApiResponse> => {
  const session = await validateUserRole({
    allowedRoles: ['admin', 'teacher'],
    redirectOnFail: notAdminPath(),
  });

  const userId = session?.user?.id;
  const isUpdate = Boolean(data.id);

  try {
    const validatedData = courseCreateSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        status: 'error',
        message: 'Invalid form data',
      };
    }

    // Apply rate limiting
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session?.user.id as string,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: 'error',
          message: 'Rate limit exceeded, try again later',
        };
      } else {
        return {
          status: 'error',
          message: 'Bot detected, contact support',
        };
      }
    }

    if (isUpdate) {
      // For updates, verify ownership
      const existingCourse = await prisma.course.findFirst({
        where: {
          id: data.id,
          userId: userId as string,
        },
        select: { id: true },
      });

      if (!existingCourse) {
        return {
          status: 'error',
          message:
            'Course not found or you do not have permission to update it',
        };
      }
    }

    const stripeProduct = await stripe.products.create({
      name: validatedData.data.title,
      description: validatedData.data.description,
      default_price_data: {
        currency: 'usd',
        unit_amount: validatedData.data.price * 100, // Stripe requires amount in cents
      },
    });

    await prisma.course.upsert({
      where: {
        id: data.id || 'new', // Use 'new' or any non-existent ID for create
      },
      update: {
        ...validatedData.data,
      },
      create: {
        ...validatedData.data,
        userId: userId as string,
        stripePriceId: stripeProduct.default_price as string,
      },
    });

    return {
      status: 'success',
      message: isUpdate
        ? 'Course updated successfully'
        : 'Course created successfully',
    };
  } catch (error) {
    console.error('Course upsert error:', error);
    return {
      status: 'error',
      message: isUpdate ? 'Failed to update course' : 'Failed to create course',
    };
  }
};
