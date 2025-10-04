import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { homePath } from '@/features/constants/path-constants';

interface UseOtpVerifyOptions {
  email: string;
  otp: string;
  onSuccess?: () => void;
  onError?: () => void;
  redirectPath?: string;
}

export const useEmailOtpVerify = (options: UseOtpVerifyOptions) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { email, otp, onSuccess, onError, redirectPath = homePath() } = options;

  const handleOtpVerify = () => {
    startTransition(async () => {
      try {
        await authClient.signIn.emailOtp({
          email,
          otp,
          fetchOptions: {
            onSuccess: () => {
              toast.success('OTP verified successfully');
              onSuccess?.();
              router.push(redirectPath);
            },
            onError: () => {
              toast.error('Failed to verify OTP');
              onError?.();
            },
          },
        });
      } catch (error) {
        toast.error('An unexpected error occurred during OTP verification');
        onError?.();
      }
    });
  };

  return {
    isPending,
    handleOtpVerify,
  };
};
