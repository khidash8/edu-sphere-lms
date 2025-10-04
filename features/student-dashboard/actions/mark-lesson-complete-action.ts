'use server';

import prisma from '@/lib/db';
import { getAuthenticatedSession } from '@/data-access-layer/validate-user';
import { ApiResponse } from '@/lib/general-types';
import { revalidatePath } from 'next/cache';

export const markLessonCompleteAction = async (
  lessonId: string,
  slug: string
): Promise<ApiResponse> => {
  const session = await getAuthenticatedSession();

  try {
    const lessonProgress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        lessonId,
        userId: session.user.id,
        completed: true,
      },
    });

    revalidatePath(`/student-dashboard/${slug}`);
    return {
      status: 'success',
      message: 'Progress marked as complete',
      data: lessonProgress,
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to mark lesson complete',
    };
  }
};
