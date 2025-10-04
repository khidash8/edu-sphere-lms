'use client';

import * as React from 'react';
import {
  IconDashboard,
  IconFolder,
  IconHelp,
  IconHome,
  IconSearch,
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
  dashboardCoursesPath,
  dashboardPath,
  homePath,
} from '@/features/constants/path-constants';
import { LucideBookOpenText } from 'lucide-react';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: dashboardPath(),
      icon: IconDashboard,
    },
    {
      title: 'Courses',
      url: dashboardCoursesPath(),
      icon: IconFolder,
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
      url: '#',
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp,
    },
    {
      title: 'Search',
      url: '#',
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <LucideBookOpenText className="!size-5" />
                <span className="text-base font-semibold">Edusphere</span>
              </a>
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
