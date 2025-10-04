'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, School } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CardCompact from '@/components/card-compact';
import { constructUrl } from '@/lib/construct-url';
import { GetAllPublicCoursesActionType } from '@/features/courses/actions/getAllPublic-courses-action';

type PublicCourseCardProps = {
  course: GetAllPublicCoursesActionType;
  className?: string;
};

export const PublicCourseCard = ({
  course,
  className,
}: PublicCourseCardProps) => {
  const content = (
    <Link href={`/courses/${course.slug}`} className="block w-full">
      <div className="relative">
        <div className="relative h-52 w-full overflow-hidden rounded-t-lg">
          <Image
            src={constructUrl(course.fileKey)}
            alt={course.title}
            fill
            className="object-cover aspect-video transition-transform"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <Badge className="shrink-0 absolute top-2 right-2">
            {course.level}
          </Badge>
        </div>
      </div>
      <div className="space-y-2 w-full p-4">
        {/* Course Details */}
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold capitalize text-lg line-clamp-1 hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground capitalize line-clamp-2 mt-1">
                {course.smallDescription}
              </p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center text-sm gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>{course.duration} hours</span>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <School className="h-4 w-4 text-primary" />
              <span>{course.category} </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <CardCompact
      className={`w-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer ${className || ''} p-0 rounded-lg pb-2 flex flex-col gap-2 justify-between`}
      contentClassName="p-0"
      content={content}
    />
  );
};
