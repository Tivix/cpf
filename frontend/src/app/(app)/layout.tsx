import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sidebar } from '@app/components/modules/Sidebar';
import { Topbar } from '@app/components/modules/Topbar';

import 'react-tooltip/dist/react-tooltip.css';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CPF - Career Progression Framework',
  description: 'Career Progression Framework Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-navy-50 h-full`}>
        <div className="flex">
          <Sidebar />
          <div className="w-full pl-72">
            <Topbar />
            <main className="p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
