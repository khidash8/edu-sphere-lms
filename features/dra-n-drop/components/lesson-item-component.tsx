import { LessonItem } from '@/features/dra-n-drop/utils/dnd-types';
import { SortableItem } from '@/features/dra-n-drop/components/sortable-item';
import { Button } from '@/components/ui/button';
import { FileText, GripVertical } from 'lucide-react';
import Link from 'next/link';
import { DeleteLessonDialogue } from '@/features/dashboard/components/delete-lesson-dialogue';

type LessonItemComponentProps = {
  lesson: LessonItem;
  courseId: string;
  chapterId: string;
};

/**
 * Individual lesson item with drag handle and delete button
 * Responsible for rendering a single lesson within a chapter
 */
export function LessonItemComponent({
  lesson,
  courseId,
  chapterId,
}: LessonItemComponentProps) {
  return (
    <SortableItem id={lesson.id} data={{ type: 'lesson', chapterId }}>
      {(lessonListeners) => (
        <div className="flex items-center justify-between p-2 hover:bg-muted-foreground/10 rounded-sm">
          <div className="flex items-center gap-2">
            {/* Drag handle for lesson reordering */}
            <Button
              variant="ghost"
              size="icon"
              className="cursor-grab opacity-60 hover:opacity-100"
              {...lessonListeners}
            >
              <GripVertical className="size-4" />
            </Button>

            {/* Lesson icon */}
            <FileText className="size-4" />

            {/* Lesson title with navigation link */}
            <Link
              href={`/dashboard/courses/${courseId}/lessons/${chapterId}/${lesson.id}`}
              className="hover:underline"
            >
              {lesson.title}
            </Link>
          </div>

          <DeleteLessonDialogue
            lessonId={lesson.id}
            courseId={courseId}
            chapterId={chapterId}
          />
        </div>
      )}
    </SortableItem>
  );
}
