'use server';

import { checkUserRole } from '@/data-access-layer/validate-user';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { notAdminPath } from '@/features/constants/path-constants';

/**
 * Retrieves enrollment statistics for the last 30 days
 * Returns an array of daily enrollment counts
 *
 * @returns {Promise<Array<{date: string, enrollments: number}>>} Array of enrollment data by date
 * @throws {Error} If user doesn't have admin or teacher role
 */
export const getEnrollmentStatAction = async () => {
  // Ensure only admins and teachers can access enrollment statistics
  const { isAuthorized } = await checkUserRole({
    allowedRoles: ['admin', 'teacher'],
  });

  if (!isAuthorized) {
    redirect(notAdminPath());
  }

  // Calculate the date 30 days ago from today
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Fetch all enrollments created in the last 30 days
  const enrollments = await prisma.enrollment.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo, // Greater than or equal to 30 days ago
      },
    },
    select: {
      id: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc', // Order from oldest to newest
    },
  });

  // Initialize array to hold enrollment counts for each of the last 30 days
  const last30DaysEnrollments: { date: string; enrollments: number }[] = [];

  // Create entries for each of the last 30 days (starting with 0 enrollments)
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i); // Go back 'i' days from today

    last30DaysEnrollments.push({
      date: date.toISOString().split('T')[0], // Format: yyyy-mm-dd
      enrollments: 0, // Initialize with 0 (will be updated in the next loop)
    });
  }

  // Count enrollments for each day by matching enrollment dates
  enrollments.forEach((enrollment) => {
    // Extract date in yyyy-mm-dd format
    const enrollmentDate = enrollment.createdAt.toISOString().split('T')[0];

    // Find the matching day in our results array
    const dayIndex = last30DaysEnrollments.findIndex(
      (day) => day.date === enrollmentDate
    );

    // If found, increment the enrollment count for that day
    if (dayIndex !== -1) {
      last30DaysEnrollments[dayIndex].enrollments++;
    }
  });

  return last30DaysEnrollments;
};
