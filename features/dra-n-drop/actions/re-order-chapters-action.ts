'use server';

import { ApiResponse } from '@/lib/general-types';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { validateUserRole } from '@/data-access-layer/validate-user';
import { notAdminPath } from '@/features/constants/path-constants';

export const reOrderChaptersAction = async (
  courseId: string,
  chapters: { id: string; position: number }[]
): Promise<ApiResponse> => {
  await validateUserRole({
    allowedRoles: ['admin', 'teacher'],
    redirectOnFail: notAdminPath(),
  });

  try {
    if (!chapters || chapters.length === 0) {
      return {
        status: 'error',
        message: 'Chapters are required to reorder',
      };
    }

    const updatesChapters = chapters.map((chapter) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
          courseId,
        },
        data: {
          position: chapter.position,
        },
      })
    );

    await prisma.$transaction(updatesChapters);

    revalidatePath(`/dashboard/courses/${courseId}/edit`);

    return {
      status: 'success',
      message: 'Chapters reordered successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to reorder chapters',
    };
  }
};
