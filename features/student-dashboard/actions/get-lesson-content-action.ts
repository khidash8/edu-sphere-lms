'use server';

import prisma from '@/lib/db';
import { getAuthenticatedSession } from '@/data-access-layer/validate-user';
import { notFound } from 'next/navigation';

type GetLessonContentActionType = {
  lessonId: string;
};

export const getLessonContentAction = async ({
  lessonId,
}: GetLessonContentActionType) => {
  const session = await getAuthenticatedSession();

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      title: true,
      position: true,
      description: true,
      thumbnailKey: true,
      videoKey: true,
      createdAt: true,
      lessonProgress: {
        where: {
          userId: session.user.id,
        },
        select: {
          completed: true,
          lessonId: true,
        },
      },
      Chapter: {
        select: {
          courseId: true,
          Course: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  if (!lesson) {
    return notFound();
  }

  const userCourse = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        courseId: lesson.Chapter.courseId,
        userId: session.user.id,
      },
    },
    select: {
      status: true,
    },
  });

  if (!userCourse || userCourse.status !== 'ACTIVE') {
    return notFound();
  }

  return lesson;
};

export type LessonContentType = Awaited<
  ReturnType<typeof getLessonContentAction>
>;
