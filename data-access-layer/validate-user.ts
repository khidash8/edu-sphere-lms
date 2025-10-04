/* eslint-disable @typescript-eslint/no-explicit-any */
import 'server-only';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { loginPath, notAdminPath } from '@/features/constants/path-constants';
import { redirect } from 'next/navigation';
import { cache } from 'react';

// Define your user roles
export type UserRole = 'admin' | 'user' | 'teacher' | 'financer' | 'student';

export interface RoleValidationOptions {
  allowedRoles?: UserRole[];
  requiredRole?: UserRole;
  redirectOnFail?: string;
  returnSession?: boolean;
}

export interface RoleValidationResult {
  isAuthorized: boolean;
  userRole: UserRole | null;
  session: any | null;
}

export const validateUserRole = cache(
  async (
    options: RoleValidationOptions = {}
  ): Promise<RoleValidationResult | any> => {
    const {
      allowedRoles,
      requiredRole,
      redirectOnFail,
      returnSession = true,
    } = options;

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Check if user is logged in
    if (!session) {
      redirect(loginPath());
    }

    const userRole = session.user.role as UserRole;

    // If specific role is required
    if (requiredRole) {
      if (userRole !== requiredRole) {
        redirect(redirectOnFail || notAdminPath());
      }
    }

    // If multiple roles are allowed
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(userRole)) {
        redirect(redirectOnFail || notAdminPath());
      }
    }

    // If neither requiredRole nor allowedRoles specified, just check if user is logged in
    if (!requiredRole && (!allowedRoles || allowedRoles.length === 0)) {
      console.warn('validateUserRole called without role restrictions');
    }

    return returnSession
      ? session
      : {
          isAuthorized: true,
          userRole,
          session,
        };
  }
);

export const checkUserRole = cache(
  async (
    options: RoleValidationOptions = {}
  ): Promise<RoleValidationResult> => {
    const { allowedRoles, requiredRole } = options;

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        isAuthorized: false,
        userRole: null,
        session: null,
      };
    }

    const userRole = session.user.role as UserRole;
    let isAuthorized = true;

    // Check specific role requirement
    if (requiredRole && userRole !== requiredRole) {
      isAuthorized = false;
    }

    // Check allowed roles
    if (
      allowedRoles &&
      allowedRoles.length > 0 &&
      !allowedRoles.includes(userRole)
    ) {
      isAuthorized = false;
    }

    return {
      isAuthorized,
      userRole,
      session,
    };
  }
);

export const getAuthenticatedSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(loginPath());
  }

  return session;
});
