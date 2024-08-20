import { MySpaceBucketDetails } from '@app/components/pages/mySpace/MySpaceBucketDetails';
import { createClient } from '@app/utils/supabase/server';
import { mapKeysToCamelCase } from '@app/utils';
import { Bucket } from '@app/types/library';

export default async function MySpaceBucketDetailed({ params }: { params: { bucket: string } }) {
  const { bucket } = params;

  const supabase = createClient();
  const { data } = await supabase
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
    .eq('bucket_slug', bucket)
    .maybeSingle();

  const bucketData = mapKeysToCamelCase<Bucket>(data);

  return <MySpaceBucketDetails data={bucketData} />;
}
