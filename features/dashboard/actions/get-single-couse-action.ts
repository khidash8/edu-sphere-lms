'use server';

import prisma from '@/lib/db';
import { validateUserRole } from '@/data-access-layer/validate-user';
import {
  notAdminPath,
  notOwnerPath,
} from '@/features/constants/path-constants';
import { redirect } from 'next/navigation';

export const getSingleCourseAction = async (id: string) => {
  const session = await validateUserRole({
    allowedRoles: ['admin', 'teacher'],
    redirectOnFail: notAdminPath(),
  });

  const data = await prisma.course.findUnique({
    where: {
      id,
      userId: session?.user?.id,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      smallDescription: true,
      description: true,
      price: true,
      duration: true,
      fileKey: true,
      createdAt: true,
      userId: true,
      category: true,
      level: true,
      status: true,
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
            },
          },
        },
      },
    },
  });

  if (!data) {
    redirect(notOwnerPath());
  }

  return data;
};

export type SingleCourseType = Awaited<
  ReturnType<typeof getSingleCourseAction>
>;
