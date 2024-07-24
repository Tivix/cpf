import { MySpace } from '@app/components/pages/mySpace/MySpace';
import { getLadderDetails } from '@app/api/ladder';

// TODO: get data from api
const data = {
  user: {
    firstName: 'Jane',
    lastName: 'Edge',
    position: 'Front End Developer, Junior',
  },
  currentLevel: {
    band: 2,
    score: 10,
  },
  nextLevel: {
    band: 3,
    threshold: 11,
  },
};

export default async function MySpacePage() {
  // TODO: get ladder details for current user
  const ladderDetails = await getLadderDetails('backend');

  return <MySpace data={{ ...data, ladder: ladderDetails }} />;
}

export const dynamic = 'force-dynamic';
