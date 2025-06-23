'use client';

import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { ImageKitProvider } from '@imagekit/next';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <ImageKitProvider urlEndpoint="urlEndPoint">
        {children}
        </ImageKitProvider>
    </SessionProvider>
  );
}
