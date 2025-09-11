'use client';

import { useAuth } from '@/hooks/useAuth';
import { LoadingPage } from '@/components/common/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function AuthGuard({
  children,
  requireAuth = true,
  redirectTo = '/login',
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
      } else if (!requireAuth && isAuthenticated) {
        router.push('/');
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingPage />;
  }

  // Don't render children if auth requirements aren't met
  if (requireAuth && !isAuthenticated) {
    return <LoadingPage />;
  }

  if (!requireAuth && isAuthenticated) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}

// Specific guards for common use cases
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAuth={true} redirectTo="/login">
      {children}
    </AuthGuard>
  );
}

export function PublicRoute({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAuth={false} redirectTo="/">
      {children}
    </AuthGuard>
  );
}
