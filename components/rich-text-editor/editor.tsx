/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Menubar } from '@/components/rich-text-editor/menubar';
import TextAlign from '@tiptap/extension-text-align';

const RichTextEditor = ({ fileKey }: { fileKey: any }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-sm lg:prose-lg xl:prose-xl max-w-none min-h-[300px] focus:outline-none p-2 dark:prose-invert',
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      fileKey.onChange(JSON.stringify(json));
    },

    content: fileKey.value ? JSON.parse(fileKey.value) : '',
  });

  return (
    <div
      className={
        'w-full border border-input rounded-lg bg-card overflow-hidden dark:bg-input/30'
      }
    >
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export { RichTextEditor };
