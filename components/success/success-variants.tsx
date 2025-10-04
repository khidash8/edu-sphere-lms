import React from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  PartyPopper,
  Gift,
  Sparkles,
  Home,
  ArrowRight,
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

export type SuccessPageType =
  | 'payment'
  | 'enrollment'
  | 'registration'
  | 'submission'
  | 'completion'
  | 'general';

export interface SuccessPageAction {
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

export interface SuccessPageProps {
  type?: SuccessPageType;
  title?: string;
  description?: string;
  badgeText?: string;
  actions?: SuccessPageAction[];
  customIcon?: LucideIcon;
  showAlert?: boolean;
  alertMessage?: string;
  className?: string;
  details?: Array<{ label: string; value: string }>;
}

const successConfigs = {
  payment: {
    icon: CheckCircle,
    title: 'Payment Successful!',
    description:
      'Your payment has been processed successfully. A confirmation email has been sent to your inbox.',
    badgeText: 'Paid',
    badgeVariant: 'default' as const,
    alertMessage:
      "You will receive a receipt via email shortly. Please check your spam folder if you don't see it.",
  },
  enrollment: {
    icon: PartyPopper,
    title: 'Successfully Enrolled!',
    description:
      'Congratulations! You are now enrolled in the course. Start learning today.',
    badgeText: 'Enrolled',
    badgeVariant: 'default' as const,
    alertMessage:
      'You can now access all course materials and start your learning journey.',
  },
  registration: {
    icon: Sparkles,
    title: 'Registration Complete!',
    description: 'Your account has been created successfully. Welcome aboard!',
    badgeText: 'Registered',
    badgeVariant: 'default' as const,
    alertMessage:
      'Please check your email to verify your account and get started.',
  },
  submission: {
    icon: CheckCircle,
    title: 'Submitted Successfully!',
    description: 'Your submission has been received and is being processed.',
    badgeText: 'Submitted',
    badgeVariant: 'default' as const,
    alertMessage: 'We will review your submission and get back to you soon.',
  },
  completion: {
    icon: Gift,
    title: 'Congratulations!',
    description: 'You have successfully completed this milestone. Great work!',
    badgeText: 'Completed',
    badgeVariant: 'default' as const,
    alertMessage:
      'Your achievement has been recorded and you can continue to the next step.',
  },
  general: {
    icon: CheckCircle,
    title: 'Success!',
    description: 'Your action was completed successfully.',
    badgeText: 'Success',
    badgeVariant: 'default' as const,
    alertMessage: 'Everything went as expected.',
  },
};

const defaultActions: SuccessPageAction[] = [
  {
    label: 'Continue',
    href: '/',
    variant: 'default',
    icon: ArrowRight,
  },
  {
    label: 'Go Home',
    href: '/',
    variant: 'outline',
    icon: Home,
  },
];

export const SuccessPage: React.FC<SuccessPageProps> = ({
  type = 'general',
  title,
  description,
  badgeText,
  actions = defaultActions,
  customIcon,
  showAlert = true,
  alertMessage,
  className = '',
  details,
}) => {
  const config = successConfigs[type];
  const IconComponent = customIcon || config.icon;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 bg-background ${className}`}
    >
      <div className="w-full max-w-lg">
        <Card className="border-border">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-green-600 dark:text-green-500" />
            </div>

            <div className="space-y-2">
              <Badge
                variant={config.badgeVariant}
                className="mx-auto bg-green-600 hover:bg-green-700"
              >
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
              <Alert className="border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/10">
                <Sparkles className="h-4 w-4 text-green-600 dark:text-green-500" />
                <AlertDescription className="text-green-800 dark:text-green-400">
                  {alertMessage || config.alertMessage}
                </AlertDescription>
              </Alert>
            )}

            {details && details.length > 0 && (
              <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                {details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-muted-foreground">
                      {detail.label}
                    </span>
                    <span className="font-medium">{detail.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'default'}
                  asChild
                >
                  <Link href={action.href} className="flex items-center gap-2">
                    {action.icon && <action.icon className="w-4 h-4" />}
                    {action.label}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
