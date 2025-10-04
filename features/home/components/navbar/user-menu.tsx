import { BoltIcon, Book, ChevronDownIcon, House } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AuthSession } from '@/features/auth/types/auth-types';
import SignOutButton from '@/features/auth/components/sign-out-button';
import {
  coursesPath,
  dashboardPath,
  homePath,
  studentDashboardPath,
} from '@/features/constants/path-constants';
import { cloneElement, ReactElement, useMemo } from 'react';
import Link from 'next/link';

type iAPeProps = {
  session: AuthSession | null;
};

type iDropMenuList = {
  href: string;
  label: string;
  icon: ReactElement<{ className: string }>;
};

export default function UserMenu({ session }: iAPeProps) {
  const dropMenuList: iDropMenuList[] = useMemo(() => {
    const dashPath =
      session?.user.role === 'user' ? studentDashboardPath() : dashboardPath();

    return [
      {
        href: homePath(),
        label: 'Home',
        icon: <House />,
      },
      {
        href: coursesPath(),
        label: 'Courses',
        icon: <Book />,
      },
      {
        href: dashPath,
        label: 'Dashboard',
        icon: <BoltIcon />,
      },
    ];
  }, [session?.user?.role]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={session?.user?.image || ''} alt="Profile image" />
            <AvatarFallback>
              {session?.user?.name[0]?.toUpperCase() ||
                session?.user?.email[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48 max-w-64 mt-2">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {session?.user?.name || 'User'}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {session?.user?.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {dropMenuList.map((item) => (
            <DropdownMenuItem
              key={item.label}
              className={'cursor-pointer'}
              asChild
            >
              <Link href={item.href}>
                {cloneElement(item.icon, { className: 'size-4 opacity-60' })}
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem className={'p-0'}>
          {session ? <SignOutButton /> : null}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
