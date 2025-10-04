import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { LoaderSpinner } from '@/components/loader-spinner';
import { tryCatch } from '@/lib/try-catch';
import { toast } from 'sonner';
import { deleteCourseAction } from '@/features/dashboard/actions/delete-course-action';

type DeleteCourseDialogueProps = {
  courseId: string;
};

export const DeleteCourseDialogue = ({
  courseId,
}: DeleteCourseDialogueProps) => {
  const [open, setOpen] = React.useState(false);
  const [pending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const { data, error } = await tryCatch(deleteCourseAction(courseId));

      if (error) {
        toast.error(
          error.message || 'Unexpected error occurred while deleting chapter'
        );
        return;
      }

      if (data?.status === 'success') {
        toast.success(data.message);
        setOpen(false);
      } else if (data?.status === 'error') {
        toast.error(data.message || 'Failed to delete chapter');
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={
            'cursor-pointer flex items-center gap-4 justify-start w-full'
          }
        >
          <Trash2 className="size-3" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            course.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={pending}>
            {pending ? <LoaderSpinner label="Deleting..." /> : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
