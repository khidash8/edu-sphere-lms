'use client';

import {
  ChapterItem,
  CourseContentStructureProps,
  SortableItemType,
} from '@/features/dra-n-drop/utils/dnd-types';
import { useEffect, useState } from 'react';
import { transformDataToItems } from '@/features/dra-n-drop/utils/dnd-utils';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  handleChapterDragEnd,
  handleLessonDragEnd,
} from '@/features/dra-n-drop/utils/handle-drag-logic';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import CardCompact from '@/components/card-compact';
import { ChapterItemComponent } from '@/features/dra-n-drop/components/chapter-item-component';
import { NewChapterModal } from '@/features/dashboard/components/new-chapter-modal';

/**
 * Main component that orchestrates the entire course content structure
 * Handles drag and drop for both chapters and lessons
 */
export const MainCourseStructure = ({ data }: CourseContentStructureProps) => {
  // Initialize local state from props data
  const [items, setItems] = useState<ChapterItem[]>(() =>
    transformDataToItems(data.chapters)
  );

  // Update local state when props change (e.g., after API updates)
  useEffect(() => {
    setItems((prevItems) => transformDataToItems(data.chapters, prevItems));
  }, [data.chapters]);

  /**
   * Main drag end handler - determines whether chapter or lesson was dragged
   * and delegates to appropriate handler function
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Exit early if no valid drop target or same position
    if (!over || active.id === over.id) {
      return;
    }

    // Extract drag and drop information
    const activeId = active.id;
    const overId = over.id;
    const activeType = active.data?.current?.type as SortableItemType;
    const overType = over.data?.current?.type as SortableItemType;
    const courseId = data.id;

    // Handle chapter dragging
    if (activeType === 'chapter') {
      handleChapterDragEnd(
        activeId,
        overId,
        overType,
        over.data?.current,
        items,
        courseId,
        setItems
      );
      return;
    }

    // Handle lesson dragging
    if (activeType === 'lesson' && overType === 'lesson') {
      handleLessonDragEnd(
        activeId,
        overId,
        active.data?.current,
        over.data?.current,
        items,
        courseId,
        setItems
      );
      return;
    }
  };

  /**
   * Configure drag and drop sensors
   * Supports both mouse/touch and keyboard navigation
   */
  const sensors = useSensors(
    useSensor(PointerSensor), // Mouse and touch support
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates, // Keyboard accessibility
    })
  );

  /**
   * Toggle chapter open/closed state
   */
  const toggleChapter = (chapterId: string) => {
    setItems((currentItems) =>
      currentItems.map((item) => ({
        ...item,
        isOpen: item.id === chapterId ? !item.isOpen : item.isOpen,
      }))
    );
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <DndContext
      collisionDetection={rectIntersection} // Determines drop zones
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <CardCompact
        title="Chapters"
        headerProps={{
          className:
            'flex items-center justify-between gap-2 border-b border-border',
        }}
        contentProps={{
          className: 'space-y-4',
        }}
        headerContent={<NewChapterModal courseId={data.id} />}
        content={
          // Sortable context for chapters
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((chapter) => (
              <ChapterItemComponent
                key={chapter.id}
                chapter={chapter}
                courseId={data.id}
                onToggleChapter={toggleChapter}
              />
            ))}
          </SortableContext>
        }
      />
    </DndContext>
  );
};
