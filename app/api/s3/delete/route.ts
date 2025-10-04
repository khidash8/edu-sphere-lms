import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
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

export const DELETE = async (req: Request) => {
  const { session } = await checkUserRole({
    allowedRoles: ['admin', 'teacher'],
  });
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
    const { key } = body;

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    }

    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: key,
    });

    const response = await S3.send(command);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Invalid request ${error}` },
      { status: 400 }
    );
  }
};
