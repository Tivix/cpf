import { Fragment, useMemo, useCallback } from 'react';
import { VerticalLineIcon } from '@app/static/icons/VerticalLineIcon';
import { generateBandGrouping } from './utils';
import { LadderTabsProps, LadderInterface } from './LadderTabs.interface';
import { generateClassNames } from '@app/utils';
import { Button } from '@app/components/common/Button';
import { Typography } from '@app/components/common/Typography';
import { TargetIcon } from '@app/static/icons/TargetIcon';
import { CheckIcon } from '@app/static/icons/CheckIcon';
import { LockIcon } from '@app/static/icons/LockIcon';

export const LadderTabs: React.FC<LadderTabsProps> = ({ maximumLadders, activeLadder, ladderOnClick, currentBand }) => {
  const generateLadders = useCallback((maxLadders: number): LadderInterface => generateBandGrouping(maxLadders), []);

  const ladders: LadderInterface = useMemo(() => generateLadders(maximumLadders), [generateLadders, maximumLadders]);

  return (
    <div className="flex w-[88px] flex-col">
      {Object.keys(ladders).map((positionName: string, index: number) => (
        <Fragment key={positionName}>
          <div className="rounded-2xl bg-white px-2 py-3">
            <Typography as="h3" variant="hint/caps-medium" className="mb-2 text-center text-navy-600">
              {positionName}
            </Typography>
            {ladders[positionName].map((ladder: number, index: number) => (
              <Fragment key={ladder.toString()}>
                <Button
                  onClick={() => ladderOnClick && ladderOnClick(ladder)}
                  className={generateClassNames('flex w-full gap-1', {
                    'border-transparent bg-blue-100 text-blue-900 hover:border-navy-300':
                      currentBand && currentBand >= ladder,
                    'pointer-events-none border-blue-800 bg-blue-800 text-white': ladder === activeLadder,
                  })}
                  styleType="natural"
                  variant="border"
                >
                  {ladder}
                  {ladder <= currentBand && <CheckIcon />}
                  {ladder === currentBand + 1 && <TargetIcon />}
                  {ladder > currentBand + 1 && <LockIcon />}
                </Button>
                {index !== ladders[positionName].length - 1 && (
                  <VerticalLineIcon className="h-6 w-full text-navy-300" />
                )}
              </Fragment>
            ))}
          </div>
          {index !== Object.keys(ladders).length - 1 && (
            <VerticalLineIcon className="h-6 w-full text-center text-navy-300" />
          )}
        </Fragment>
      ))}
    </div>
  );
};
