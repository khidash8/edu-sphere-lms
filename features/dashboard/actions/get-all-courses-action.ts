'use server';

import { notAdminPath } from '@/features/constants/path-constants';
import { checkUserRole } from '@/data-access-layer/validate-user';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

export const getAllCoursesAction = async () => {
  const { isAuthorized, userRole, session } = await checkUserRole({
    allowedRoles: ['admin', 'teacher'],
  });

  if (!isAuthorized) {
    redirect(notAdminPath());
  }

  const data = await prisma.course.findMany({
    where: {
      userId: userRole === 'teacher' ? session?.user?.id : undefined,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      smallDescription: true,
      price: true,
      duration: true,
      fileKey: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
};

export type CoursesType = Awaited<ReturnType<typeof getAllCoursesAction>>[0];
