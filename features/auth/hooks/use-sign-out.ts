import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { homePath } from '@/features/constants/path-constants';
import { toast } from 'sonner';
import { useTransition } from 'react';

type SignOutOptions = {
  onSuccess?: () => void;
  onError?: () => void;
  redirectPath?: string;
};

export const useSignOut = (options: SignOutOptions = {}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const { onSuccess, onError, redirectPath = homePath() } = options;

  const handleSignOut = () => {
    try {
      startTransition(async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              toast.success('Signed out successfully');
              onSuccess?.();
              router.push(redirectPath);
            },
            onError: () => {
              toast.error('Failed to sign out!!');
              onError?.();
            },
          },
        });
      });
    } catch (error) {
      onError?.();
      toast.error('An unexpected error occurred during sign-out');
    }
  };

  return {
    handleSignOut,
    pending,
  };
};
