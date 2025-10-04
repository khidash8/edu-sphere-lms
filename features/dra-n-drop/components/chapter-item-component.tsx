import { ChapterItem } from '@/features/dra-n-drop/utils/dnd-types';
import { SortableItem } from '@/features/dra-n-drop/components/sortable-item';
import { Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { LessonItemComponent } from '@/features/dra-n-drop/components/lesson-item-component';
import { NewLessonModal } from '@/features/dashboard/components/new-lesson-modal';
import { cn } from '@/lib/utils';
import { DeleteChapterDialogue } from '@/features/dashboard/components/delete-chapter-modal';

type ChapterItemComponentProps = {
  chapter: ChapterItem;
  courseId: string;
  onToggleChapter: (chapterId: string) => void;
};

/**
 * Individual chapter item with collapsible lessons
 * Responsible for rendering a single chapter with its lessons
 */

export function ChapterItemComponent({
  chapter,
  courseId,
  onToggleChapter,
}: ChapterItemComponentProps) {
  return (
    <SortableItem id={chapter.id} data={{ type: 'chapter' }}>
      {(listeners) => (
        <Card className={'p-0'}>
          <Collapsible
            open={chapter.isOpen}
            onOpenChange={() => onToggleChapter(chapter.id)}
          >
            {/* Chapter header with drag handle, title, and delete button */}
            <div
              className={cn(
                'flex items-center justify-between p-3 border-border',
                chapter.isOpen ? 'border-b' : 'border-b-0'
              )}
            >
              <div className="flex items-center">
                {/* Drag handle for chapter reordering */}
                <Button
                  size="icon"
                  className="cursor-grab opacity-60 hover:opacity-100"
                  variant="ghost"
                  {...listeners}
                >
                  <GripVertical className="size-4" />
                </Button>

                {/* Collapsible trigger button */}
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-muted-foreground/20"
                  >
                    {chapter.isOpen ? (
                      <ChevronDown className="size-4" />
                    ) : (
                      <ChevronRight className="size-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                {/* Chapter title */}
                <Label
                  className="text-sm cursor-pointer hover:opacity-60"
                  onClick={() => onToggleChapter(chapter.id)}
                >
                  {chapter.title}
                </Label>
              </div>

              {/* Delete chapter button */}
              <DeleteChapterDialogue
                courseId={courseId}
                chapterId={chapter.id}
              />
            </div>

            {/* Collapsible content containing lessons */}
            <CollapsibleContent>
              <div className="pl-12 border-b border-border">
                {/* Sortable context for lessons within this chapter */}
                <SortableContext
                  items={chapter.lessons.map((lesson) => lesson.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {chapter.lessons.map((lesson) => (
                    <LessonItemComponent
                      key={lesson.id}
                      lesson={lesson}
                      courseId={courseId}
                      chapterId={chapter.id}
                    />
                  ))}
                </SortableContext>
              </div>

              {/* Add new lesson button */}
              <div className="p-2">
                <NewLessonModal courseId={courseId} chapterId={chapter.id} />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}
    </SortableItem>
  );
}
