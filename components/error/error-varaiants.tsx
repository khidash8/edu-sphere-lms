import React from 'react';
import Link from 'next/link';
import {
  ShieldX,
  AlertTriangle,
  XCircle,
  Info,
  Home,
  ArrowLeft,
  LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export type ErrorPageType =
  | 'unauthorized'
  | 'forbidden'
  | 'not-found'
  | 'error'
  | 'warning'
  | 'info';

export interface ErrorPageAction {
  label: string;
  href: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  icon?: LucideIcon;
}

export interface ErrorPageProps {
  type?: ErrorPageType;
  title?: string;
  description?: string;
  badgeText?: string;
  actions?: ErrorPageAction[];
  customIcon?: LucideIcon;
  showAlert?: boolean;
  alertMessage?: string;
  className?: string;
}

const errorConfigs = {
  unauthorized: {
    icon: ShieldX,
    title: 'Access Denied',
    description:
      "You don't have permission to access this page. Please contact an administrator if you believe this is an error.",
    badgeText: 'Unauthorized',
    badgeVariant: 'destructive' as const,
    alertMessage:
      'Your current role does not have sufficient privileges to view this content.',
  },
  forbidden: {
    icon: XCircle,
    title: 'Forbidden',
    description: 'This action is not allowed for your account type.',
    badgeText: 'Forbidden',
    badgeVariant: 'destructive' as const,
    alertMessage: 'Access to this resource has been restricted.',
  },
  'not-found': {
    icon: AlertTriangle,
    title: 'Page Not Found',
    description: "The page you're looking for doesn't exist or has been moved.",
    badgeText: '404',
    badgeVariant: 'secondary' as const,
    alertMessage: 'The requested resource could not be found.',
  },
  error: {
    icon: XCircle,
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again later.',
    badgeText: 'Error',
    badgeVariant: 'destructive' as const,
    alertMessage:
      'Please refresh the page or contact support if the problem persists.',
  },
  warning: {
    icon: AlertTriangle,
    title: 'Warning',
    description: 'Please review the following information before proceeding.',
    badgeText: 'Warning',
    badgeVariant: 'outline' as const,
    alertMessage: 'This action may have unintended consequences.',
  },
  info: {
    icon: Info,
    title: 'Information',
    description: "Here's some important information you should know.",
    badgeText: 'Info',
    badgeVariant: 'secondary' as const,
    alertMessage: 'Please read the following details carefully.',
  },
};

const defaultActions: ErrorPageAction[] = [
  {
    label: 'Go Home',
    href: '/',
    variant: 'default',
    icon: Home,
  },
  {
    label: 'Go Back',
    href: '#',
    variant: 'outline',
    icon: ArrowLeft,
  },
];

export const ErrorPage: React.FC<ErrorPageProps> = ({
  type = 'error',
  title,
  description,
  badgeText,
  actions = defaultActions,
  customIcon,
  showAlert = true,
  alertMessage,
  className = '',
}) => {
  const config = errorConfigs[type];
  const IconComponent = customIcon || config.icon;

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 bg-background ${className}`}
    >
      <div className="w-full max-w-lg">
        <Card className="border-border">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <Badge variant={config.badgeVariant} className="mx-auto">
                {badgeText || config.badgeText}
              </Badge>

              <CardTitle className="text-2xl font-bold">
                {title || config.title}
              </CardTitle>

              <CardDescription className="text-base">
                {description || config.description}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {showAlert && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  {alertMessage || config.alertMessage}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {actions.map((action, index) => {
                if (action.href === '#') {
                  return (
                    <Button
                      key={index}
                      variant={action.variant || 'default'}
                      onClick={handleGoBack}
                      className="flex items-center gap-2"
                    >
                      {action.icon && <action.icon className="w-4 h-4" />}
                      {action.label}
                    </Button>
                  );
                }

                return (
                  <Button
                    key={index}
                    variant={action.variant || 'default'}
                    asChild
                  >
                    <Link
                      href={action.href}
                      className="flex items-center gap-2"
                    >
                      {action.icon && <action.icon className="w-4 h-4" />}
                      {action.label}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
