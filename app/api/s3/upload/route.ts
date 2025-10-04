import { z } from 'zod';
import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '@/lib/env';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3 } from '@/lib/S3-client';
import arcjet, { fixedWindow } from '@/lib/arcjet';
import { checkUserRole } from '@/data-access-layer/validate-user';

const ajS3 = arcjet.withRule(
  fixedWindow({
    mode: 'LIVE',
    window: '1m',
    max: 5,
  })
);

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, { message: 'File name is required' }),
  contentType: z.string().min(1, { message: 'Content type is required' }),
  size: z.number().min(1, { message: 'File size is required' }),
  isImage: z.boolean().optional().default(false),
});

export async function POST(req: Request) {
  const { isAuthorized, session } = await checkUserRole({
    allowedRoles: ['admin', 'teacher'],
  });

  if (!isAuthorized) {
    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: 403 }
    );
  }

  try {
    const decision = await ajS3.protect(req, {
      fingerprint: session?.user.id as string,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      } else {
        return NextResponse.json({ error: 'Bot detected' }, { status: 403 });
      }
    }

    const body = await req.json();
    const validatedBody = fileUploadSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json({ error: validatedBody.error }, { status: 400 });
    }
    const { fileName, contentType, size, isImage } = validatedBody.data;

    const uniqueFileName = `${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      ContentType: contentType,
      ContentLength: size,
      Key: uniqueFileName,
    });

    const signedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // 6 minutes
    });

    const response = {
      signedUrl,
      key: uniqueFileName,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Invalid request ${error}` },
      { status: 400 }
    );
  }
}
