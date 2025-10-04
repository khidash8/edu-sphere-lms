import { LucideIcon } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  variant?: 'default' | 'outline';
  onPressedChange?: () => void;
  pressed?: boolean;
  icon: LucideIcon;
  ariaLabel?: string;
  className?: string;
  autoManageState?: boolean; // New prop to enable auto state management
};

export function ToggleOutline({
  pressed = false,
  onPressedChange,
  variant = 'outline',
  icon: Icon,
  ariaLabel = 'Toggle',
  className,
  autoManageState = false,
}: Props) {
  const [internalPressed, setInternalPressed] = useState(pressed);

  // Sync internal state with external pressed prop
  useEffect(() => {
    if (!autoManageState) {
      setInternalPressed(pressed);
    }
  }, [pressed, autoManageState]);

  const handlePressedChange = () => {
    if (autoManageState) {
      setInternalPressed(!internalPressed);
    }
    onPressedChange?.();
  };

  const isPressed = autoManageState ? internalPressed : pressed;

  return (
    <Toggle
      size="sm"
      variant={variant}
      aria-label={ariaLabel}
      pressed={isPressed}
      onPressedChange={handlePressedChange}
      className={cn(className, isPressed && 'bg-accent text-accent-foreground')}
    >
      <Icon className="h-4 w-4" />
    </Toggle>
  );
}
