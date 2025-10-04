/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChapterItem,
  SortableItemType,
} from '@/features/dra-n-drop/utils/dnd-types';
import React from 'react';
import { toast } from 'sonner';
import { arrayMove } from '@dnd-kit/sortable';
import { reOrderChaptersAction } from '@/features/dra-n-drop/actions/re-order-chapters-action';
import { reOrderLessonsAction } from '@/features/dra-n-drop/actions/re-order-lessons-action';

/**
 * Handles chapter reordering logic
 * Updates local state and calls API to persist changes
 */

export const handleChapterDragEnd = async (
  activeId: string | number,
  overId: string | number,
  overType: SortableItemType,
  overData: any,
  items: ChapterItem[],
  courseId: string,
  setItems: React.Dispatch<React.SetStateAction<ChapterItem[]>>
) => {
  // Determine target chapter ID based on what was dropped on
  let targetChapterId = null;

  if (overType === 'chapter') {
    targetChapterId = overId;
  } else if (overType === 'lesson') {
    targetChapterId = overData?.chapterId || null;
  }

  if (!targetChapterId) {
    toast.error('Could not find target chapter');
    return;
  }

  // Find old and new positions in the array
  const oldIndex = items.findIndex((item) => item.id === activeId);
  const newIndex = items.findIndex((item) => item.id === targetChapterId);

  if (oldIndex === -1 || newIndex === -1) {
    toast.error('Could not find old or new chapter index');
    return;
  }

  // Reorder chapters locally and update positions
  const reOrderLocalChapters = arrayMove(items, oldIndex, newIndex);
  const updatedChapters = reOrderLocalChapters.map((chapter, index) => ({
    ...chapter,
    order: index + 1, // 1-based ordering
  }));

  // Store previous state for rollback on error
  const previousItems = [...items];

  // Optimistically update UI
  setItems(updatedChapters);

  // Prepare data for API call
  const chaptersToReOrder = updatedChapters.map((chapter) => ({
    id: chapter.id,
    position: chapter.order,
  }));

  // Call API and handle success/error with toast notifications
  const reOrderChaptersPromise = () =>
    reOrderChaptersAction(courseId, chaptersToReOrder);

  toast.promise(reOrderChaptersPromise(), {
    loading: 'Reordering chapters...',
    success: (result) => {
      if (result.status === 'success') {
        return result.message;
      }
      throw new Error(result.message);
    },
    error: () => {
      // Rollback on error
      setItems(previousItems);
      return 'Failed to reorder chapters';
    },
  });
};

/**
 * Handles lesson reordering logic within the same chapter
 * Updates local state and calls API to persist changes
 */

export const handleLessonDragEnd = async (
  activeId: string | number,
  overId: string | number,
  activeData: any,
  overData: any,
  items: ChapterItem[],
  courseId: string,
  setItems: React.Dispatch<React.SetStateAction<ChapterItem[]>>
) => {
  const chapterId = activeData?.chapterId;
  const overChapterId = overData?.chapterId;

  // Prevent moving lessons between different chapters
  if (chapterId !== overChapterId || !chapterId) {
    toast.error('Move between different chapters is not allowed');
    return;
  }

  // Find the chapter containing the lessons
  const chapterIndex = items.findIndex((item) => item.id === chapterId);

  if (chapterIndex === -1) {
    toast.error('Could not find chapter index');
    return;
  }

  const chapterToUpdate = items[chapterIndex];

  // Find old and new lesson positions within the chapter
  const oldLessonIndex = chapterToUpdate.lessons.findIndex(
    (lesson) => lesson.id === activeId
  );
  const newLessonIndex = chapterToUpdate.lessons.findIndex(
    (lesson) => lesson.id === overId
  );

  if (oldLessonIndex === -1 || newLessonIndex === -1) {
    toast.error('Could not find old or new lesson index');
    return;
  }

  // Reorder lessons within the chapter
  const reOrderLocalLessons = arrayMove(
    chapterToUpdate.lessons,
    oldLessonIndex,
    newLessonIndex
  );

  // Update lesson positions
  const updatedLessons = reOrderLocalLessons.map((lesson, index) => ({
    ...lesson,
    order: index + 1, // 1-based ordering
  }));

  // Update the chapter with reordered lessons
  const newItems = [...items];
  newItems[chapterIndex] = {
    ...chapterToUpdate,
    lessons: updatedLessons,
  };

  // Store previous state for rollback on error
  const previousItems = [...items];

  // Optimistically update UI
  setItems(newItems);

  // Prepare data for API call
  const lessonsToReOrder = updatedLessons.map((lesson) => ({
    id: lesson.id,
    position: lesson.order,
  }));

  // Call API and handle success/error with toast notifications
  const reOrderLessonsPromise = () =>
    reOrderLessonsAction(chapterId, lessonsToReOrder, courseId);

  toast.promise(reOrderLessonsPromise(), {
    loading: 'Reordering lessons...',
    success: (result) => {
      if (result.status === 'success') {
        return result.message;
      }
      throw new Error(result.message);
    },
    error: () => {
      // Rollback on error
      setItems(previousItems);
      return 'Failed to reorder lessons';
    },
  });
};
