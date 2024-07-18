import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import './globals.css';
import { AppProvider } from '@app/components/modules/AppProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CPF - Career Progression Framework',
  description: 'Career Progression Framework Application',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full bg-navy-50`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
