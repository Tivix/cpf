import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { ProfileSettings } from '@app/components/modules/ProfileSetting';
import { routes } from "@app/constants";

export default async function LibraryPage() {
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
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'People', href: routes.people.index, current: false },
          { label: 'Profile setting', href: routes.people.myProfile, current: true },
        ]}
      />
      <ProfileSettings data={data} />
    </div>
  );
}
