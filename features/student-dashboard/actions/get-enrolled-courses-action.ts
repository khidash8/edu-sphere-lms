'use server';

import { getAuthenticatedSession } from '@/data-access-layer/validate-user';
import prisma from '@/lib/db';

export const getEnrolledCoursesAction = async () => {
  const { user } = await getAuthenticatedSession();

  const data = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
      status: 'ACTIVE',
    },
    select: {
      Course: {
        select: {
          id: true,
          title: true,
          slug: true,
          smallDescription: true,
          level: true,
          duration: true,
          category: true,
          fileKey: true,
          createdAt: true,
          chapters: {
            select: {
              id: true,
              title: true,
              position: true,
              lessons: {
                select: {
                  id: true,
                  title: true,
                  description: true,
                  position: true,
                  thumbnailKey: true,
                  videoKey: true,
                  createdAt: true,
                  lessonProgress: {
                    // Filter lesson progress by the current user
                    where: {
                      userId: user.id,
                    },
                    select: {
                      id: true,
                      lessonId: true,
                      completed: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return data;
};

export type GetEnrolledCoursesActionType = Awaited<
  ReturnType<typeof getEnrolledCoursesAction>
>;
