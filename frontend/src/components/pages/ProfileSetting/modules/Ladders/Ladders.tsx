import { Card } from '@app/components/common/Card';
import { LadderDataItem } from '../../utils';
import { LaddersProps } from './Ladders.interface';

export const Ladders: React.FC<LaddersProps> = ({ ladders }) => {
  return (
    <Card title="Ladders">
      {ladders.map(({ ladder, technology, band }) => (
        <div className="flex flex-col gap-6 rounded-xl border border-navy-200 p-6" key={ladder.ladderSlug}>
          <LadderDataItem title="Ladder" value={ladder.ladderName} />
          <LadderDataItem title="Technology" value={technology} />
          <LadderDataItem title="Band" value={band.bandNumber} />
        </div>
      ))}
    </Card>
  );
};
