import { Sidebar } from '@app/components/modules/Sidebar';
import { Topbar } from '@app/components/modules/Topbar';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Topbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
