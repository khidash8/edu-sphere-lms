'use client';

import {
  homePath,
  publicCoursesPath,
} from '@/features/constants/path-constants';
import { ArrowLeft, Home, LayoutDashboard } from 'lucide-react';
import { ErrorPage } from '@/components/error/error-varaiants';

const PaymentCancelPage = () => {
  return (
    <ErrorPage
      type="warning"
      title="Cancelled or Failed"
      description={'Payment was cancelled or failed. Please try again.'}
      alertMessage={'Contact support for assistance or try again later.'}
      actions={[
        {
          label: 'Home',
          href: homePath(),
          variant: 'outline',
          icon: Home,
        },
        {
          label: 'All Courses',
          href: publicCoursesPath(),
          variant: 'outline',
          icon: LayoutDashboard,
        },
        {
          label: 'Go Back',
          href: '#',
          variant: 'outline',
          icon: ArrowLeft,
        },
      ]}
    />
  );
};

export default PaymentCancelPage;
