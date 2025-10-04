import React from 'react';
import { CardTitle } from '@/components/ui/card';
import { ArrowLeft, LucideBookOpenText } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import {
  homePath,
  privacyPath,
  termsPath,
} from '@/features/constants/path-constants';

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      {/* Back button */}
      <Link
        href={homePath()}
        className={buttonVariants({
          variant: 'outline',
          className: 'cursor-pointer absolute top-6 left-6',
        })}
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      {/* Heder */}
      <div className="flex w-full items-center justify-center rounded-md">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <LucideBookOpenText className="size-8" />
          <CardTitle className="text-xl font-semibold">EduSphere</CardTitle>
          <span className="sr-only ">Anxious Ape LMS</span>
        </Link>
      </div>

      <div className="w-full max-w-sm">{children}</div>

      {/* Footer */}
      <div className="text-muted-foreground *:[a]:hover:text-primary mt-6 text-center text-sm text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{' '}
        <Link href={termsPath()}>Terms of Service</Link> and{' '}
        <Link href={privacyPath()}>Privacy Policy</Link>.
      </div>
    </div>
  );
}
