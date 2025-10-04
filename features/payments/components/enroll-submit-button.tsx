'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import React, { useTransition } from 'react';
import { enrollCourseAction } from '@/features/payments/actions/enroll-course-action';
import { LoaderSpinner } from '@/components/loader-spinner';
import { tryCatch } from '@/lib/try-catch';
import Link from 'next/link';
import { toast } from 'sonner';
import { studentDashboardPath } from '@/features/constants/path-constants';

type iAppProps = {
  courseId: string;
  isEnrolled: boolean;
};

export const EnrollSubmitButton = ({ courseId, isEnrolled }: iAppProps) => {
  const [isPending, startTransition] = useTransition();

  const handleEnroll = () => {
    startTransition(async () => {
      const { data, error } = await tryCatch(enrollCourseAction(courseId));

      if (error) {
        toast.error('Something went wrong, try again later');
        return;
      }

      if (data?.status === 'success') {
        toast.success(data.message);
      } else if (data?.status === 'error') {
        toast.error(data.message || 'Failed to enroll in the course');
      }
    });
  };

  return (
    <div>
      {isEnrolled ? (
        <Link
          className={buttonVariants({
            variant: 'default',
            className: 'w-full',
          })}
          href={studentDashboardPath()}
        >
          Watch Course Now
        </Link>
      ) : (
        <Button
          className="w-full cursor-pointer"
          size="lg"
          onClick={handleEnroll}
          disabled={isPending}
        >
          {isPending ? <LoaderSpinner label={'Enrolling...'} /> : 'Enroll Now!'}
        </Button>
      )}
    </div>
  );
};
