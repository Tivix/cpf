import { FC, PropsWithChildren } from 'react';
import { StatusChipProps, Variants } from '@app/components/common/StatusChip/StatusChip.interface';
import { Typography } from '@app/components/common/Typography';
import { generateClassNames } from '@app/utils';

const styles: {
  [key in Variants]: {
    text: string;
    wrapper: string;
  };
} = {
  grey: {
    text: 'text-navy-600',
    wrapper: 'bg-navy-100',
  },
  yellow: {
    text: 'text-yellow-600',
    wrapper: 'bg-yellow-200',
  },
  red: {
    text: 'text-red-700',
    wrapper: 'bg-red-100',
  },
  green: {
    text: 'text-green-600',
    wrapper: 'bg-green-200',
  },
};

export const StatusChip: FC<PropsWithChildren<StatusChipProps>> = ({ variant = 'grey', children }) => {
  return (
    <div className={generateClassNames('flex h-6 items-center rounded-md px-2 py-1', styles[variant].wrapper)}>
      <Typography variant="hint/caps-medium" className={styles[variant].text}>
        {children}
      </Typography>
    </div>
  );
};
