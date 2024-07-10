import { ProfileSettings } from '@app/components/pages/ProfileSetting';

// TODO: get data from api
const data = {
  firstName: 'Jane',
  lastName: 'Edge',
  email: 'example@gmail.com',
  ladders: [
    {
      ladderName: 'Front end',
      technology: 'React',
      band: 2,
    },
  ],
  notifications: {
    slack: false,
    email: false,
  },
};

export default async function LibraryPage() {
  return <ProfileSettings data={data} />;
}
