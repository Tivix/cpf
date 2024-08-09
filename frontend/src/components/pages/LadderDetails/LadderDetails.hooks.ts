import { useCallback, useEffect, useState } from 'react';
import { BandWithBuckets } from '@app/types/library';
import { LadderDetailsHook } from './LadderDetails.interface';
import { DEFAULT_STEP } from '../../modules/SideStepper';
import { useQueryParams } from '@app/hooks';
import { useSearchParams } from 'next/navigation';

export const useLadderDetails = (bands?: BandWithBuckets[]): LadderDetailsHook => {
  const [currentBand, setCurrentBand] = useState<number>(DEFAULT_STEP);
  const { setParams } = useQueryParams();
  const searchParams = useSearchParams();
  const bandParam = searchParams.get('band');

  const maximumLadders = bands ? bands.length : 0;
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
