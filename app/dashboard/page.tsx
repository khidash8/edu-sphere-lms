import React from 'react';
import { SectionCards } from '@/components/dashboard/section-cards';
import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive';
import { getEnrollmentStatAction } from '@/features/dashboard/actions/get-enrollment-stat-action';
import { RecentCourses } from '@/features/dashboard/components/recent-courses';

export default async function AdminDashboardPage() {
  const enrollmentStat = await getEnrollmentStatAction();
  return (
    <>
      <SectionCards />
      <ChartAreaInteractive chartData={enrollmentStat} />
      <RecentCourses />
    </>
  );
}
