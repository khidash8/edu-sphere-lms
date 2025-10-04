'use client';

import { LucideGithub, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { homePath, verifyOtpPath } from '@/features/constants/path-constants';
import { useGithubSignIn } from '@/features/auth/hooks/use-github-sign-in';
import React from 'react';
import { LoaderSpinner } from '@/components/loader-spinner';
import { useEmailSignIn } from '@/features/auth/hooks/use-email-sign-in';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginSchema,
  type LoginFormData,
} from '@/features/auth/schemas/login-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useGoogleSignIn } from '@/features/auth/hooks/use-google-sign-in';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
  });

  const email = form.watch('email');

  // Email Sign In
  const { isPending: emailSignInPending, handleEmailSignIn } = useEmailSignIn({
    email,
    onSuccess: () => console.log('Email sign-in successful'),
    onError: () => console.log('Email sign-in failed'),
    redirectPath: `${verifyOtpPath()}?email=${encodeURIComponent(email)}`,
  });

  // Git-hub Sign In
  const { isPending: githubSignInPending, handleGithubSignIn } =
    useGithubSignIn({
      redirectPath: homePath(),
      onSuccess: () => console.log('GitHub sign-in successful'),
      onError: () => console.log('GitHub sign-in failed'),
    });

  // Google Sign In
  const { isPending: googleSignInPending, handleGoogleSignIn } =
    useGoogleSignIn({
      redirectPath: homePath(),
      onSuccess: () => console.log('Google sign-in successful'),
      onError: () => console.log('Google sign-in failed'),
    });

  const onSubmit = (_data: LoginFormData) => {
    handleEmailSignIn();
  };

  return (
    <Card
      className={cn('w-full max-w-md animate-fade-in-from-top', className)}
      {...props}
    >
      <CardHeader className="text-center">
        <div className="flex flex-col items-start gap-2">
          <CardTitle className="text-xl font-semibold">Welcome Back!</CardTitle>
          <CardDescription className="text-muted-foreground">
            Login with your email address or Social account
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={emailSignInPending || !form.formState.isValid}
            >
              {emailSignInPending ? (
                <LoaderSpinner label={'Logging in...'} />
              ) : (
                <>
                  <Send className={'size-4'} />
                  Login
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="after:border-border relative my-6 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Button
            variant="outline"
            type="button"
            className="w-full cursor-pointer"
            onClick={handleGithubSignIn}
            disabled={githubSignInPending}
          >
            {githubSignInPending ? (
              <LoaderSpinner />
            ) : (
              <div className="flex items-center space-x-2">
                <LucideGithub className="size-4" />
                <span>GitHub</span>
              </div>
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={handleGoogleSignIn}
            disabled={googleSignInPending}
          >
            {googleSignInPending ? (
              <LoaderSpinner />
            ) : (
              <div className="flex items-center space-x-2">
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                <span>Google</span>
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
