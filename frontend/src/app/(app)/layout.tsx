import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import { Sidebar } from '@app/components/modules/Sidebar';
import { Topbar } from '@app/components/modules/Topbar';

import '../globals.css';
import LoginButton from "@app/components/common/LoginButton";
import {authOptions} from "@app/app/api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CPF - Career Progression Framework',
  description: 'Career Progression Framework Application',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-navy-50`}>
        <div className="grid grid-cols-12 overflow-y-auto">
          <Sidebar />
          <div className="col-span-10">
            <Topbar />
            <LoginButton session={session} />
            {session ? (
                <main className="flex min-h-screen flex-col items-center justify-between p-24">{children}</main>
            ): "you must log in"}
          </div>
        </div>
      </body>
    </html>
  );
}
