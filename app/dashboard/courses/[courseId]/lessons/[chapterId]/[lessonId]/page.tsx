import React from 'react';
import { getSingleLessonAction } from '@/features/dashboard/actions/get-single-lesson-action';
import CardCompact from '@/components/card-compact';
import { SingleLessonForm } from '@/features/dashboard/components/single-lesson-form';
import { buttonVariants } from '@/components/ui/button';
import { LucideArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Params = {
  courseId: string;
  chapterId: string;
  lessonId: string;
};

const SingleLessonPage = async ({ params }: { params: Params }) => {
  const { courseId, chapterId, lessonId } = await params;

  const lesson = await getSingleLessonAction({ lessonId, chapterId, courseId });

  return (
    <CardCompact
      title={`Lesson ${lesson.data?.title}`}
      headerProps={{
        className: 'flex items-center justify-between',
      }}
      headerContent={
        <Link
          className={buttonVariants({ variant: 'outline' })}
          href={`/dashboard/courses/${courseId}/edit`}
        >
          <LucideArrowLeft /> Back to Course
        </Link>
      }
      content={
        <SingleLessonForm
          lesson={lesson.data}
          lessonId={lessonId}
          courseId={courseId}
        />
      }
    />
  );
};

export default SingleLessonPage;
