'use server';

import { ApiResponse } from '@/lib/general-types';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { validateUserRole } from '@/data-access-layer/validate-user';
import { notAdminPath } from '@/features/constants/path-constants';

export const reOrderLessonsAction = async (
  chapterId: string,
  lessons: { id: string; position: number }[],
  courseId: string
): Promise<ApiResponse> => {
  await validateUserRole({
    allowedRoles: ['admin', 'teacher'],
    redirectOnFail: notAdminPath(),
  });

  try {
    if (!lessons || lessons.length === 0) {
      return {
        status: 'error',
        message: 'Lessons are required to reorder',
      };
    }

    const updatesLessons = lessons.map((lesson) =>
      prisma.lesson.update({
        where: {
          id: lesson.id,
          chapterId,
        },
        data: {
          position: lesson.position,
        },
      })
    );

    await prisma.$transaction(updatesLessons);

    revalidatePath(`/dashboard/courses/${courseId}/edit`);

    return {
      status: 'success',
      message: 'Lessons reordered successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to reorder lessons',
    };
  }
};
