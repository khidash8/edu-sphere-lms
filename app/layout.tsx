import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import React from 'react';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EduSphere | comprehensive learning management system ',
  description:
    'Unlock your potential with our comprehensive learning management system. Access courses, track progress, and achieve your goals.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute={'class'}
          defaultTheme={'system'}
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
          <Toaster expand closeButton position={'bottom-center'} />
        </ThemeProvider>
      </body>
    </html>
  );
}
