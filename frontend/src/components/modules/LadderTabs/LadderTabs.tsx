import { Fragment, useMemo, useCallback, FC } from 'react';
import { VerticalLineIcon } from '@app/static/icons/VerticalLineIcon';
import { generateBandGrouping } from './utils';
import { LadderTabsProps, LadderInterface } from './LadderTabs.interface';
import { Typography } from '@app/components/common/Typography';
import { Step } from '@app/components/modules/LadderTabs/Step';

export const LadderTabs: FC<LadderTabsProps> = ({ maximumLadders, activeLadder, ladderOnClick, currentBand }) => {
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
              <Step
                key={ladder.toString()}
                ladder={ladder}
                lastInGroup={index !== ladders[positionName].length - 1}
                activeLadder={activeLadder}
                ladderOnClick={ladderOnClick}
                currentBand={currentBand}
              />
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
