import { Sidebar } from '@app/components/modules/Sidebar';
import { Topbar } from '@app/components/modules/Topbar';
import { User } from '@app/types/user';
import { mapKeysToCamelCase } from '@app/utils';
import { createClient } from '@app/utils/supabase/server';
import { redirect } from 'next/navigation';

const getUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth');
  }
  const { data } = await supabase.from('profiles').select().eq('id', user.id).maybeSingle();
  return mapKeysToCamelCase<User>(data);
};

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const userData = await getUser();

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Topbar userData={userData} />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
