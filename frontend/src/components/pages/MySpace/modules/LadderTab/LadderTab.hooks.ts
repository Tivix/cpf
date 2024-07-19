import { useEffect } from 'react';
import { LadderBand } from '@app/types/library';
import { LadderTabHooks } from '@app/components/pages/MySpace/modules/LadderTab/LadderTab.interface';
import { useQueryParams } from '@app/hooks';
import { DEFAULT_STEP } from '@app/components/modules/SideStepper';

export const useLadderTab = (bands: Record<string, LadderBand>): LadderTabHooks => {
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
