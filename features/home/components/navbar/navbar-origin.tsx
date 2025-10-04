'use client';

import { buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { LucideBookOpenText } from 'lucide-react';
import {
  coursesPath,
  dashboardPath,
  homePath,
  studentDashboardPath,
} from '@/features/constants/path-constants';
import Link from 'next/link';
import UserMenu from '@/features/home/components/navbar/user-menu';
import { ThemeToggle } from '@/components/ui/theme-toggler';
import { authClient } from '@/lib/auth-client';
import { useMemo } from 'react';
import { AuthSession } from '@/features/auth/types/auth-types';

export interface RouteProps {
  href: string;
  label: string;
}

export default function NavbarOrigin() {
  const { data: session } = authClient.useSession();

  const routeList: RouteProps[] = useMemo(() => {
    const baseRoutes = [
      {
        href: homePath(),
        label: 'Home',
      },
      {
        href: coursesPath(),
        label: 'Courses',
      },
    ];

    if (session?.user) {
      const dashPath =
        session.user.role === 'user' ? studentDashboardPath() : dashboardPath();

      baseRoutes.push({
        href: dashPath,
        label: 'Dashboard',
      });
    }

    return baseRoutes;
  }, [session?.user]);

  return (
    <header className="border-b px-6 md:px-10 lg:px-20 sticky top-0 z-50 backdrop-blur-2xl animate-header-from-top">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link
              href={homePath()}
              className="text-primary hover:text-primary/90"
            >
              <LucideBookOpenText />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {routeList.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={link.href}
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          {session?.user ? (
            <div className={'flex items-center gap-2'}>
              <ThemeToggle />
              <UserMenu session={session as AuthSession} />
            </div>
          ) : (
            <div className={'flex items-center gap-2'}>
              <ThemeToggle />
              <Link
                href={'/login'}
                className={buttonVariants({
                  variant: 'outline',
                  className: 'cursor-pointer',
                })}
              >
                <label>Login</label>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
