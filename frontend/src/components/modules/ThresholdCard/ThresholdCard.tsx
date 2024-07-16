import { Typography } from '@app/components/common/Typography';
import { InfoIcon } from '@app/static/icons/InfoIcon';
import { Tooltip } from '@app/components/common/Tooltip';
import { ThresholdCardProps } from './ThresholdCard.interface';

export const ThresholdCard = ({ threshold }: ThresholdCardProps) => {
  return (
    <div className="flex flex-col items-center rounded-xl border border-navy-200 p-4">
      <div className="flex justify-between gap-2">
        <Typography variant="body-m/medium" className="text-navy-600">
          Threshold
        </Typography>
        <Tooltip tooltipText="Min. points needed to complete band">
          <InfoIcon className="text-navy-600" />
        </Tooltip>
      </div>
      <Typography variant="head-m/bold">{threshold}</Typography>
    </div>
  );
};
