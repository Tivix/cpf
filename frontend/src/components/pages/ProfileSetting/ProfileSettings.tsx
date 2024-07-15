import { ProfileSettingsProps } from './ProfileSetting.interface';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { routes } from '@app/constants';
import { Notifications } from './modules/Notifications';
import { Ladders } from './modules/Ladders';
import { PersonalDetails } from './modules/PersonalDetails';

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ data }) => {
  const { ladders } = data;

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'People', href: routes.people.index, current: false },
          { label: 'Profile settings', href: routes.people.myProfile, current: true },
        ]}
      />
      <section className="flex w-full flex-col items-center gap-6 py-16">
        <PersonalDetails data={data} />
        <Ladders ladders={ladders} />
        <Notifications />
      </section>
    </div>
  );
};
