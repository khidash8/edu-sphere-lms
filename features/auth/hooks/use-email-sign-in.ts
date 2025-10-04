import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

interface UseEmailSignInOptions {
  email: string;
  onSuccess?: () => void;
  onError?: () => void;
  redirectPath?: string;
}

export const useEmailSignIn = (options: UseEmailSignInOptions) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { email, onSuccess, onError, redirectPath = '/verify-otp' } = options;

  const handleEmailSignIn = () => {
    startTransition(async () => {
      try {
        await authClient.emailOtp.sendVerificationOtp({
          email,
          type: 'sign-in',
          fetchOptions: {
            onSuccess: () => {
              toast.success('Verification OTP sent successfully');
              onSuccess?.();
              router.push(redirectPath);
            },
            onError: () => {
              toast.error('Failed to send verification OTP');
              onError?.();
            },
          },
        });
      } catch (error) {
        toast.error('An unexpected error occurred during email sign-in');
        onError?.();
      }
    });
  };

  return {
    isPending,
    handleEmailSignIn,
  };
};
