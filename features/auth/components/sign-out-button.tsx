'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useSignOut } from '@/features/auth/hooks/use-sign-out';
import { LoaderSpinner } from '@/components/loader-spinner';
import { LogOutIcon } from 'lucide-react';

const SignOutButton = () => {
  const { handleSignOut, pending } = useSignOut();

  return (
    <Button
      variant="outline"
      className="cursor-pointer w-full"
      onClick={handleSignOut}
    >
      <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
      {pending ? <LoaderSpinner label={'Signing out...'} /> : 'Sign out'}
    </Button>
  );
};

export default SignOutButton;
