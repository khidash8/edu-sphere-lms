import React, { Suspense } from 'react';
import { Label } from '@/components/ui/label';
import { CourseCardSkeleton } from '@/components/course-card-skeleton';
import { getRecentCoursesAction } from '@/features/dashboard/actions/get-recent-courses-action';
import { CourseCard } from '@/features/dashboard/components/course-card';
import { Placeholder } from '@/components/place-holder';

export const RecentCourses = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <Label className="text-lg font-semibold">Recent Courses</Label>

      <Suspense
        fallback={Array.from({ length: 1 }).map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
      >
        <RenderRecentCourses />
      </Suspense>
    </div>
  );
};

const RenderRecentCourses = async () => {
  const courses = await getRecentCoursesAction();
  return (
    <>
      {courses.length > 0 ? (
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              editUrl={`/dashboard/courses/${course.id}/edit`}
              previewUrl={`/courses/${course.slug}`}
              editCourseUrl={`/dashboard/courses/${course.id}/edit`}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <Placeholder message={'No Courses Found'} />
        </div>
      )}
    </>
  );
};
