import { SortableItemProps } from '@/features/dra-n-drop/utils/dnd-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

/**
 * Generic sortable wrapper component
 * Handles drag and drop functionality for any item type
 */
export function SortableItem({
  children,
  id,
  className,
  data,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data });

  // Apply transform styles for smooth dragging animation
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        'touch-none', // Disable touch scrolling during drag
        className,
        isDragging ? 'z-10' : '' // Ensure dragged item appears above others
      )}
    >
      {children(listeners)}
    </div>
  );
}
