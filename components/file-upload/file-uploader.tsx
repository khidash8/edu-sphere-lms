'use client';

import { FileRejection, useDropzone } from 'react-dropzone';
import CardCompact from '@/components/card-compact';
import { cn } from '@/lib/utils';
import {
  RenderEmptyState,
  RenderErrorState,
  RenderSuccessState,
  RenderUploadingStateDots,
} from '@/components/file-upload/render-state';
import { toast } from 'sonner';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  s3DeletePath,
  s3UploadPath,
} from '@/features/constants/path-constants';
import { constructUrl } from '@/lib/construct-url';

type UploadFileProps = {
  id: string | null;
  file: File | null;
  uploadingState: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error?: boolean;
  objectUrl?: string;
  fileType?: 'image' | 'video';
};

type iApeProps = {
  value?: string;
  onChange: (value: string) => void;
  fileType?: 'image' | 'video';
};

const FileUploader = ({ onChange, value, fileType = 'image' }: iApeProps) => {
  const objectUrl = value ? constructUrl(value || '') : '';
  const [file, setFile] = useState<UploadFileProps>({
    id: null,
    error: false,
    file: null,
    uploadingState: false,
    progress: 0,
    key: value,
    isDeleting: false,
    objectUrl: objectUrl || '',
    fileType: fileType,
  });

  const renderFile = () => {
    if (file.uploadingState) {
      return (
        <div className="flex items-center justify-center h-full w-full p-4">
          <RenderUploadingStateDots progress={file.progress} />
        </div>
      );
    }

    if (file.error) {
      return (
        <div className="flex items-center justify-center h-full w-full p-4">
          <RenderErrorState />
        </div>
      );
    }

    if (file.objectUrl) {
      return (
        <RenderSuccessState
          previewUrl={file.objectUrl}
          handleDeleteFile={handleDeleteFile}
          isDeleting={file.isDeleting}
          fileType={file.fileType || 'image'}
        />
      );
    }
    return (
      <div className="flex items-center justify-center h-full w-full p-4">
        <RenderEmptyState />
      </div>
    );
  };

  const uploadFile = useCallback(
    async (file: File) => {
      setFile((prev) => ({
        ...prev,
        file,
        uploadingState: true,
        progress: 0,
      }));

      try {
        //   1. Get signed url from server
        const response = await fetch(s3UploadPath(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            size: file.size,
            isImage: file.type.startsWith('image/'),
          }),
        });

        if (!response.ok) {
          toast.error(response.statusText || 'Failed to get pre-signed url');
          setFile((prev) => ({
            ...prev,
            uploadingState: false,
            progress: 0,
            error: true,
          }));

          return;
        }

        const { signedUrl, key } = await response.json();

        // 2. get the progress of the upload using XHR
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          // get the progress of the upload
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = (event.loaded / event.total) * 100;
              setFile((prev) => ({
                ...prev,
                progress: Math.round(progress),
              }));
            }
          };

          // resolve the promise when the upload is complete
          xhr.onload = () => {
            if (
              xhr.status === 200 ||
              xhr.status === 204 ||
              xhr.status === 201
            ) {
              setFile((pre) => ({
                ...pre,
                uploadingState: false,
                progress: 100,
                key,
                error: false,
              }));
              toast.success('File uploaded successfully');
              onChange?.(key);
              resolve();
            } else {
              toast.error('File upload failed');
              reject(new Error('File upload failed'));
            }
          };

          // reject the promise if the upload fails
          xhr.onerror = () => {
            toast.error('File upload failed');
            reject(new Error('File upload failed'));
          };

          // 3. send the file to S3
          xhr.open('PUT', signedUrl);
          xhr.setRequestHeader('Content-Type', file.type);
          xhr.send(file);
        });
      } catch {
        toast.error('File upload failed');
        setFile((prev) => ({
          ...prev,
          uploadingState: false,
          progress: 0,
          error: true,
        }));
      }
    },
    [onChange]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // check if there is an object url in the memory, if then revoke
      if (file.objectUrl && !file.objectUrl.startsWith('http')) {
        URL.revokeObjectURL(file.objectUrl);
      }

      const fileInside = acceptedFiles[0];

      if (fileInside) {
        setFile({
          file: fileInside,
          uploadingState: false,
          progress: 0,
          objectUrl: URL.createObjectURL(fileInside),
          fileType: fileInside.type.startsWith('image/') ? 'image' : 'video',
          error: false,
          isDeleting: false,
          id: uuidv4(),
          key: undefined,
        });
      }
      uploadFile(fileInside);
    },
    [file.objectUrl, uploadFile]
  );

  const rejectedFileHandler = (fileRejection: FileRejection[]) => {
    console.log(fileRejection);
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (file) => file.errors[0].code === 'too-many-files'
      );

      const tooLargeFiles = fileRejection.find(
        (file) => file.errors[0].code === 'file-too-large'
      );

      const invalidFiles = fileRejection.find(
        (file) => file.errors[0].code === 'file-invalid-type'
      );

      if (tooManyFiles) {
        toast.error('Too many files selected, max 1 file allowed');
      }
      if (tooLargeFiles) {
        toast.error('File size too large, max 5MB allowed');
      }
      if (invalidFiles) {
        toast.error('Invalid file type, only image files are allowed');
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fileType === 'image' ? { 'image/*': [] } : { 'video/*': [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 1024 * 1024 * 5, // 5MB
    onDropRejected: rejectedFileHandler,
    disabled: file.isDeleting || file.uploadingState || !!file.objectUrl,
  });

  const handleDeleteFile = async () => {
    if (!file.key || file.isDeleting || !file.objectUrl) return;

    if (file.objectUrl && !file.objectUrl?.startsWith('http')) {
      URL.revokeObjectURL(file.objectUrl);
    }

    try {
      setFile((prev) => ({
        ...prev,
        isDeleting: true,
      }));

      const response = await fetch(s3DeletePath(), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: file.key }),
      });

      if (!response.ok) {
        toast.error('Failed to delete file');
        setFile((prev) => ({
          ...prev,
          isDeleting: false,
          error: true,
        }));
        return;
      }

      onChange?.('');

      if (file.objectUrl && !file.objectUrl.startsWith('http')) {
        URL.revokeObjectURL(file.objectUrl);
      }

      setFile(() => ({
        id: null,
        error: false,
        file: null,
        uploadingState: false,
        progress: 0,
        key: undefined,
        isDeleting: false,
        objectUrl: undefined,
        fileType: 'image',
      }));

      toast.success('File deleted successfully');
    } catch (error) {
      toast.error('Failed to delete file');
      setFile((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }));
    }
  };

  useEffect(() => {
    return () => {
      if (file.objectUrl && !file.objectUrl.startsWith('http')) {
        URL.revokeObjectURL(file.objectUrl);
      }
    };
  }, [file.objectUrl]);

  return (
    <div {...getRootProps()}>
      <CardCompact
        className={cn(
          'relative border-2 border-dashed transition-colors ease-in-out duration-300 h-[300px] dark:bg-input/30 bg-card cursor-pointer shadow-none',
          isDragActive
            ? 'border-primary bg-primary/10 border-solid'
            : 'border-border hover:border-primary'
        )}
        content={
          <div>
            <input {...getInputProps()} />
            {renderFile()}
          </div>
        }
        contentClassName="flex items-center justify-center h-full w-full p-4"
      />
    </div>
  );
};

export { FileUploader };
