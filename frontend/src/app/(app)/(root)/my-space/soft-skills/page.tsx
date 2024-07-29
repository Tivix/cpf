import { MySpaceSoftSkillBucketDetails } from '@app/components/pages/mySpace/MySpaceSoftSkillBucketDetails';
import { ProofStatus, SoftSkillBucket } from '@app/types/library';

// TODO: get data from api
const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet, felis et tincidunt tempor, justo orci cursus ipsum, nec efficitur neque felis sit amet orci.';

const data: SoftSkillBucket = {
  bucketSlug: 'soft-skills',
  bucketName: 'Soft skills',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet, felis et tincidunt tempor, justo orci cursus ipsum, nec efficitur neque felis sit amet orci. Vivamus tempus, ex et ultrices rutrum, libero mi molestie mi, non tempus ex metus sed augue. Morbi euismod, nulla nec tempus consequat, quam mi pellentesque elit, non sagittis est nisl sed arcu.',
  status: 'completed',
  categories: {
    Responsibility: [
      {
        name: 'Fulfills undertaken obligations regarding tasks',
        description: loremIpsum,
        proofStatus: ProofStatus.APPROVED as unknown as typeof ProofStatus,
      },
      {
        name: 'He is responsive and communicates responsibly - without unnecessary delay.',
        description: loremIpsum,
        proofStatus: ProofStatus.APPROVED as unknown as typeof ProofStatus,
      },
    ],
    Quality: [
      {
        name: 'Fulfills undertaken obligations regarding tasks',
        description: loremIpsum,
        proofStatus: ProofStatus.APPROVED as unknown as typeof ProofStatus,
      },
    ],
  },
};

export default async function MySpaceBucketDetailed() {
  return <MySpaceSoftSkillBucketDetails data={data} />;
}
