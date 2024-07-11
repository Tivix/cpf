import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LadderBand } from '@app/types/library';
import { LadderTabHooks } from '@app/components/pages/MySpace/modules/LadderTab/LadderTab.interface';

export const useLadderTab = (bands: Record<string, LadderBand>): LadderTabHooks => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log(searchParams.keys());
  const band = searchParams.get('band');

  const [currentBand, setCurrentBand] = useState(typeof band === 'string' ? parseInt(band, 10) : 1);
  const maximumLadders = useMemo(() => (bands ? Object.keys(bands).length : 0), [bands]);
  const tabsProps = useMemo(() => ({ activeLadder: currentBand, maximumLadders }), [currentBand, maximumLadders]);

  const handleReplace = useCallback(() => {
    if (!currentBand || currentBand > maximumLadders || currentBand < 1) {
      router.replace(`${pathname}?tab=ladder&band=1`);
    } else {
      router.replace(`${pathname}?tab=ladder&band=${currentBand}`);
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
