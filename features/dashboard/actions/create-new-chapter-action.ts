'use server';

import {
  chapterCreateSchema,
  ChapterCreateSchemaType,
} from '@/features/dashboard/schemas/course-create-schema-type';
import { validateUserRole } from '@/data-access-layer/validate-user';
import { ApiResponse } from '@/lib/general-types';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { publicCoursesPath } from '@/features/constants/path-constants';

export const createNewChapterAction = async (
  data: ChapterCreateSchemaType
): Promise<ApiResponse> => {
  await validateUserRole({
    allowedRoles: ['admin', 'teacher'],
  });

  try {
    const validatedData = chapterCreateSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: 'error',
        message: 'Invalid form data',
      };
    }

    await prisma.$transaction(async (trx) => {
      const lastPosition = await trx.chapter.findFirst({
        where: {
          courseId: validatedData.data.courseId,
        },
        orderBy: {
          position: 'desc',
        },
        select: {
          position: true,
        },
      });

      const newPosition = lastPosition ? lastPosition.position + 1 : 1;

      await trx.chapter.create({
        data: {
          ...validatedData.data,
          position: newPosition,
        },
      });

      revalidatePath(`/dashboard/courses/${validatedData.data.courseId}/edit`);
    });

    return {
      status: 'success',
      message: 'Chapter created successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to create chapter',
    };
  }
};
