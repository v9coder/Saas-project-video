'use client';

import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { ImageKitProvider } from '@imagekit/next';

const urlEndPoint = process.env.NEXT_PUBLIC_BASE_URL!;

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={3000}>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <ImageKitProvider urlEndpoint="urlEndPoint">
        {children}
        </ImageKitProvider>
    </SessionProvider>
  );
}
