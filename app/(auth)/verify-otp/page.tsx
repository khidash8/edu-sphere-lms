import { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LoaderSpinner } from '@/components/loader-spinner';
import { VerifyOTPContent } from '@/features/auth/verify-otp-content';

const VerifyOTPPage = () => {
  return (
    <Suspense
      fallback={
        <Card className="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
          <CardContent className="p-4">
            <div className="flex items-center justify-center">
              <LoaderSpinner label="Loading verification..." />
            </div>
          </CardContent>
        </Card>
      }
    >
      <VerifyOTPContent />
    </Suspense>
  );
};

export default VerifyOTPPage;
