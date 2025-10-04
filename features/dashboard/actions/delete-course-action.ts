'use server';

import { validateUserRole } from '@/data-access-layer/validate-user';
import { ApiResponse } from '@/lib/general-types';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import {
  dashboardCoursesPath,
  notOwnerPath,
  publicCoursesPath,
} from '@/features/constants/path-constants';
import { revalidatePath } from 'next/cache';

export const deleteCourseAction = async (
  courseId: string
): Promise<ApiResponse> => {
  const session = await validateUserRole({
    allowedRoles: ['admin', 'teacher'],
  });

  const data = await prisma.course.delete({
    where: {
      id: courseId,
      userId: session.userId,
    },
  });

  if (!data) {
    redirect(notOwnerPath());
  }

  revalidatePath(dashboardCoursesPath());

  try {
    return {
      status: 'success',
      message: 'Course deleted successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to delete course',
    };
  }
};
