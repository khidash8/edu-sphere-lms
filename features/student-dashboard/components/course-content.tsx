'use client';

import React, { useTransition } from 'react';
import { LessonContentType } from '@/features/student-dashboard/actions/get-lesson-content-action';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BadgeCheck, BookIcon } from 'lucide-react';
import RenderDescription from '@/components/rich-text-editor/render-description';
import { Placeholder } from '@/components/place-holder';
import { constructUrl } from '@/lib/construct-url';
import { markLessonCompleteAction } from '@/features/student-dashboard/actions/mark-lesson-complete-action';
import { tryCatch } from '@/lib/try-catch';
import { toast } from 'sonner';
import { useConfetti } from '@/hooks/use-confetti';
import { LoaderSpinner } from '@/components/loader-spinner';

type CourseContentProps = {
  lesson: LessonContentType;
};

const CourseContent = ({ lesson }: CourseContentProps) => {
  const [isPending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  const handleMarkLessonComplete = () => {
    startTransition(async () => {
      const { data, error } = await tryCatch(
        markLessonCompleteAction(lesson.id, lesson.Chapter.Course.slug)
      );

      if (error) {
        toast.error(
          error.message || 'Unexpected error occurred while deleting lesson'
        );
        return;
      }

      if (data?.status === 'success') {
        toast.success(data.message);
        triggerConfetti();
      } else if (data?.status === 'error') {
        toast.error(data.message || 'Failed to delete lesson');
      }
    });
  };

  const VideoPlayer = ({
    videoKey,
    thumbnailKey,
  }: {
    thumbnailKey: string;
    videoKey: string;
  }) => {
    const videoUrl = constructUrl(videoKey);
    const thumbnailUrl = constructUrl(thumbnailKey);

    if (!videoUrl || videoKey === '') {
      return (
        <div
          className={
            'aspect-video bg-muted rounded-lg flex flex-col items-center justify-center'
          }
        >
          <BookIcon className={'size-16 text-muted-foreground mx-auto mb-4'} />
          <Label className={'text-muted-foreground'}>No Video Found</Label>
        </div>
      );
    }

    return (
      <div
        className={
          'relative aspect-video bg-muted rounded-lg flex flex-col items-center justify-center'
        }
      >
        <video
          className={'object-cover aspect-video w-full h-full'}
          controls
          poster={thumbnailUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  return (
    <div className={'flex flex-col gap-4 h-full bg-background pl-6'}>
      <VideoPlayer
        thumbnailKey={lesson.thumbnailKey ?? ''}
        videoKey={lesson.videoKey ?? ''}
      />

      <div className={'py-4 border-b border-border'}>
        {lesson.lessonProgress.length > 0 ? (
          <Button variant={'outline'} disabled>
            <BadgeCheck className={cn('size-4 text-green-900')} />
            Lesson completed
          </Button>
        ) : (
          <Button
            variant={'outline'}
            className={
              'cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg'
            }
            onClick={handleMarkLessonComplete}
            disabled={isPending}
          >
            {isPending ? (
              <LoaderSpinner label="Marking as completed..." />
            ) : (
              <>
                <BadgeCheck className={cn('size-4 text-green-900')} />
                Mark as Completed
              </>
            )}
          </Button>
        )}
      </div>

      <div>
        <Label className={'font-semibold text-xl'}>{lesson.title}</Label>
        <div className={'mt-2'}>
          {lesson.description ? (
            <RenderDescription
              json={JSON.parse(lesson.description)}
              className={'text-muted-foreground'}
            />
          ) : (
            <Placeholder message={'No Description'} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
