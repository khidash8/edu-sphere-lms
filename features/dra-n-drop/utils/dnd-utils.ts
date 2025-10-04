import { SingleCourseType } from '@/features/dashboard/actions/get-single-couse-action';
import { ChapterItem } from '@/features/dra-n-drop/utils/dnd-types';

/**
 * Transforms raw course data into internal state structure
 * Preserves existing isOpen state if items already exist
 */
export const transformDataToItems = (
  chapters: SingleCourseType['chapters'],
  existingItems: ChapterItem[] = []
): ChapterItem[] => {
  return chapters.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    order: chapter.position,
    // Preserve existing open state, default to true for new items
    isOpen:
      existingItems.find((item) => item.id === chapter.id)?.isOpen || true,
    lessons: chapter.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      order: lesson.position,
    })),
  }));
};
