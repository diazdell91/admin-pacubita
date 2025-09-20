'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client/react';
import { useAppStore } from '@/stores/useAppStore';
import { apolloClient } from '@/lib/apollo';
import { graphql } from '@/generated';
import { toast } from 'sonner';
// TODO: Import proper types from generated GraphQL
// import type {
//   SignInInput,
//   UserFragmentFragment,
//   SignInMutation,
//   SignOutMutation,
//   RefreshTokensMutation,
//   CurrentUserQuery,
// } from '@/generated/graphql';

interface SignInInput {
  email?: string | null;
  phone?: string | null;
  password: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const router = useRouter();
  const { user, setUser } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Initialize auth state on mount
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!token || !refreshToken) {
        setIsLoading(false);
        return;
      }

      // TODO: Implement currentUser query with Apollo Client
      // For now, set a basic user object if tokens exist to enable authentication
      if (token && refreshToken) {
        // Temporary user object - should be replaced with real user query
        const tempUser: User = {
          id: 'temp',
          firstName: 'Staff',
          lastName: 'Admin',
          email: 'staff@pacubita.com',
          phone: '+53 5555 5555',
          createdAt: new Date().toISOString(),
        };
        setUser(tempUser);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const [signInMutation] = useMutation(
    graphql(`
      mutation SignIn($input: SignInInput!) {
        signIn(input: $input) {
          tokens {
            accessToken
            refreshToken
          }
        }
      }
    `)
  );

  const signIn = useCallback(
    async (input: SignInInput): Promise<boolean> => {
      setIsLoading(true);

      try {
        if (!input.email && !input.phone) {
          throw new Error('Email o teléfono requerido');
        }

        if (!input.password) {
          throw new Error('Contraseña requerida');
        }

        // Use real GraphQL mutation with generated types
        const { data } = await signInMutation({
          variables: {
            input: {
              email: input.email || null,
              phone: input.phone || null,
              password: input.password,
            },
          },
        });

        if (!data?.signIn?.tokens) {
          throw new Error('Error en la respuesta del servidor');
        }

        const { accessToken, refreshToken } = data.signIn.tokens;

        // Store tokens
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // TODO: Get user data from server response
        // Mock user for now
        const user: User = {
          id: '1',
          firstName: 'Staff',
          lastName: 'Admin',
          email: input.email || 'staff@pacubita.com',
          phone: input.phone || '+53 5555 5555',
          createdAt: new Date().toISOString(),
        };

        setUser(user);

        toast.success('Sesión iniciada correctamente');
        return true;
      } catch (error) {
        console.error('SignIn error:', error);
        const message =
          error instanceof Error ? error.message : 'Error al iniciar sesión';
        toast.error(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, signInMutation]
  );

  const [signOutMutation] = useMutation(
    graphql(`
      mutation SignOut($input: SignOutInput!) {
        signOut(input: $input) {
          _
        }
      }
    `)
  );

  const signOut = useCallback(async () => {
    setIsLoading(true);

    try {
      // Try to call the server signOut mutation
      try {
        await signOutMutation({
          variables: { input: {} },
        });
      } catch (error) {
        // Even if server signOut fails, we still want to clear local state
        console.warn('Server signOut failed:', error);
      }

      // Clear tokens and user state
      clearTokens();
      setUser(null);

      // Reset Apollo Client cache
      await apolloClient.resetStore();

      toast.success('Sesión cerrada correctamente');
      router.push('/login');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    } finally {
      setIsLoading(false);
    }
  }, [setUser, router, signOutMutation]);

  const [refreshTokensMutation] = useMutation(
    graphql(`
      mutation RefreshTokens($input: RefreshTokensInput!) {
        refreshTokens(input: $input) {
          tokens {
            accessToken
            refreshToken
          }
        }
      }
    `)
  );

  const refreshTokens = useCallback(async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const { data } = await refreshTokensMutation({
        variables: {
          input: { refreshToken },
        },
      });

      if (data?.refreshTokens?.tokens) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data.refreshTokens.tokens;
        localStorage.setItem('token', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        return true;
      }

      throw new Error('Failed to refresh tokens');
    } catch (error) {
      console.error('Token refresh failed:', error);
      signOut();
      return false;
    }
  }, [signOut, refreshTokensMutation]);

  const clearTokens = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    signIn,
    signOut,
    refreshTokens,
    checkAuthState,
  };
}

// Custom hook for protected routes
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, isLoading };
}
