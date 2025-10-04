'use client';

import * as React from 'react';
import {
  IconDashboard,
  IconHelp,
  IconHome,
  IconSettings,
} from '@tabler/icons-react';

import { NavMain } from '@/components/dashboard/nav-main';
import { NavSecondary } from '@/components/dashboard/nav-secondary';
import { NavUser } from '@/components/dashboard/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  homePath,
  studentDashboardPath,
} from '@/features/constants/path-constants';
import { LucideBookOpenText } from 'lucide-react';
import Link from 'next/link';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: studentDashboardPath(),
      icon: IconDashboard,
    },
    {
      title: 'Home',
      url: homePath(),
      icon: IconHome,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: `${studentDashboardPath()}/settings`,
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: `${studentDashboardPath()}/help`,
      icon: IconHelp,
    },
  ],
};

export function StudentAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href={homePath()}>
                <LucideBookOpenText className="!size-5" />
                <span className="text-base font-semibold">Edusphere</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
