'use server';

import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

export const getSingleCourseAction = async (slug: string) => {
  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      description: true,
      smallDescription: true,
      fileKey: true,
      createdAt: true,
      category: true,
      price: true,
      duration: true,
      level: true,
      status: true,

      chapters: {
        orderBy: {
          position: 'asc',
        },
        select: {
          id: true,
          title: true,

          lessons: {
            select: {
              id: true,
              title: true,
            },
            orderBy: {
              position: 'asc',
            },
          },
        },
      },
    },
  });

  if (!course) {
    return notFound();
  }

  return course;
};
