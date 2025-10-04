import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { homePath } from '@/features/constants/path-constants';

interface UseGithubSignInOptions {
  onSuccess?: () => void;
  onError?: () => void;
  redirectPath?: string;
}

export const useGoogleSignIn = (options: UseGithubSignInOptions = {}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { onSuccess, onError, redirectPath = homePath() } = options;

  const handleGoogleSignIn = () => {
    startTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: 'google',
          callbackURL: redirectPath,
          fetchOptions: {
            onSuccess: () => {
              toast.success('Please be patient, Logging in...');
              onSuccess?.();
              router.push(redirectPath);
            },
            onError: () => {
              toast.error('Failed to sign in with Google');
              onError?.();
            },
          },
        });
      } catch (error) {
        toast.error('An unexpected error occurred during Google sign-in');
        onError?.();
      }
    });
  };

  return {
    isPending,
    handleGoogleSignIn,
  };
};
