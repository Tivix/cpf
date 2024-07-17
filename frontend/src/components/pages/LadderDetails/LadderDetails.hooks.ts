import { useEffect, useMemo } from 'react';
import { LadderBand } from '@app/types/library';
import { LadderDetailsHook } from './LadderDetails.interface';
import { DEFAULT_STEP } from '../../modules/SideStepper';
import { useQueryParam, NumberParam, withDefault } from 'use-query-params';

export const useLadderDetails = (bands?: Record<string, LadderBand>): LadderDetailsHook => {
  const [currentBand, setCurrentBand] = useQueryParam('band', withDefault(NumberParam, DEFAULT_STEP));

  const maximumLadders = useMemo(() => (bands ? Object.keys(bands).length : 0), [bands]);
  const tabsProps = useMemo(() => ({ activeLadder: currentBand, maximumLadders }), [currentBand, maximumLadders]);

  useEffect(() => {
    if (currentBand < 1 || currentBand > maximumLadders) {
      setCurrentBand(DEFAULT_STEP);
    }
  }, [setCurrentBand, maximumLadders, currentBand]);

  return {
    currentBand,
    handleLadderChange: setCurrentBand,
    tabsProps,
  };
};
