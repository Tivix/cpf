import { MySpace } from '@app/components/pages/MySpace';

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

export default function MySpacePage() {
  return <MySpace data={data} />;
}
