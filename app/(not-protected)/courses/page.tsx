import React, { Suspense } from 'react';
import { Label } from '@/components/ui/label';
import { getAllPublicCoursesAction } from '@/features/courses/actions/getAllPublic-courses-action';
import { PublicCourseCard } from '@/features/courses/components/public-course-card';
import { CourseCardSkeleton } from '@/components/course-card-skeleton';

export const dynamic = 'force-dynamic';

const CoursesPage = () => {
  return (
    <div className="flex gap-4 flex-col p-8 px-6 md:px-10 lg:px-20">
      <Label className="text-3xl font-semibold">Explore Courses</Label>
      <Label className="text-muted-foreground text-md">
        Discover our wide range of courses designed to help you achieve your
        goals
      </Label>

      <Suspense
        fallback={
          <div
            className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <CourseCardSkeleton key={i} showEditButton={false} />
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
  const courses = await getAllPublicCoursesAction();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <PublicCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};
