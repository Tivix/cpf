import { Card } from '@app/components/common/Card';
import { LadderDataItem } from '../../utils';
import { LaddersProps } from './Ladders.interface';
import { Typography } from '@app/components/common/Typography';

export const Ladders: React.FC<LaddersProps> = ({ ladders }) => {
  return (
    <Card title="Ladders">
      {ladders && ladders.length > 0 ? (
        ladders.map(({ ladder, technologies, band }) => (
          <div className="flex flex-col gap-6 rounded-xl border border-navy-200 p-6" key={ladder.ladderSlug}>
            <LadderDataItem title="Ladder" value={ladder.ladderName} />
            <LadderDataItem title="Technology" value={technologies.join(', ')} />
            <LadderDataItem title="Band" value={band.bandNumber} />
          </div>
        ))
      ) : (
        <Typography variant="body-s/regular">There are no ladders assigned.</Typography>
      )}
    </Card>
  );
};
