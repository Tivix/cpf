import { createClient } from '@app/utils/supabase/server';
import { redirect } from 'next/navigation';
import { routes } from '@app/constants';
export const useTopbar = () => {
  const handleSignOut = async () => {
    'use server';
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) redirect(routes.auth.index);
  };

  return { handleSignOut };
};
