import { FC } from 'react';
import { Button } from '@app/components/common/Button';
import { generateClassNames } from '@app/utils';
import { CheckIcon } from '@app/static/icons/CheckIcon';
import { TargetIcon } from '@app/static/icons/TargetIcon';
import { LockIcon } from '@app/static/icons/LockIcon';
import { TabButtonProps } from './LadderTabs.interface';

export const TabButton: FC<TabButtonProps> = ({ ladder, disabled, currentBand, activeLadder, ladderOnClick }) => (
  <Button
    onClick={() => ladderOnClick && ladderOnClick(ladder)}
    className={generateClassNames('flex w-full gap-1', {
      'border-transparent bg-blue-100 text-blue-900 hover:border-navy-300':
        currentBand !== undefined && currentBand >= ladder,
      'pointer-events-none border-blue-800 bg-blue-800 text-white': ladder === activeLadder,
    })}
    styleType="natural"
    variant="border"
    disabled={disabled}
  >
    {ladder}
    {currentBand && (
      <>
        {ladder <= currentBand && <CheckIcon />}
        {ladder === currentBand + 1 && <TargetIcon />}
        {ladder > currentBand + 1 && <LockIcon />}
      </>
    )}
  </Button>
);
