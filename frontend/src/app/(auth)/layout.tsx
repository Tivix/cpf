import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import 'react-tooltip/dist/react-tooltip.css';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CPF - Career Progression Framework',
  description: 'Career Progression Framework Application',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-navy-50`}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">{children}</main>
      </body>
    </html>
  );
}
