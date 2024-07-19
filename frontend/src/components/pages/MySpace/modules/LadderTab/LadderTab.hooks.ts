import { useCallback, useEffect, useState } from 'react';
import { LadderBand } from '@app/types/library';
import { LadderTabHooks } from '@app/components/pages/MySpace/modules/LadderTab/LadderTab.interface';
import { useQueryParams } from '@app/hooks';
import { DEFAULT_STEP } from '@app/components/modules/SideStepper';
import { useSearchParams } from 'next/navigation';

export const useLadderTab = (bands: Record<string, LadderBand>): LadderTabHooks => {
  const [currentBand, setCurrentBand] = useState<number>(DEFAULT_STEP);
  const { setParams } = useQueryParams();
  const searchParams = useSearchParams();
  const bandParam = searchParams.get('band');

  const maximumLadders = bands ? Object.keys(bands).length : 0;
  const tabsProps = { activeLadder: currentBand, maximumLadders };

  const handleReplace = useCallback(() => {
    setParams({ band: currentBand.toString() });
  }, [currentBand, setParams]);

  useEffect(() => {
    handleReplace();
  }, [handleReplace]);

  useEffect(() => {
    if (!bandParam || isNaN(parseInt(bandParam))) {
      setCurrentBand(DEFAULT_STEP);
      return;
    }

    const numBandParam = parseInt(bandParam);

    if (numBandParam < 1 || numBandParam > maximumLadders) {
      setCurrentBand(DEFAULT_STEP);
    } else {
      setCurrentBand(numBandParam);
    }
  }, [maximumLadders, bandParam]);

  return {
    currentBand,
    handleLadderChange: setCurrentBand,
    tabsProps,
  };
};
