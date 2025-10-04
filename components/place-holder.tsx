import { cloneElement, ReactElement } from 'react';
import { LucideMessageSquareWarning } from 'lucide-react';

type PlaceholderProps = {
  message: string;
  icon?: ReactElement<{ className?: string }>;
  button?: ReactElement<{ className?: string }>;
};

const Placeholder = ({
  message,
  icon = <LucideMessageSquareWarning />,
  button = <div />,
}: PlaceholderProps) => {
  return (
    <div
      className={'flex-1 flex flex-col items-center justify-center space-y-2'}
    >
      {cloneElement(icon, { className: 'w-8 h-8' })}
      <h2 className={'text-xl font-semibold'}>{message}</h2>
      {cloneElement(button, { className: 'h-10' })}
    </div>
  );
};

export { Placeholder };
