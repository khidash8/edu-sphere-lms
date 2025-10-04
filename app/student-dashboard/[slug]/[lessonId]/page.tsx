import React, { Suspense } from 'react';
import { getLessonContentAction } from '@/features/student-dashboard/actions/get-lesson-content-action';
import CourseContent from '@/features/student-dashboard/components/course-content';
import { Skeleton } from '@/components/ui/skeleton';

type iApeProps = {
  params: Promise<{ lessonId: string }>;
};

const LessonContentPageContent = async ({ lessonId }: { lessonId: string }) => {
  const lesson = await getLessonContentAction({ lessonId });

  return <CourseContent lesson={lesson} />;
};

const LessonContentPage = async ({ params }: iApeProps) => {
  const { lessonId } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex flex-col space-y-4 p-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-64 w-full mt-6" />
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      }
    >
      <LessonContentPageContent lessonId={lessonId} />
    </Suspense>
  );
};

export default LessonContentPage;
