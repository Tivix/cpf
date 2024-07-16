import { useEffect, useMemo } from 'react';
import { LadderBand } from '@app/types/library';
import { LadderTabHooks } from '@app/components/pages/MySpace/modules/LadderTab/LadderTab.interface';
import { useSearchParamsReplacer } from '../../../../../hooks';
import { DEFAULT_STEP } from '@app/components/modules/SideStepper';

export const useLadderTab = (bands: Record<string, LadderBand>): LadderTabHooks => {
  const { currentValue: currentBand, handleValueChange } = useSearchParamsReplacer('band', DEFAULT_STEP);

  const numericBand = parseInt(currentBand, 10);

  const maximumLadders = useMemo(() => (bands ? Object.keys(bands).length : 0), [bands]);
  const tabsProps = useMemo(() => ({ activeLadder: numericBand, maximumLadders }), [numericBand, maximumLadders]);

  useEffect(() => {
    if (numericBand < 1 || numericBand > maximumLadders) {
      handleValueChange(DEFAULT_STEP);
    }
  }, [handleValueChange, maximumLadders, numericBand]);

  const handleLadderChange = (ladder: number) => {
    handleValueChange(ladder.toString());
  };

  return {
    currentBand: numericBand,
    handleLadderChange,
    tabsProps,
  };
};
