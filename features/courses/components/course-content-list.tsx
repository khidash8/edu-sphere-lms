'use client';

import React from 'react';
import { IconChevronDown, IconVideo, IconClock } from '@tabler/icons-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const CourseContentList = ({
  chapters,
}: {
  chapters: {
    id: string;
    title: string;
    lessons: { id: string; title: string }[];
  }[];
}) => {
  const [openChapters, setOpenChapters] = React.useState(
    new Set([chapters[0]?.id])
  );

  const toggleChapter = (chapterId: string) => {
    setOpenChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  const totalLessons = chapters.reduce(
    (total, chapter) => total + chapter.lessons.length,
    0
  );

  return (
    <div className="space-y-2 border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Course Content</h3>
          <button
            onClick={() => {
              if (openChapters.size === chapters.length) {
                setOpenChapters(new Set());
              } else {
                setOpenChapters(new Set(chapters.map((ch) => ch.id)));
              }
            }}
            className="text-sm text-primary hover:underline"
          >
            {openChapters.size === chapters.length
              ? 'Collapse all'
              : 'Expand all'}
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {chapters.length} chapters • {totalLessons} lessons
        </p>
      </div>

      {/* Chapters List */}
      <div className="divide-y">
        {chapters.map((chapter, chapterIndex) => (
          <Collapsible
            key={chapter.id}
            open={openChapters.has(chapter.id)}
            onOpenChange={() => toggleChapter(chapter.id)}
          >
            <CollapsibleTrigger className="w-full p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <IconChevronDown
                    className={`transition-transform ${
                      openChapters.has(chapter.id) ? 'rotate-0' : '-rotate-90'
                    }`}
                    size={20}
                  />
                  <div className="text-left">
                    <h4 className="font-medium">{chapter.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {chapter.lessons.length} lessons
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="pl-4 pr-4 pb-2 space-y-1">
                {chapter.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 hover:bg-muted/30 rounded-md transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <IconVideo size={18} className="text-muted-foreground" />
                      <span className="text-sm group-hover:text-primary transition-colors">
                        {lesson.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <IconClock size={16} />
                      <span>05:24</span>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export { CourseContentList };
