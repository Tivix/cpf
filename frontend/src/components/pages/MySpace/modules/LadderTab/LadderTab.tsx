'use client';
import { LadderTabProps } from './LadderTab.interface';
import { LadderTabs } from '@app/components/modules/LadderTabs';
import { useLadderTab } from './LadderTab.hooks';
import { LadderDetails } from '@app/components/modules/LadderDetails';

export const LadderTab: React.FC<LadderTabProps> = ({ bands, currentLevel }) => {
  const { currentBand, handleLadderChange, tabsProps } = useLadderTab(bands);

  if (!currentBand || !bands[currentBand]) {
    return null;
  }

  return (
    <section className="grid grid-cols-10 py-16">
      <div className="col-span-2 mx-auto">
        <LadderTabs {...tabsProps} ladderOnClick={handleLadderChange} currentBand={currentLevel} />
      </div>
      <div className="col-span-7">
        <LadderDetails band={currentBand} ladder={bands[currentBand]} ladderName={'Frontend'} ladderSlug={'frontend'} />
      </div>
    </section>
  );
};
