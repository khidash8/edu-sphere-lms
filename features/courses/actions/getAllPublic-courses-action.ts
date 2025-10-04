'use server';

import prisma from '@/lib/db';

export const getAllPublicCoursesAction = async () => {
  const data = await prisma.course.findMany({
    where: {
      status: 'PUBLISHED',
    },
    orderBy: {
      createdAt: 'desc',
    },
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
    },
  });

  return data;
};

export type GetAllPublicCoursesActionType = Awaited<
  ReturnType<typeof getAllPublicCoursesAction>
>[0];
