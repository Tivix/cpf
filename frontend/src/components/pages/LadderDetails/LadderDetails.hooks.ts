import { useEffect } from 'react';
import { LadderBand } from '@app/types/library';
import { LadderDetailsHook } from './LadderDetails.interface';
import { DEFAULT_STEP } from '../../modules/SideStepper';
import { useQueryParams } from '@app/hooks';

export const useLadderDetails = (bands?: Record<string, LadderBand>): LadderDetailsHook => {
  const [params, setParams] = useQueryParams({ band: DEFAULT_STEP.toString() });

  const band = params.band ? parseInt(params.band) : DEFAULT_STEP;
  const maximumLadders = bands ? Object.keys(bands).length : 0;
  const tabsProps = { activeLadder: band, maximumLadders };

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
