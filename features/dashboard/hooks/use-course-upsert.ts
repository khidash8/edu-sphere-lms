import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { dashboardCoursesPath } from '@/features/constants/path-constants';
import { CourseCreateSchemaType } from '@/features/dashboard/schemas/course-create-schema-type';
import { tryCatch } from '@/lib/try-catch';
import { courseUpsertAction } from '@/features/dashboard/actions/course-upsert-action';

interface CourseUpsertData extends CourseCreateSchemaType {
  id?: string;
}

interface UseCourseUpsertOptions {
  onSuccess?: (isUpdate: boolean) => void;
  onError?: (error?: Error, isUpdate?: boolean) => void;
  redirectPath?: string;
  redirectOnSuccess?: boolean;
}

export const useCourseUpsert = (options?: UseCourseUpsertOptions) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    onSuccess,
    onError,
    redirectPath = dashboardCoursesPath(),
    redirectOnSuccess = true,
  } = options || {};

  const handleCourseUpsert = (values: CourseUpsertData) => {
    const isUpdate = Boolean(values.id);

    startTransition(async () => {
      try {
        const { data, error } = await tryCatch(courseUpsertAction(values));

        if (error) {
          toast.error(error.message);
          onError?.(error, isUpdate);
          return;
        }

        if (data?.status === 'success') {
          toast.success(data.message);
          onSuccess?.(isUpdate);
          if (redirectOnSuccess) {
            router.push(redirectPath);
          }
        } else if (data?.status === 'error') {
          toast.error(data.message);
          onError?.(new Error(data.message), isUpdate);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : `An unexpected error occurred during course ${isUpdate ? 'update' : 'creation'}`;
        toast.error(errorMessage);
        onError?.(
          error instanceof Error ? error : new Error(errorMessage),
          isUpdate
        );
      }
    });
  };

  return {
    isPending,
    handleCourseUpsert,
  };
};
