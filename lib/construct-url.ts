import { env } from '@/lib/env';

export const constructUrl = (path: string) => {
  return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.t3.storage.dev/${path}`;
};
