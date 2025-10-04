'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoaderSpinner } from '@/components/loader-spinner';
import { homePath } from '@/features/constants/path-constants';
import { useEmailOtpVerify } from '@/features/auth/hooks/use-email-otp-verfy';

export const VerifyOTPContent = () => {
  const [otp, setOtp] = useState('');
  const isOtpValid = otp.length === 6;
  const searchParams = useSearchParams();
  const email = searchParams.get('email') as string;

  const { handleOtpVerify, isPending: otpPending } = useEmailOtpVerify({
    email,
    otp,
    onSuccess: () => {
      console.log('OTP verified successfully');
    },
    onError: () => {
      console.log('Failed to verify OTP');
    },
    redirectPath: homePath(),
  });

  return (
    <Card className="flex flex-col items-center justify-center p-6 max-w-md mx-auto mt-10">
      <CardTitle className="text-xl font-semibold mb-2">Verify OTP</CardTitle>
      <CardDescription className="text-muted-foreground mb-6 text-center">
        Enter the 6-digit OTP sent to your email address
      </CardDescription>
      <CardContent className="p-0 mb-6">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        {email && (
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Sent to: {email}
          </p>
        )}
      </CardContent>
      <CardFooter className="w-full p-0">
        <Button
          disabled={!isOtpValid || otpPending}
          className="w-full cursor-pointer py-3"
          onClick={handleOtpVerify}
        >
          {otpPending ? (
            <LoaderSpinner label="Verifying OTP..." />
          ) : (
            'Verify OTP'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
