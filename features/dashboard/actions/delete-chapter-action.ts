'use server';

import { validateUserRole } from '@/data-access-layer/validate-user';
import { ApiResponse } from '@/lib/general-types';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { publicCoursesPath } from '@/features/constants/path-constants';

type DeleteChapterActionType = {
  courseId: string;
  chapterId: string;
};

export const deleteChapterAction = async ({
  chapterId,
  courseId,
}: DeleteChapterActionType): Promise<ApiResponse> => {
  await validateUserRole({
    allowedRoles: ['admin', 'teacher'],
  });

  try {
    // 1. find the course the chapter belongs to
    const parentCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        chapters: {
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

    if (!parentCourse) {
      return {
        status: 'error',
        message: 'Course not found',
      };
    }

    // 2. find the chapter to delete
    const chapters = parentCourse.chapters;

    const chapterToDelete = chapters.find(
      (chapter) => chapter.id === chapterId
    );
    if (!chapterToDelete) {
      return {
        status: 'error',
        message: 'Lesson not found',
      };
    }

    // 3. update the position of the remaining chapters
    const remainingLessons = chapters.filter(
      (chapter) => chapter.id !== chapterId
    );
    const updatesChapters = remainingLessons.map((chapter, index) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
          courseId,
        },
        data: {
          position: index + 1,
        },
      })
    );

    // 4. delete the chapter
    await prisma.$transaction([
      ...updatesChapters,
      prisma.chapter.delete({
        where: {
          id: chapterId,
          courseId,
        },
      }),
    ]);

    // 5. revalidate the course page
    revalidatePath(`/dashboard/courses/${courseId}/edit`);

    return {
      status: 'success',
      message: 'Chapter deleted and positions updated successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to delete chapter',
    };
  }
};
