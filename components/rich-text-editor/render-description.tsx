'use client';

import { type JSONContent } from '@tiptap/react';
import { generateHTML } from '@tiptap/html';
import { useMemo } from 'react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import parse from 'html-react-parser';
import { cn } from '@/lib/utils';

const RenderDescription = ({
  json,
  className,
}: {
  json: JSONContent;
  className?: string;
}) => {
  const output = useMemo(() => {
    return generateHTML(json, [
      StarterKit,
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
    ]);
  }, [json]);

  // convert the json to html using react html parser
  return (
    <div
      className={cn(
        'prose prose-li:marker:text-primary prose-sm sm:prose-sm lg:prose-lg xl:prose-xl max-w-none focus:outline-none dark:prose-invert',
        className
      )}
    >
      {parse(output)}
    </div>
  );
};

export default RenderDescription;
