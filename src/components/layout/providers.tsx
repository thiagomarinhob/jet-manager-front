'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app'
// import { SessionProvider, SessionProviderProps } from 'next-auth/react';
export default function Providers({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NuqsAdapter>
          {/* <SessionProvider> */}
          {children}
        </NuqsAdapter>
        {/* </SessionProvider> */}
      </ThemeProvider>
    </>
  );
}
