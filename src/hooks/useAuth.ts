'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/stores/useAppStore';
import { apolloClient } from '@/lib/apollo';
import { toast } from 'sonner';

// Types based on GraphQL schema
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface SignInInput {
  email?: string;
  phone?: string;
  password: string;
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
      // For now, we'll use mock data if token exists
      const mockUser: User = {
        id: '1',
        firstName: 'Juan',
        lastName: 'Díaz',
        email: 'juan@cubita.com',
        phone: '+53 5555 5555',
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error('Auth check failed:', error);
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const signIn = useCallback(async (input: SignInInput): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // TODO: Implement SignIn mutation with Apollo Client
      // For now, we'll use mock authentication
      
      if (!input.email && !input.phone) {
        throw new Error('Email o teléfono requerido');
      }
      
      if (!input.password) {
        throw new Error('Contraseña requerida');
      }

      // Mock authentication logic
      if (input.password.length < 6) {
        throw new Error('Credenciales inválidas');
      }

      // Mock tokens and user data
      const mockTokens: Tokens = {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
      };

      const mockUser: User = {
        id: '1',
        firstName: 'Juan',
        lastName: 'Díaz',
        email: input.email || 'juan@cubita.com',
        phone: input.phone || '+53 5555 5555',
        createdAt: new Date().toISOString(),
      };

      // Store tokens
      localStorage.setItem('token', mockTokens.accessToken);
      localStorage.setItem('refreshToken', mockTokens.refreshToken);
      
      // Update user state
      setUser(mockUser);
      
      toast.success('Sesión iniciada correctamente');
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al iniciar sesión';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // TODO: Implement SignOut mutation with Apollo Client
      
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
  }, [setUser, router]);

  const refreshTokens = useCallback(async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // TODO: Implement RefreshTokens mutation with Apollo Client
      // For now, we'll return true to simulate success
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      signOut();
      return false;
    }
  }, [signOut]);

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