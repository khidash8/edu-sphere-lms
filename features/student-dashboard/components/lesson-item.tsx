import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { GetCourseSidebarDataActionType } from '@/features/student-dashboard/actions/get-course-sidebar-data-action';
import { cn } from '@/lib/utils';
import { BadgeCheck, PlayIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';

type LessonItemProps = {
  lesson: GetCourseSidebarDataActionType['course']['chapters'][number]['lessons'][number];
  slug: string;
  isActive?: boolean;
  completed: boolean;
};

const LessonItem = ({ slug, lesson, isActive, completed }: LessonItemProps) => {
  return (
    <Link
      href={`/student-dashboard/${slug}/${lesson.id}`}
      className={buttonVariants({
        variant: 'outline',
        size: 'sm',
        className: cn(
          'w-full p-2.5 h-auto transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer',
          isActive &&
            !completed &&
            'bg-primary/80 dark:bg-primary/20 text-primary-foreground'
        ),
      })}
    >
      <div className={'shrink-0'}>
        {completed ? (
          <BadgeCheck className={cn('size-4 text-green-900')} />
        ) : (
          <PlayIcon
            className={cn('size-3 text-primary', isActive && 'text-white')}
          />
        )}
      </div>
      <span className="flex-shrink-0 mt-0.5">{lesson.position}:</span>
      <span className="text-left flex-1 line-clamp-2">{lesson.title}</span>

      {completed && <Label className="text-xs text-green-900">Completed</Label>}

      {!completed && isActive && (
        <Label className="text-xs dark:text-primary">Currently Playing</Label>
      )}
    </Link>
  );
};

export default LessonItem;
