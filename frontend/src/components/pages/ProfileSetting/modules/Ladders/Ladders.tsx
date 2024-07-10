import { Card } from '@app/components/common/Card';
import { LadderDataItem } from '../../utils';
import { LaddersProps } from './Ladders.interface';

export const Ladders: React.FC<LaddersProps> = ({ ladders }) => {
  return (
    <Card title="Ladders">
      {ladders.map(({ ladderName, technology, band }) => (
        <div className="flex flex-col gap-6 rounded-xl border border-navy-200 p-6" key={ladderName}>
          <LadderDataItem title="LadderDetails" value={ladderName} />
          <LadderDataItem title="Technology" value={technology} />
          <LadderDataItem title="Band" value={band} />
        </div>
      ))}
    </Card>
  );
};
