import React from 'react';
import { IconUpload, IconX } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import { LoaderSpinner } from '@/components/loader-spinner';

export const RenderEmptyState = () => {
  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <div className={'flex flex-col items-center gap-2 cursor-pointer'}>
        <IconUpload />
        <p>Drag and drop some files here, or </p>{' '}
        <Button type={'button'} variant="outline" className={'cursor-pointer'}>
          Click to upload
        </Button>
      </div>
    </div>
  );
};

export const RenderErrorState = () => {
  return (
    <div className={'text-center flex flex-col items-center gap-1'}>
      <ImageOff className={'size-12 text-destructive '} />
      <p className={'text-md font-semibold'}>Upload failed</p>
      <p className={'text-base font-medium'}>Something went wrong</p>
      <Button type={'button'} variant="secondary" className={'cursor-pointer'}>
        Try again
      </Button>
    </div>
  );
};

export const RenderUploadingStateDots = ({
  progress = 0,
}: {
  progress?: number;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
        <span className="text-sm font-semibold text-primary">
          {Math.round(progress)}%
        </span>
      </div>
      <h1 className="text-sm font-medium text-primary">Uploading...</h1>
    </div>
  );
};

export const RenderSuccessState = ({
  previewUrl,
  isDeleting,
  handleDeleteFile,
  fileType,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleDeleteFile: () => void;
  fileType: 'image' | 'video';
}) => {
  return (
    <div>
      {fileType === 'image' ? (
        <Image
          src={previewUrl}
          alt={'image preview'}
          fill
          className={'object-contain'}
        />
      ) : (
        <video
          src={previewUrl}
          controls
          className={'max-h-[280px] w-full h-full object-contain rounded-md'}
        />
      )}
      <Button
        type={'button'}
        size={'icon'}
        className={'cursor-pointer absolute top-2 right-2'}
        disabled={isDeleting}
        onClick={handleDeleteFile}
      >
        {isDeleting ? <LoaderSpinner isLabelHidden /> : <IconX size={20} />}
      </Button>
    </div>
  );
};
