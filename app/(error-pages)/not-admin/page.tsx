'use client';

import React from 'react';
import { ArrowLeft, Home, LayoutDashboard } from 'lucide-react';
import { ErrorPage } from '@/components/error/error-varaiants';
import { dashboardPath, homePath } from '@/features/constants/path-constants';

const NotAdminPage = () => {
  return (
    <ErrorPage
      type="unauthorized"
      title="Admin Access Required"
      description="You need administrator privileges to access this page. Please contact your system administrator to request access."
      badgeText="Admin Only"
      showAlert={true}
      alertMessage="Only users with admin role can access administrative features."
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

export default NotAdminPage;
