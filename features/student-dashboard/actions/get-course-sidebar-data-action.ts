'use server';

import { getAuthenticatedSession } from '@/data-access-layer/validate-user';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

export const getCourseSidebarDataAction = async (slug: string) => {
  const session = await getAuthenticatedSession();

  try {
    const course = await prisma.course.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        fileKey: true,
        duration: true,
        slug: true,
        level: true,
        category: true,
        smallDescription: true,
        price: true,
        createdAt: true,
        chapters: {
          orderBy: { position: 'asc' },
          select: {
            id: true,
            title: true,
            position: true,
            lessons: {
              orderBy: { position: 'asc' },
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
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!course) {
      return notFound();
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          courseId: course.id,
          userId: session.user.id,
        },
      },
    });

    if (!enrollment || enrollment.status !== 'ACTIVE') {
      return notFound();
    }

    return {
      course,
    };
  } catch (error) {
    console.error('Error fetching course sidebar data:', error);
    return notFound();
  }
};

export type GetCourseSidebarDataActionType = Awaited<
  ReturnType<typeof getCourseSidebarDataAction>
>;
