'use client';

import React from 'react';
import { dashboardPath, homePath } from '@/features/constants/path-constants';
import { ArrowLeft, Home, LayoutDashboard } from 'lucide-react';
import { ErrorPage } from '@/components/error/error-varaiants';

const NotOwnerPage = () => {
  return (
    <ErrorPage
      type="unauthorized"
      title="You are not authorized to access"
      description="Only owner can access this page."
      badgeText="Owner Only"
      showAlert={true}
      alertMessage="Only users with owner role can access owner features."
      actions={[
        {
          label: 'Home',
          href: homePath(),
          variant: 'outline',
          icon: Home,
        },
        {
          label: 'Dashboard',
          href: dashboardPath(),
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

export default NotOwnerPage;
