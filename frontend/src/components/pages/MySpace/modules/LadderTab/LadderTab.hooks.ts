import { useEffect, useMemo } from 'react';
import { LadderBand } from '@app/types/library';
import { LadderTabHooks } from '@app/components/pages/MySpace/modules/LadderTab/LadderTab.interface';
import { useSearchParamsReplacer } from '../../../../../hooks';

const DEFAULT_BAND = '1';

export const useLadderTab = (bands: Record<string, LadderBand>): LadderTabHooks => {
  const { currentValue: currentBand, handleValueChange } = useSearchParamsReplacer('band', '1');

  const numericBand = parseInt(currentBand, 10);

  const maximumLadders = useMemo(() => (bands ? Object.keys(bands).length : 0), [bands]);
  const tabsProps = useMemo(() => ({ activeLadder: numericBand, maximumLadders }), [numericBand, maximumLadders]);

  useEffect(() => {
    if (numericBand < 1 || numericBand > maximumLadders) {
      handleValueChange(DEFAULT_BAND);
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
