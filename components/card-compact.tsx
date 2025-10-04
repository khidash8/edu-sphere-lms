import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const CardCompact = ({
  title,
  description,
  className,
  content,
  footer,
  contentClassName,
  headerProps,
  titleProps,
  descriptionProps,
  contentProps,
  footerProps,
  headerContent,
  ...props
}: {
  title?: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  headerProps?: React.ComponentProps<typeof CardHeader>;
  titleProps?: React.ComponentProps<typeof CardTitle>;
  descriptionProps?: React.ComponentProps<typeof CardDescription>;
  contentProps?: React.ComponentProps<typeof CardContent>;
  footerProps?: React.ComponentProps<typeof CardFooter>;
  headerContent?: React.ReactNode;
}) => {
  return (
    <Card className={className} {...props}>
      {(title || description) && (
        <CardHeader {...headerProps}>
          {title && <CardTitle {...titleProps}>{title}</CardTitle>}
          {description && (
            <CardDescription {...descriptionProps}>
              {description}
            </CardDescription>
          )}
          {headerContent && headerContent}
        </CardHeader>
      )}
      <CardContent className={contentClassName} {...contentProps}>
        {content}
      </CardContent>
      {footer && <CardFooter {...footerProps}>{footer}</CardFooter>}
    </Card>
  );
};

export default CardCompact;
