'use server';

import { validateUserRole } from '@/data-access-layer/validate-user';
import prisma from '@/lib/db';

export const getDashboardStatsAction = async () => {
  await validateUserRole({
    allowedRoles: ['admin', 'teacher'],
  });

  const [totalSignups, totalCustomers, totalCourses, totalLessons] =
    await Promise.all([
      // total users
      prisma.user.count(),

      // total customers
      prisma.user.count({
        where: {
          enrollments: {
            some: {},
          },
        },
      }),

      // total courses
      prisma.course.count(),

      // total lessons
      prisma.lesson.count(),
    ]);

  return {
    totalSignups,
    totalCustomers,
    totalCourses,
    totalLessons,
  };
};
