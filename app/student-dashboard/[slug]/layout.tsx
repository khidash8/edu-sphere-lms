import React from 'react';
import CourseSidebar from '@/features/student-dashboard/components/course-sidebar';
import { getCourseSidebarDataAction } from '@/features/student-dashboard/actions/get-course-sidebar-data-action';

interface iApeProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export default async function StudentDashboardSlugLayout({
  children,
  params,
}: iApeProps) {
  const { slug } = await params;

  const courseSidebarData = await getCourseSidebarDataAction(slug);

  return (
    <div className="flex flex-1 relative">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className={'hidden lg:block w-80 border-r border-border shrink-0'}>
        <CourseSidebar courseSidebarData={courseSidebarData.course} />
      </div>

      {/* Mobile Sidebar - Rendered within CourseSidebar component as a drawer */}
      <div className="lg:hidden">
        <CourseSidebar courseSidebarData={courseSidebarData.course} />
      </div>

      {/* Main Content - Full width on mobile, 70% on desktop */}
      <div className={'flex-1 overflow-hidden w-full'}>{children}</div>
    </div>
  );
}
