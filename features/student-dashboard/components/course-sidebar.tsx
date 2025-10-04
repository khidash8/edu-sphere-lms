'use client';

import React, { useState } from 'react';
import { ChevronDown, PlayIcon, Menu } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { GetCourseSidebarDataActionType } from '@/features/student-dashboard/actions/get-course-sidebar-data-action';
import { Progress } from '@/components/ui/progress';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import LessonItem from '@/features/student-dashboard/components/lesson-item';
import { usePathname } from 'next/navigation';
import { useCourseProgress } from '@/features/student-dashboard/hooks/use-course-progress';
import { useIsMobile } from '@/hooks/use-mobile';

type CourseSidebarProps = {
  courseSidebarData: GetCourseSidebarDataActionType['course'];
};

const CourseSidebar = ({ courseSidebarData }: CourseSidebarProps) => {
  const path = usePathname();
  const currentLessonId = path.split('/').pop();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const { completedLessons, totalLessons, progressPercentage } =
    useCourseProgress(courseSidebarData);

  const sidebarContent = (
    <div className={'flex flex-col gap-2 h-full'}>
      <div className={'pb-4 pr-4 border-b border-border'}>
        <div className={'flex items-center gap-3 mb-3'}>
          <div
            className={
              'size-10 rounded-lg bg-primary/10 p-2.5 flex items-center justify-center shrink-0'
            }
          >
            <PlayIcon className={'size-6 text-primary'} />
          </div>

          <div className={'flex-1 min-w-0'}>
            <Label
              className={
                'font-semibold text-muted-foreground line-clamp-2 leading-tight'
              }
            >
              {courseSidebarData.title}
            </Label>
            <Label className={'text-sm text-muted-foreground mt-1'}>
              {courseSidebarData.category}
            </Label>
          </div>
        </div>

        <div className={'space-y-2'}>
          <div className={'flex items-center justify-between gap-2 txt-xs'}>
            <span className={'text-muted-foreground'}>Progress</span>
            <span className={'text-primary/90 font-medium'}>
              {completedLessons}/{totalLessons} Lessons
            </span>
          </div>

          <Progress value={progressPercentage} className={'h-1.5'} />
          <Label className={'text-xs text-muted-foreground'}>
            {progressPercentage}% Completed
          </Label>
        </div>
      </div>

      <div className={'py-4 pr-4 space-y-2 overflow-y-auto flex-1'}>
        {courseSidebarData.chapters.map((chapter) => (
          <Collapsible key={chapter.id} defaultOpen={chapter.position === 1}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                size={'sm'}
                className={
                  'w-full p-3 h-auto flex items-center gap-2 border-b border-border'
                }
              >
                <div className={'shrink-0'}>
                  <ChevronDown className="size-4" />
                </div>

                <div className={'flex-1 text-left min-w-0'}>
                  <Label
                    className={'font-semibold text-sm text-foreground truncate'}
                  >
                    {chapter.position}: {chapter.title}
                  </Label>
                  <Label className={'text-[10px] text-muted-foreground mt-1'}>
                    {chapter.lessons.length} Lessons
                  </Label>
                </div>
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className={'mt-3 pl-6 border-border space-y-2'}>
              {chapter.lessons.map((lesson) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  slug={courseSidebarData.slug}
                  isActive={lesson.id === currentLessonId}
                  completed={
                    lesson.lessonProgress.find(
                      (progress) => progress.lessonId === lesson.id
                    )?.completed ?? false
                  }
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sheet Trigger */}
      {isMobile && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTitle className="sr-only">Course Sidebar</SheetTitle>

          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="fixed top-14 left-4 z-50 shadow-md"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-80 p-4">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="flex flex-col gap-2 h-full">{sidebarContent}</div>
      )}
    </>
  );
};

export default CourseSidebar;
