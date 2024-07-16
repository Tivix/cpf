import { Typography } from '@app/components/common/Typography';
import { NotificationCheckbox } from '../../utils';
import { SlackIcon } from '@app/static/icons/SlackIcon';
import { EnvelopeIcon } from '@app/static/icons/EnvelopeIcon';
import { Card } from '@app/components/common/Card';

export const Notifications: React.FC = () => {
  return (
    <Card title="Notifications">
      <div className="flex flex-row">
        <div className="grow self-end">
          <Typography variant="body-m/medium">Send me notifications via</Typography>
        </div>
        <div className="flex flex-row gap-8">
          <NotificationCheckbox icon={<SlackIcon />} />
          <NotificationCheckbox icon={<EnvelopeIcon />} />
        </div>
      </div>
    </Card>
  );
};
