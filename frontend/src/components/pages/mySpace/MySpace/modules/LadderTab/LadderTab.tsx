'use client';
import { LadderTabProps } from './LadderTab.interface';
import { LadderTabs } from '@app/components/modules/LadderTabs';
import { useLadderTab } from './LadderTab.hooks';
import { LadderDetails } from './modules/LadderDetails';

export const LadderTab: React.FC<LadderTabProps> = ({ bands, ladder }) => {
  const { currentBand, handleLadderChange, tabsProps } = useLadderTab(bands);

  if (!currentBand || !bands[currentBand]) {
    return null;
  }

  return (
    <section className="grid grid-cols-10 py-16">
      <div className="col-span-2 mx-auto">
        <LadderTabs {...tabsProps} ladderOnClick={handleLadderChange} currentBand={ladder?.band?.bandNumber} />
      </div>
      <div className="col-span-7">
        <LadderDetails
          band={currentBand}
          ladder={bands[currentBand]}
          ladderName={ladder?.ladder?.ladderName}
          ladderSlug={ladder?.ladder?.ladderSlug}
        />
      </div>
    </section>
  );
};
