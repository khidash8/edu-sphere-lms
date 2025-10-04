'use server';

import { validateUserRole } from '@/data-access-layer/validate-user';
import { ApiResponse } from '@/lib/general-types';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { publicCoursesPath } from '@/features/constants/path-constants';

type DeleteLessonActionType = {
  courseId: string;
  chapterId: string;
  lessonId: string;
};

export const deleteLessonAction = async ({
  lessonId,
  chapterId,
  courseId,
}: DeleteLessonActionType): Promise<ApiResponse> => {
  await validateUserRole({
    allowedRoles: ['admin', 'teacher'],
  });

  try {
    // 1. find the chapter the lesson belongs to
    const parentChapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      select: {
        lessons: {
          orderBy: {
            position: 'asc',
          },
          select: {
            id: true,
            position: true,
          },
        },
      },
    });

    if (!parentChapter) {
      return {
        status: 'error',
        message: 'Chapter not found',
      };
    }

    // 2. find the lesson to delete
    const lessons = parentChapter.lessons;

    const lessonToDelete = lessons.find((lesson) => lesson.id === lessonId);
    if (!lessonToDelete) {
      return {
        status: 'error',
        message: 'Lesson not found',
      };
    }

    // 3. update the position of the remaining lessons
    const remainingLessons = lessons.filter((lesson) => lesson.id !== lessonId);
    const updatesLessons = remainingLessons.map((lesson, index) =>
      prisma.lesson.update({
        where: {
          id: lesson.id,
          chapterId,
        },
        data: {
          position: index + 1,
        },
      })
    );

    // 4. delete the lesson
    await prisma.$transaction([
      ...updatesLessons,
      prisma.lesson.delete({
        where: {
          id: lessonId,
          chapterId,
        },
      }),
    ]);

    // 5. revalidate the course page
    revalidatePath(`/dashboard/courses/${courseId}/edit`);

    return {
      status: 'success',
      message: 'Lesson deleted and positions updated successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to delete lesson',
    };
  }
};
