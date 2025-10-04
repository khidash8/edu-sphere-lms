'use server';

import { validateUserRole } from '@/data-access-layer/validate-user';
import { ApiResponse } from '@/lib/general-types';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import {
  lessonCreateSchema,
  LessonCreateSchemaType,
} from '@/features/dashboard/schemas/course-create-schema-type';
import { publicCoursesPath } from '@/features/constants/path-constants';

export const createNewLessonAction = async (
  data: LessonCreateSchemaType
): Promise<ApiResponse> => {
  await validateUserRole({
    allowedRoles: ['admin', 'teacher'],
  });

  try {
    const validatedData = lessonCreateSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: 'error',
        message: 'Invalid form data',
      };
    }

    await prisma.$transaction(async (trx) => {
      const lastPosition = await trx.lesson.findFirst({
        where: {
          chapterId: validatedData.data.chapterId,
        },
        orderBy: {
          position: 'desc',
        },
        select: {
          position: true,
        },
      });

      const newPosition = lastPosition ? lastPosition.position + 1 : 1;

      await trx.lesson.create({
        data: {
          title: validatedData.data.title,
          chapterId: validatedData.data.chapterId,
          description: validatedData.data.description,
          videoKey: validatedData.data.videoKey,
          thumbnailKey: validatedData.data.thumbnailKey,
          position: newPosition,
        },
      });

      revalidatePath(`/dashboard/courses/${validatedData.data.courseId}/edit`);
    });

    return {
      status: 'success',
      message: 'Lesson created successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to create lesson',
    };
  }
};

export const updateLessonDetailsAction = async (
  data: LessonCreateSchemaType,
  lessonId: string
): Promise<ApiResponse> => {
  await validateUserRole({
    allowedRoles: ['admin', 'teacher'],
  });

  try {
    const validatedData = lessonCreateSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: 'error',
        message: 'Invalid form data',
      };
    }

    console.log(validatedData.data);

    await prisma.lesson.update({
      where: {
        id: lessonId,
        chapterId: validatedData.data.chapterId,
      },
      data: {
        title: validatedData.data.title,
        chapterId: validatedData.data.chapterId,
        description: validatedData.data.description,
        videoKey: validatedData.data.videoKey,
        thumbnailKey: validatedData.data.thumbnailKey,
      },
    });

    revalidatePath(`/dashboard/courses/${validatedData.data.courseId}/edit`);
    return {
      status: 'success',
      message: 'Lesson updated successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to update lesson details',
    };
  }
};
