'use client';

import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { routes } from '@app/constants';
import { LadderTabs } from '../../modules/LadderTabs';
import { useLadderDetails } from './LadderDetails.hooks';
import { LadderDetailsProps } from './LadderDetails.interface';
import { LadderDetails } from './modules/LadderDetails';

export const LadderDetailsPage: React.FC<LadderDetailsProps> = ({ bands, ladderSlug }) => {
  const { currentBand, handleLadderChange, tabsProps } = useLadderDetails(bands);

  if (!currentBand || !bands || !bands[currentBand - 1]) {
    return null;
  }

  const ladderName = bands[currentBand - 1].ladder.ladderName;

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'CPF Library', href: routes.library.index, current: false },
          { label: ladderName, href: `${routes.library.index}/${ladderSlug}`, current: true },
        ]}
      />
      {bands && (
        <section className="grid grid-cols-10 py-16">
          <div className="col-span-2 mx-auto">
            <LadderTabs {...tabsProps} ladderOnClick={handleLadderChange} />
          </div>
          <div className="col-span-7">
            <LadderDetails
              band={currentBand}
              data={bands[currentBand - 1]}
              ladderName={ladderName}
              ladderSlug={ladderSlug}
            />
          </div>
        </section>
      )}
    </div>
  );
};
