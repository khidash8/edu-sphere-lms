/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { type Editor } from '@tiptap/react';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ListIcon,
  ListOrderedIcon,
  LucideBold,
  LucideHeading1,
  LucideHeading2,
  LucideHeading3,
  LucideItalic,
  LucideStrikethrough,
  LucideIcon,
} from 'lucide-react';
import { ToggleOutline } from '@/components/toggle-outline';
import { Separator } from '@/components/ui/separator';
import { UndoRedoButton } from '@/components/tiptap-ui/undo-redo-button';

type MenubarProps = {
  editor: Editor | null;
};

// Define action types
type SimpleAction = string;
type ComplexAction = {
  command: string;
  params: any;
};

type ActionResult = SimpleAction | ComplexAction;

// Define button configuration type
type ButtonConfig = {
  icon: LucideIcon;
  action: () => ActionResult;
  isActive: (editor: Editor) => boolean;
  ariaLabel: string;
};

// Define button configurations
const formatButtons: ButtonConfig[] = [
  {
    icon: LucideBold,
    action: () => 'toggleBold',
    isActive: (editor: Editor) => editor.isActive('bold'),
    ariaLabel: 'Toggle bold',
  },
  {
    icon: LucideItalic,
    action: () => 'toggleItalic',
    isActive: (editor: Editor) => editor.isActive('italic'),
    ariaLabel: 'Toggle italic',
  },
  {
    icon: LucideStrikethrough,
    action: () => 'toggleStrike',
    isActive: (editor: Editor) => editor.isActive('strike'),
    ariaLabel: 'Toggle strikethrough',
  },
  {
    icon: LucideHeading1,
    action: () => ({ command: 'toggleHeading', params: { level: 1 } }),
    isActive: (editor: Editor) => editor.isActive('heading', { level: 1 }),
    ariaLabel: 'Toggle heading 1',
  },
  {
    icon: LucideHeading2,
    action: () => ({ command: 'toggleHeading', params: { level: 2 } }),
    isActive: (editor: Editor) => editor.isActive('heading', { level: 2 }),
    ariaLabel: 'Toggle heading 2',
  },
  {
    icon: LucideHeading3,
    action: () => ({ command: 'toggleHeading', params: { level: 3 } }),
    isActive: (editor: Editor) => editor.isActive('heading', { level: 3 }),
    ariaLabel: 'Toggle heading 3',
  },
  {
    icon: ListIcon,
    action: () => 'toggleBulletList',
    isActive: (editor: Editor) => editor.isActive('bulletList'),
    ariaLabel: 'Toggle bullet list',
  },
  {
    icon: ListOrderedIcon,
    action: () => 'toggleOrderedList',
    isActive: (editor: Editor) => editor.isActive('orderedList'),
    ariaLabel: 'Toggle ordered list',
  },
];

const alignButtons: ButtonConfig[] = [
  {
    icon: AlignLeftIcon,
    action: () => ({ command: 'setTextAlign', params: 'left' }),
    isActive: (editor: Editor) => editor.isActive({ textAlign: 'left' }),
    ariaLabel: 'Align left',
  },
  {
    icon: AlignCenterIcon,
    action: () => ({ command: 'setTextAlign', params: 'center' }),
    isActive: (editor: Editor) => editor.isActive({ textAlign: 'center' }),
    ariaLabel: 'Align center',
  },
  {
    icon: AlignRightIcon,
    action: () => ({ command: 'setTextAlign', params: 'right' }),
    isActive: (editor: Editor) => editor.isActive({ textAlign: 'right' }),
    ariaLabel: 'Align right',
  },
];

const Menubar = ({ editor }: MenubarProps) => {
  if (!editor) {
    return null;
  }

  const executeAction = (actionConfig: () => ActionResult) => {
    const action = actionConfig();

    if (typeof action === 'string') {
      // Simple command like 'toggleBold'
      (editor.chain().focus() as any)[action]().run();
    } else {
      // Command with parameters like { command: 'toggleHeading', params: { level: 1 } }
      if (action.params && typeof action.params === 'object') {
        (editor.chain().focus() as any)[action.command](action.params).run();
      } else {
        (editor.chain().focus() as any)[action.command](action.params).run();
      }
    }
  };

  const renderButtonGroup = (buttons: ButtonConfig[]) => {
    return buttons.map((button, index) => (
      <ToggleOutline
        key={index}
        icon={button.icon}
        pressed={button.isActive(editor)}
        onPressedChange={() => executeAction(button.action)}
        ariaLabel={button.ariaLabel}
        // autoManageState={true}
      />
    ));
  };

  return (
    <div className="border-t-0 border-b border-x-0 border-input p-2 bg-card flex items-center flex-wrap gap-2">
      {/* Format buttons */}
      <div className="flex items-center gap-2">
        {renderButtonGroup(formatButtons)}
      </div>

      <Separator
        orientation="vertical"
        className="mx-2 data-[orientation=vertical]:h-8"
      />

      {/* Alignment buttons */}
      <div className="flex items-center flex-wrap gap-2">
        {renderButtonGroup(alignButtons)}
      </div>

      <Separator
        orientation="vertical"
        className="mx-2 data-[orientation=vertical]:h-8"
      />

      {/* Undo/Redo buttons */}
      <div className="flex items-center flex-wrap gap-2">
        <UndoRedoButton
          editor={editor}
          action="undo"
          hideWhenUnavailable={true}
          onExecuted={() => console.log('Undo executed!')}
        />
        <UndoRedoButton
          editor={editor}
          action="redo"
          hideWhenUnavailable={true}
          onExecuted={() => console.log('Redo executed!')}
        />
      </div>
    </div>
  );
};

export { Menubar };
