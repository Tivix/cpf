import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LadderBand } from '@app/types/library';
import { LadderDetailsHook } from './LadderDetails.interface';

export const useLadderDetails = (bands?: Record<string, LadderBand>): LadderDetailsHook => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const band = searchParams.get('band');

  const [currentBand, setCurrentBand] = useState(typeof band === 'string' ? parseInt(band, 10) : 1);
  const maximumLadders = useMemo(() => bands ? Object.keys(bands).length : 0, [bands]);
  const tabsProps = useMemo(() => ({ activeLadder: currentBand, maximumLadders }), [currentBand, maximumLadders]);

  const handleReplace = useCallback(() => {
    if (!currentBand || currentBand > maximumLadders || currentBand < 1) {
      router.replace(`${pathname}?band=1`);
    } else {
      router.replace(`${pathname}?band=${currentBand}`);
    }
  }, [currentBand, maximumLadders, pathname, router]);

  const handleLadderChange = useCallback((ladder: number) => {
    setCurrentBand(ladder);
  }, []);

  useEffect(() => {
    handleReplace();
  }, [handleReplace]);

  return {
    currentBand,
    handleLadderChange,
    tabsProps,
  };
};
