import React, { Suspense } from 'react';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { dashboardCreateCoursesPath } from '@/features/constants/path-constants';
import { buttonVariants } from '@/components/ui/button';
import { LucidePlus } from 'lucide-react';
import { getAllCoursesAction } from '@/features/dashboard/actions/get-all-courses-action';
import { CourseCard } from '@/features/dashboard/components/course-card';
import { Placeholder } from '@/components/place-holder';
import { CourseCardSkeleton } from '@/components/course-card-skeleton';

const CoursesPage = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex items-center justify-between'}>
        <Label className="text-xl font-semibold">All Courses</Label>
        <Link className={buttonVariants()} href={dashboardCreateCoursesPath()}>
          <LucidePlus /> Create Course
        </Link>
      </div>

      <Suspense
        fallback={
          <div
            className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <CourseCardSkeleton key={i} showEditButton />
            ))}
          </div>
        }
      >
        <RenderCourses />
      </Suspense>
    </div>
  );
};

export default CoursesPage;

const RenderCourses = async () => {
  const courses = await getAllCoursesAction();

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
