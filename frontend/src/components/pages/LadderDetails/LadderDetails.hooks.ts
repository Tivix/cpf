import { useEffect, useMemo } from 'react';
import { LadderBand } from '@app/types/library';
import { LadderDetailsHook } from './LadderDetails.interface';
import { DEFAULT_STEP } from '../../modules/SideStepper';
import { useQueryParams } from '@app/hooks';

export const useLadderDetails = (bands?: Record<string, LadderBand>): LadderDetailsHook => {
  const [params, setParams] = useQueryParams({ band: DEFAULT_STEP.toString() });

  const band = useMemo(() => (params.band ? parseInt(params.band) : DEFAULT_STEP), [params]);
  const maximumLadders = useMemo(() => (bands ? Object.keys(bands).length : 0), [bands]);
  const tabsProps = useMemo(() => ({ activeLadder: band, maximumLadders }), [band, maximumLadders]);

  useEffect(() => {
    if (!band || band < 1 || band > maximumLadders) {
      setParams({ band: DEFAULT_STEP.toString() });
    }
  }, [setParams, maximumLadders, band]);

  return {
    currentBand: band,
    handleLadderChange: (newBand: number) => setParams({ band: newBand.toString() }),
    tabsProps,
  };
};
