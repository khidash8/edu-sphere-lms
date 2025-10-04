'use client';

import { IconCirclePlusFilled, type Icon } from '@tabler/icons-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { dashboardCreateCoursesPath } from '@/features/constants/path-constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();

  const isStudentDashboard = pathname.startsWith('/student-dashboard');

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {!isStudentDashboard && (
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Quick Create"
                className="active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                asChild
              >
                <Link href={dashboardCreateCoursesPath()}>
                  <IconCirclePlusFilled />
                  <span>Quick Create</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                className={'cursor-pointer'}
              >
                <Link
                  href={item.url}
                  className={cn(
                    pathname === item.url
                      ? 'bg-primary text-primary-foreground'
                      : ''
                  )}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
