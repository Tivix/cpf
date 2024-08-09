import { BucketDetails } from '@app/components/pages/BucketDetails';
import { createClient } from '@app/utils/supabase/server';
import { mapKeysToCamelCase } from '@app/utils';
import { Bucket } from '@app/types/library';

export default async function BucketDetailed({ params }: { params: { bucket: string; ladder: string } }) {
  const { bucket: bucketSlug, ladder: ladderSlug } = params;
  const supabase = createClient();
  const { data: bucket } = await supabase
    .from('bucket')
    .select(
      `
        bucket_slug, 
        bucket_name, 
        description, 
        bucket_type,
        advancement_levels:advancement_level(
          level_id,
          bucket_slug,
          advancement_level,
          description,
           skills:atomic_skill(
            skill_id,
            level_id,
            name,
            category
          ),
        projects:example_project(
            project_id,
            level_id,
            title,
            overview
          )
        )
    `,
    )
    .eq('bucket_slug', bucketSlug)
    .maybeSingle();

  const { data: ladder } = await supabase
    .from('ladder')
    .select('ladder_name')
    .eq('ladder_slug', ladderSlug)
    .maybeSingle();

  const bucketData = mapKeysToCamelCase<Bucket>(bucket);
  const ladderName = ladder?.ladder_name;

  return <BucketDetails data={bucketData} ladderName={ladderName} ladderSlug={ladderSlug} bucketSlug={bucketSlug} />;
}

export const dynamic = 'force-dynamic';
