import { useMemo } from 'react';

type LessonProgress = {
  lessonId: string;
  completed: boolean;
  userId?: string;
};

type Lesson = {
  id: string;
  title: string;
  lessonProgress?: LessonProgress[];
};

type Chapter = {
  id: string;
  title: string;
  position: number;
  lessons: Lesson[];
};

type CourseData = {
  id: string;
  title: string;
  slug: string;
  chapters?: Chapter[];
};

type CourseProgressResult = {
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  isCompleted: boolean;
  chaptersProgress: {
    chapterId: string;
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
  }[];
};

/**
 * Custom hook to calculate course progress metrics
 * @param courseData - Course data with chapters and lessons
 * @param userId - Optional user ID to filter progress (if needed)
 * @returns Course progress metrics including total/completed lessons and percentage
 */
export const useCourseProgress = (
  courseData: CourseData | null | undefined,
  userId?: string
): CourseProgressResult => {
  return useMemo(() => {
    // Default return value if no course data
    if (!courseData || !courseData.chapters) {
      return {
        totalLessons: 0,
        completedLessons: 0,
        progressPercentage: 0,
        isCompleted: false,
        chaptersProgress: [],
      };
    }

    let totalLessons = 0;
    let completedLessons = 0;
    const chaptersProgress: CourseProgressResult['chaptersProgress'] = [];

    // Calculate progress for each chapter
    courseData.chapters.forEach((chapter) => {
      let chapterCompleted = 0;
      const chapterTotal = chapter.lessons.length;

      chapter.lessons.forEach((lesson) => {
        totalLessons++;

        // Check if lesson is completed
        const isCompleted =
          lesson.lessonProgress?.some((progress) => {
            const matchesUser = userId ? progress.userId === userId : true;
            return (
              progress.lessonId === lesson.id &&
              progress.completed &&
              matchesUser
            );
          }) ?? false;

        if (isCompleted) {
          completedLessons++;
          chapterCompleted++;
        }
      });

      // Calculate chapter progress percentage
      const chapterProgressPercentage =
        chapterTotal > 0
          ? Math.round((chapterCompleted / chapterTotal) * 100)
          : 0;

      chaptersProgress.push({
        chapterId: chapter.id,
        totalLessons: chapterTotal,
        completedLessons: chapterCompleted,
        progressPercentage: chapterProgressPercentage,
      });
    });

    // Calculate overall progress percentage
    const progressPercentage =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    const isCompleted = totalLessons > 0 && completedLessons === totalLessons;

    return {
      totalLessons,
      completedLessons,
      progressPercentage,
      isCompleted,
      chaptersProgress,
    };
  }, [courseData, userId]);
};
