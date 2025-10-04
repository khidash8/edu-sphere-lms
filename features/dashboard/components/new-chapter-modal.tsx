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
  chapterCreateSchema,
  ChapterCreateSchemaType,
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
import { createNewChapterAction } from '@/features/dashboard/actions/create-new-chapter-action';
import { toast } from 'sonner';
import { LoaderSpinner } from '@/components/loader-spinner';
import { Plus } from 'lucide-react';

export const NewChapterModal = ({ courseId }: { courseId: string }) => {
  const form = useForm<ChapterCreateSchemaType>({
    resolver: zodResolver(chapterCreateSchema),
    defaultValues: {
      title: '',
      courseId,
    },
  });

  const [open, setOpen] = useState(false);
  const [pending, startTransaction] = useTransition();

  const handleSubmit = (values: ChapterCreateSchemaType) => {
    console.log(values);
    startTransaction(async () => {
      const { data, error } = await tryCatch(createNewChapterAction(values));

      if (error) {
        toast.error(error.message || 'Unexpected error occurred');
        return;
      }

      if (data?.status === 'success') {
        toast.success(data.message);
        form.reset();
        setOpen(false);
      } else if (data?.status === 'error') {
        toast.error(data.message || 'Failed to create chapter');
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
        <Button variant="outline">
          <Plus /> Add New Chapter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>New Chapter</DialogTitle>
              <DialogDescription>
                Add a new chapter to your course.
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
                      <Input placeholder="Type chapter title" {...field} />
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
