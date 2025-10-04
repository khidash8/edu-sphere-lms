'use server';

import { validateUserRole } from '@/data-access-layer/validate-user';
import { ApiResponse } from '@/lib/general-types';
import prisma from '@/lib/db';

type GetSingleLessonActionType = {
  lessonId: string;
  chapterId: string;
  courseId: string;
};

export const getSingleLessonAction = async ({
  courseId,
  chapterId,
  lessonId,
}: GetSingleLessonActionType): Promise<ApiResponse> => {
  await validateUserRole({
    allowedRoles: ['admin', 'teacher'],
  });

  try {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
        chapterId,
      },
    });

    if (!lesson) {
      return {
        status: 'error',
        message: 'Lesson not found',
      };
    }

    return {
      status: 'success',
      message: 'Lesson fetched successfully',
      data: lesson,
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to get lesson',
    };
  }
};
