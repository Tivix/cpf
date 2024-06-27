'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LadderDetails } from '@app/components/modules/LadderDetails';
import { LadderTabs } from '@app/components/modules/LadderTabs';
import { LibraryDetailedProps } from './LibraryDetailed.interface';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const LibraryDetailed: React.FC<LibraryDetailedProps> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const band = searchParams.get('band');

  const [currentBand, setCurrentBand] = useState(typeof band === 'string' ? parseInt(band, 10) : 1);
  const maximumLadders = useMemo(() => Object.keys(data.bands).length, [data]);
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

  if (!currentBand || !data?.bands[currentBand]) {
    return null;
  }

  return (
    <section className="grid grid-cols-10 py-16">
      <div className="col-span-2 mx-auto">
        <LadderTabs {...tabsProps} ladderOnClick={handleLadderChange} />
      </div>
      <div className="col-span-7">
        <LadderDetails band={currentBand} ladder={data.bands[currentBand]} ladderName={data.ladderName} />
      </div>
    </section>
  );
};
