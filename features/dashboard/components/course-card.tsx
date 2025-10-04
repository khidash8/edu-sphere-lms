'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Eye, Clock } from 'lucide-react';
import CardCompact from '@/components/card-compact';
import { CoursesType } from '@/features/dashboard/actions/get-all-courses-action';
import { constructUrl } from '@/lib/construct-url';
import { DeleteCourseDialogue } from '@/features/dashboard/components/delete-course-dialogue';

type CourseCardProps = {
  course: CoursesType;
  editUrl?: string;
  previewUrl?: string;
  editCourseUrl?: string;
  className?: string;
};

export const CourseCard = ({
  course,
  editUrl,
  previewUrl,
  editCourseUrl,
  className,
}: CourseCardProps) => {
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white/90 backdrop-blur cursor-pointer"
            >
              <MoreVertical className="h-4 w-4 text-black" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {editUrl && (
              <DropdownMenuItem asChild>
                <Link href={editUrl}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </DropdownMenuItem>
            )}
            {previewUrl && (
              <DropdownMenuItem asChild>
                <Link href={previewUrl}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeleteCourseDialogue courseId={course.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

          {/* Hours and Price */}
          <div className="flex items-center text-sm gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{course.duration} hours</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>${course.price}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const footer = editCourseUrl ? (
    <Button asChild className="w-full" variant="outline">
      <Link href={editCourseUrl}>
        <Edit className="h-4 w-4 mr-2" />
        Edit Course
      </Link>
    </Button>
  ) : null;

  return (
    <CardCompact
      className={`w-full hover:shadow-lg transition-shadow ${className || ''} p-0 rounded-lg pb-2 flex flex-col gap-2 justify-between`}
      contentClassName="p-0"
      content={content}
      footer={footer}
    />
  );
};
