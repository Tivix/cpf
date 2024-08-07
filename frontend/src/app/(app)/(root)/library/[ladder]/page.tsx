import { LadderDetails } from '@app/components/pages/LadderDetails';
import { createClient } from '@app/utils/supabase/server';
import { mapKeysToCamelCase } from '@app/utils';
import { BandWithBuckets } from '@app/types/library';

export default async function LadderDetailed({ params }: { params: { ladder: string } }) {
  const ladderSlug = params.ladder;
  const supabase = createClient();
  const { data } = await supabase
    .from('band')
    .select(
      `
      band_id, 
      ladder_slug, 
      threshold, 
      salary_range, 
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
    .eq('ladder_slug', ladderSlug);

  const bands = mapKeysToCamelCase<BandWithBuckets[]>(data);

  return <LadderDetails ladderSlug={ladderSlug} bands={bands} />;
}

export const dynamic = 'force-dynamic';
