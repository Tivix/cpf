import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { ProfileSettings } from '@app/components/modules/ProfileSetting';

export default async function LibraryPage() {
  const data = {
    firstName: 'Jane',
    lastName: 'Doe',
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
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'People', href: '/people', current: false },
          { label: 'Profile setting', href: `/people/my-profile`, current: true },
        ]}
      />
      <ProfileSettings data={data} />
    </div>
  );
}
