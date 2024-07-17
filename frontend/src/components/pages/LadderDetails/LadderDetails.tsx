'use client';

import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { routes } from '@app/constants';
import { LadderTabs } from '../../modules/LadderTabs';
import { useLadderDetails } from './LadderDetails.hooks';
import { LadderDetailsProps } from './LadderDetails.interface';
import { LadderDetails } from './modules/LadderDetails';
import NextAdapterApp from 'next-query-params/app';
import { QueryParamProvider } from 'use-query-params';

const LadderDetailsPage: React.FC<LadderDetailsProps> = ({ data, ladderSlug }) => {
  const { currentBand, handleLadderChange, tabsProps } = useLadderDetails(data?.bands);

  if (!currentBand || !data || !data.bands[currentBand]) {
    return null;
  }

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'CPF Library', href: routes.library.index, current: false },
          { label: data.ladderName, href: `${routes.library.index}/${ladderSlug}`, current: true },
        ]}
      />
      {data && (
        <section className="grid grid-cols-10 py-16">
          <div className="col-span-2 mx-auto">
            <LadderTabs {...tabsProps} ladderOnClick={handleLadderChange} />
          </div>
          <div className="col-span-7">
            <LadderDetails
              band={currentBand}
              ladder={data.bands[currentBand]}
              ladderName={data.ladderName}
              ladderSlug={ladderSlug}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export const LadderDetailsWrapper: React.FC<LadderDetailsProps> = (props) => (
  <QueryParamProvider adapter={NextAdapterApp}>
    <LadderDetailsPage {...props} />
  </QueryParamProvider>
);
