import React from 'react';
import { getCourseSidebarDataAction } from '@/features/student-dashboard/actions/get-course-sidebar-data-action';
import { redirect } from 'next/navigation';
import { Label } from '@/components/ui/label';

type StudentDashboardSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const StudentDashboardSlugPage = async ({
  params,
}: StudentDashboardSlugPageProps) => {
  const { slug } = await params;

  const courseSidebarData = await getCourseSidebarDataAction(slug);

  if (!courseSidebarData) {
    return (
      <div className="flex flex-1 items-center justify-center h-full text-center">
        <Label className="text-2xl font-semibold text-muted-foreground">
          Course not found
        </Label>
      </div>
    );
  }

  const firstChapter = courseSidebarData.course.chapters[0];
  const firstLesson = firstChapter?.lessons[0];

  if (firstChapter && firstLesson) {
    redirect(`/student-dashboard/${slug}/${firstLesson.id}`);
  }

  return (
    <div className="flex flex-1 items-center justify-center h-full text-center">
      <Label className="text-2xl font-semibold text-muted-foreground">
        {!firstChapter
          ? 'No chapters available for this course'
          : 'No lessons available in this chapter'}
      </Label>
    </div>
  );
};

export default StudentDashboardSlugPage;
