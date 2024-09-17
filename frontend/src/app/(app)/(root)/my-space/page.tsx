import { MySpace } from '@app/components/pages/mySpace/MySpace';
import { createClient } from '@app/utils/supabase/server';
import { redirect } from 'next/navigation';
import { mapKeysToCamelCase } from '@app/utils';
import { User, UserLadder } from '@app/types/user';
import { BandWithBuckets } from '@app/types/library';

export default async function MySpacePage() {
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
    technologies,
    is_main_ladder
  `,
    )
    .eq('user_id', user.id);

  const laddersData = mapKeysToCamelCase<UserLadder[]>(ladders);

  if (!laddersData) {
    return <div>No ladders assigned to a user</div>;
  }
  const mainLadder = laddersData?.length > 1 ? laddersData.find((ladder) => ladder.isMainLadder) : laddersData[0];

  const { data: bands } = await supabase
    .from('band')
    .select(
      `
      band_id, 
      ladder_slug, 
      threshold, 
      salary_range, 
      band_number,
      buckets:bucket(
        bucket_slug, 
        bucket_name, 
        description, 
        bucket_type,
        advancement_levels:advancement_level(
          skills:atomic_skill(
            skill_id,
            name,
            description
          )
        )
      ), 
      ladder:ladder_slug(
        ladder_name
      )
    `,
    )
    .eq('ladder_slug', mainLadder?.ladder?.ladderSlug);

  const bandsData = mapKeysToCamelCase<BandWithBuckets[]>(bands);
  const nextBand = mainLadder
    ? bandsData.find(
        (band) =>
          band.ladderSlug === mainLadder?.ladder?.ladderSlug && band?.bandNumber === mainLadder?.band?.bandNumber + 1,
      )
    : undefined;

  return (
    <MySpace user={userData} ladder={mainLadder ? { userLadder: mainLadder, bands: bandsData, nextBand } : undefined} />
  );
}

export const dynamic = 'force-dynamic';
