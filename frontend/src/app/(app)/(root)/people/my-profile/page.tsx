import { ProfileSettings } from '@app/components/pages/ProfileSetting';
import { createClient } from '@app/utils/supabase/server';
import { mapKeysToCamelCase } from '@app/utils';
import { User, UserLadder } from '@app/types/people';
import { redirect } from 'next/navigation';

export default async function LibraryPage() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/auth');
  }
  const { data } = await supabase.from('profiles').select().eq('id', user.id).maybeSingle();

  const userData = mapKeysToCamelCase<User>(data);

  const { data: ladders } = await supabase
    .from('user_ladder')
    .select(
      `
    ladder(
      ladder_name,
      ladder_slug
    ),
    band(
      band_number
    ),
    technology
  `,
    )
    .eq('user_id', user.id);

  const laddersData = mapKeysToCamelCase<UserLadder[]>(ladders);

  return (
    <ProfileSettings
      data={{
        ...userData,
        ladders: laddersData,
      }}
    />
  );
}
