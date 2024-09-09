'use client';
import { Typography } from '@app/components/common/Typography';
import { NotificationCheckbox } from '../../utils';
import { SlackIcon } from '@app/static/icons/SlackIcon';
import { EnvelopeIcon } from '@app/static/icons/EnvelopeIcon';
import { Card } from '@app/components/common/Card';
import { FormProvider } from '@app/components/common/FormProvider';
import { useNotifications } from './Notifications.hook';

export const Notifications: React.FC = () => {
  const { form } = useNotifications();

  return (
    <Card title="Notifications">
      <div className="flex flex-row">
        <div className="grow self-end">
          <Typography variant="body-m/medium">Send me notifications via</Typography>
        </div>
        <FormProvider form={form}>
          <div className="flex flex-row gap-8">
            <NotificationCheckbox icon={<SlackIcon />} name="slack" />
            <NotificationCheckbox icon={<EnvelopeIcon />} name="mail" />
          </div>
        </FormProvider>
      </div>
    </Card>
  );
};
