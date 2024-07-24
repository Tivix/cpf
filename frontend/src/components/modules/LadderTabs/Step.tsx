import { FC, Fragment } from 'react';
import { Tooltip } from '@app/components/common/Tooltip';
import { VerticalLineIcon } from '@app/static/icons/VerticalLineIcon';
import { TabButton } from './TabButton';
import { StepProps } from './LadderTabs.interface';

export const Step: FC<StepProps> = ({ ladder, lastInGroup, currentBand, activeLadder, ladderOnClick }) => {
  const locked = currentBand !== undefined && ladder > currentBand + 1;

  return (
    <Fragment>
      {locked ? (
        <Tooltip tooltipText="For more details, go to the CPF library.">
          <TabButton
            ladder={ladder}
            disabled
            currentBand={currentBand}
            activeLadder={activeLadder}
            ladderOnClick={ladderOnClick}
          />
        </Tooltip>
      ) : (
        <TabButton
          ladder={ladder}
          currentBand={currentBand}
          activeLadder={activeLadder}
          ladderOnClick={ladderOnClick}
        />
      )}
      {lastInGroup && <VerticalLineIcon className="h-6 w-full text-navy-300" />}
    </Fragment>
  );
};
