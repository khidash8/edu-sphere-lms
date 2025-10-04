/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect } from 'react';
import { SuccessPage } from '@/components/success/success-variants';
import {
  homePath,
  publicCoursesPath,
  studentDashboardPath,
} from '@/features/constants/path-constants';
import { Home, LayoutDashboard } from 'lucide-react';
import { useConfetti } from '@/hooks/use-confetti';

const PaymentSuccessPage = () => {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div>
      <SuccessPage
        type="completion"
        title="Payment Successful"
        description="Thank you for your payment. You can now access the course."
        alertMessage={'You can now access the course.'}
        actions={[
          {
            label: 'Home',
            href: homePath(),
            variant: 'outline',
            icon: Home,
          },
          {
            label: 'Dashboard',
            href: studentDashboardPath(),
            variant: 'default',
            icon: LayoutDashboard,
          },
          {
            label: 'All Courses',
            href: publicCoursesPath(),
            variant: 'outline',
            icon: LayoutDashboard,
          },
        ]}
      />
    </div>
  );
};

export default PaymentSuccessPage;
