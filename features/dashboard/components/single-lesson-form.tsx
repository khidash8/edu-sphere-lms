'use client';

import React, { useTransition } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  lessonCreateSchema,
  LessonCreateSchemaType,
} from '@/features/dashboard/schemas/course-create-schema-type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RichTextEditor } from '@/components/rich-text-editor/editor';
import { LoaderSpinner } from '@/components/loader-spinner';
import { LucidePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileUploader } from '@/components/file-upload/file-uploader';
import { tryCatch } from '@/lib/try-catch';
import { updateLessonDetailsAction } from '@/features/dashboard/actions/create-new-lesson-action';
import { toast } from 'sonner';

type SingleLessonFormProps = {
  lesson: LessonCreateSchemaType;
  lessonId: string;
  courseId: string;
};

export const SingleLessonForm = ({
  lesson,
  lessonId,
  courseId,
}: SingleLessonFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<LessonCreateSchemaType>({
    resolver: zodResolver(lessonCreateSchema),
    defaultValues: {
      title: lesson.title,
      description: lesson.description,
      thumbnailKey: lesson.thumbnailKey,
      videoKey: lesson.videoKey,
      chapterId: lesson.chapterId,
      courseId,
    },
  });

  const { isDirty } = form.formState;

  const handleSubmit = (values: LessonCreateSchemaType) => {
    startTransition(async () => {
      const { data, error } = await tryCatch(
        updateLessonDetailsAction(values, lessonId)
      );

      if (error) {
        toast.error(error.message || 'Failed to update lesson details');
        return;
      }

      if (data?.status === 'success') {
        toast.success(data.message);
        // Reset the form with updated values to clear the dirty state
        form.reset(values);
      } else if (data?.status === 'error') {
        toast.error(data.message || 'Failed to update lesson details');
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 p-4"
        >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Lesson Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichTextEditor fileKey={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail URL */}
          <FormField
            control={form.control}
            name="thumbnailKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onChange={(key: string) => field.onChange(key)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Video URL */}
          <FormField
            control={form.control}
            name="videoKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onChange={(key: string) => field.onChange(key)}
                    fileType="video"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={isPending || !isDirty}>
            {isPending ? (
              <LoaderSpinner label={'Updating Lesson...'} />
            ) : (
              <>
                <LucidePlus /> Update Lesson
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
