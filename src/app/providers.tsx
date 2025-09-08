'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/lib/apollo';
import { Toaster } from '@/components/ui/sonner';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
      <Toaster />
    </ApolloProvider>
  );
}
