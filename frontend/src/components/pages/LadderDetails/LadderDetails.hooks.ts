import { useEffect, useMemo } from 'react';
import { LadderBand } from '@app/types/library';
import { LadderDetailsHook } from './LadderDetails.interface';
import { DEFAULT_STEP } from '../../modules/SideStepper';
import { useSearchParamsReplacer } from '../../../hooks';

export const useLadderDetails = (bands?: Record<string, LadderBand>): LadderDetailsHook => {
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
