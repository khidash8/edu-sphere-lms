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

export const useGithubSignIn = (options: UseGithubSignInOptions = {}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { onSuccess, onError, redirectPath = homePath() } = options;

  const handleGithubSignIn = () => {
    startTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: 'github',
          callbackURL: redirectPath,
          fetchOptions: {
            onSuccess: () => {
              toast.success('Please be patient, Logging in...');
              onSuccess?.();
              router.push(redirectPath);
            },
            onError: () => {
              toast.error('Failed to sign in with GitHub');
              onError?.();
            },
          },
        });
      } catch (error) {
        toast.error('An unexpected error occurred during GitHub sign-in');
        onError?.();
      }
    });
  };

  return {
    isPending,
    handleGithubSignIn,
  };
};
