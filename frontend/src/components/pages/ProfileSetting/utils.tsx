import { ReactNode } from 'react';
import { Typography } from '@app/components/common/Typography';
import { Checkbox } from '@app/components/common/Checkbox';

export const NotificationCheckbox: React.FC<{ icon: ReactNode; name: string }> = ({ icon, name }) => (
  <div className="flex flex-col items-center justify-between">
    <div className="mb-6 text-navy-500">{icon}</div>
    <div className="flex h-6 items-center">
      <Checkbox name={name} />
    </div>
  </div>
);

export const PersonalDetailsDataItem: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
  <div className="border-b border-navy-200 px-4 py-6 sm:col-span-2 sm:px-0">
    <dt>
      <Typography variant="body-m/medium">{title}</Typography>
    </dt>
    <dd>
      <Typography variant="body-m/regular" className="mt-1 text-navy-600 sm:mt-2">
        {value}
      </Typography>
    </dd>
  </div>
);

export const LadderDataItem: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
  <div>
    <dt>
      <Typography variant="body-m/medium">{title}</Typography>
    </dt>
    <dd>
      <Typography variant="body-m/regular" className="mt-1 text-navy-600 sm:mt-2">
        {value}
      </Typography>
    </dd>
  </div>
);
