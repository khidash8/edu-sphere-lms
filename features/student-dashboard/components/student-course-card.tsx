'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Clock,
  BookOpen,
  BarChart3,
  CheckCircle2,
  LayoutDashboard,
} from 'lucide-react';
import CardCompact from '@/components/card-compact';
import { constructUrl } from '@/lib/construct-url';
import { GetEnrolledCoursesActionType } from '@/features/student-dashboard/actions/get-enrolled-courses-action';
import { GetAllPublicCoursesActionType } from '@/features/courses/actions/getAllPublic-courses-action';
import { Progress } from '@/components/ui/progress';
import { useCourseProgress } from '@/features/student-dashboard/hooks/use-course-progress';
import { Badge } from '@/components/ui/badge';

type EnrolledCourse = GetEnrolledCoursesActionType[0]['Course'];

type StudentCourseCardProps = {
  course: EnrolledCourse | GetAllPublicCoursesActionType;
  className?: string;
  isEnrolled?: boolean;
  courseUrl?: string;
};

export const StudentCourseCard = ({
  course,
  className,
  isEnrolled = true,
  courseUrl,
}: StudentCourseCardProps) => {
  // Use the hook to calculate progress
  const { totalLessons, completedLessons, progressPercentage, isCompleted } =
    useCourseProgress(isEnrolled && 'chapters' in course ? course : null);

  const content = (
    <>
      <div className="relative">
        <div className="relative h-52 w-full overflow-hidden rounded-t-lg">
          <Image
            src={constructUrl(course.fileKey)}
            alt={course.title}
            fill
            className="object-cover aspect-video"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Level Badge */}
        <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium backdrop-blur">
          {course.level}
        </div>

        {/* Completion Badge (only for enrolled courses) */}
        {isEnrolled && isCompleted && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </div>
        )}
      </div>

      <div className="space-y-2 w-full">
        {/* Course Details */}
        <div className="space-y-3 p-4">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {course.smallDescription}
            </p>
          </div>

          {/* Category Tag */}
          {course.category && (
            <div className="inline-block">
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-lg">
                {course.category}
              </span>
            </div>
          )}

          {/* Course Stats */}
          <div className="flex items-center text-sm gap-4 flex-wrap">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{course.duration} hours</span>
            </div>
            {isEnrolled && 'chapters' in course && (
              <>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.chapters.length} chapters</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <BarChart3 className="h-4 w-4" />
                  <span>{totalLessons} lessons</span>
                </div>
              </>
            )}
          </div>

          {/* Progress Bar (only for enrolled courses) */}
          {isEnrolled && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {completedLessons}/{totalLessons} lessons
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {progressPercentage}% completed
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const footer = (
    <Button
      asChild
      className="w-full bg-primary/90 hover:bg-primary transition-colors"
    >
      <Link href={courseUrl || `/courses/${course.slug}`}>
        {isEnrolled ? 'Continue Learning' : 'View Course'}
      </Link>
    </Button>
  );

  return (
    <CardCompact
      className={`w-full hover:shadow-lg transition-shadow ${className || ''} p-0 rounded-lg pb-2 flex flex-col gap-2 justify-between`}
      contentClassName="p-0"
      content={content}
      footer={footer}
    />
  );
};
