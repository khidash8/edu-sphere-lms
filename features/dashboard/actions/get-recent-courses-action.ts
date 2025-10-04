'use server';

import { checkUserRole } from '@/data-access-layer/validate-user';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { notAdminPath } from '@/features/constants/path-constants';

export const getRecentCoursesAction = async () => {
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
    take: 5,
  });

  return data;
};
