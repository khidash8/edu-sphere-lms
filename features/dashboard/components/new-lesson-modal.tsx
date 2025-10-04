import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import {
  lessonCreateSchema,
  LessonCreateSchemaType,
} from '@/features/dashboard/schemas/course-create-schema-type';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { tryCatch } from '@/lib/try-catch';
import { toast } from 'sonner';
import { LoaderSpinner } from '@/components/loader-spinner';
import { Plus } from 'lucide-react';
import { createNewLessonAction } from '@/features/dashboard/actions/create-new-lesson-action';

export const NewLessonModal = ({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) => {
  const form = useForm<LessonCreateSchemaType>({
    resolver: zodResolver(lessonCreateSchema),
    defaultValues: {
      title: '',
      courseId,
      chapterId,
    },
  });

  console.log('errors', form.formState.errors);

  const [open, setOpen] = useState(false);
  const [pending, startTransaction] = useTransition();

  const handleSubmit = (values: LessonCreateSchemaType) => {
    console.log(values);
    startTransaction(async () => {
      const { data, error } = await tryCatch(createNewLessonAction(values));

      if (error) {
        toast.error(
          error.message || 'Unexpected error occurred while creating lesson'
        );
        return;
      }

      if (data?.status === 'success') {
        toast.success(data.message);
        form.reset();
        setOpen(false);
      } else if (data?.status === 'error') {
        toast.error(data.message || 'Failed to create lesson');
      }
    });
  };

  const handleOpenChange = (open: boolean) => {
    form.reset();
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={'w-full flex items-center gap-2 my-2 cursor-pointer'}
        >
          <Plus /> Add New Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>New Lesson</DialogTitle>
              <DialogDescription>
                Add a new lesson to your course.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Type lesson title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {pending ? <LoaderSpinner label="Creating..." /> : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
