'use client';
import { Sidebar } from '@app/components/modules/Sidebar';
import { Topbar } from '@app/components/modules/Topbar';
import NextAdapterApp from 'next-query-params/app';
import { QueryParamProvider } from 'use-query-params';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryParamProvider adapter={NextAdapterApp}>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Topbar />
          <main className="p-8">{children}</main>
        </div>
      </div>
    </QueryParamProvider>
  );
}
