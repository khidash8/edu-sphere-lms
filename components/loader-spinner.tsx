import React from 'react';

type LoaderSpinnerProps = {
  label?: string;
  isLabelHidden?: boolean;
};

const LoaderSpinner = ({
  label = 'Loading...',
  isLabelHidden = false,
}: LoaderSpinnerProps) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="animate-spin rounded-full border-t-2 border-blue-500 size-4" />
      {!isLabelHidden && <span>{label}</span>}
    </div>
  );
};

export { LoaderSpinner };
