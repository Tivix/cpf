import { Fragment, useMemo, useCallback } from 'react';
import { VerticalLineIcon } from '@app/static/icons/VerticalLineIcon';
import { generateBandGrouping } from './utils';
import { LadderTabsProps, LadderInterface } from './LadderTabs.interface';
import { generateClassNames } from '@app/utils';
import { Button } from '@app/components/common/Button';

export const LadderTabs: React.FC<LadderTabsProps> = ({ maximumLadders, activeLadder, ladderOnClick }) => {
  const generateLadders = useCallback((maxLadders: number): LadderInterface => generateBandGrouping(maxLadders), []);

  const ladders: LadderInterface = useMemo(() => generateLadders(maximumLadders), [generateLadders, maximumLadders]);

  return (
    <div className="flex w-[88px] flex-col">
      {Object.keys(ladders).map((positionName: string, index: number) => (
        <Fragment key={positionName}>
          <div className="rounded-2xl bg-white px-2 py-3">
            <h3 className="mb-2 text-center text-xs uppercase tracking-wide text-navy-600">{positionName}</h3>
            {ladders[positionName].map((ladder: number, index: number) => (
              <Fragment key={ladder.toString()}>
                <Button
                  onClick={() => ladderOnClick && ladderOnClick(ladder)}
                  className={generateClassNames('w-full', {
                    'pointer-events-none border-blue-800 bg-blue-800 text-white': ladder === activeLadder,
                  })}
                  styleType="natural"
                  variant="border"
                >
                  {ladder}
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
