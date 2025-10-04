import { SingleCourseType } from '@/features/dashboard/actions/get-single-couse-action';
import { DraggableSyntheticListeners } from '@dnd-kit/core';
import { ReactNode } from 'react';

export type CourseContentStructureProps = {
  data: SingleCourseType;
};

export type SortableItemType = 'chapter' | 'lesson';

export type SortableItemProps = {
  id: string;
  children: (listeners: DraggableSyntheticListeners) => ReactNode;
  className?: string;
  data?: {
    type: SortableItemType;
    chapterId?: string;
  };
};

// Internal state structure for chapters and lessons
export type ChapterItem = {
  id: string;
  title: string;
  order: number;
  isOpen: boolean; // Controls collapsible state
  lessons: LessonItem[];
};

export type LessonItem = {
  id: string;
  title: string;
  order: number;
};
