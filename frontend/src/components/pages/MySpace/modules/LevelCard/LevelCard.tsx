import { Typography } from '@app/components/common/Typography';
import { LevelCardProps } from './LevelCard.interface';

export const LevelCard: React.FC<LevelCardProps> = ({ title, band, score, icon, scoreLabel }) => {
  return (
    <div className="flex flex-col justify-center gap-3 rounded-2xl bg-navy-100 py-2 text-center">
      <div className="flex flex-col items-center gap-2">
        <div className="text-blue-800">
          {icon}
        </div>
        <Typography variant="body-m/semibold">{title}</Typography>
      </div>
      <div className="flex">
        <div className="w-[100px] border-r border-navy-300">
          <Typography variant="hint/caps-medium" className="text-navy-600">
            Band
          </Typography>
          <Typography variant="body-m/bold">{band}</Typography>
        </div>
        <div className="w-[100px]">
          <Typography variant="hint/caps-medium" className="text-navy-600">
            {scoreLabel}
          </Typography>
          <Typography variant="body-m/bold">{score}</Typography>
        </div>
      </div>
    </div>
  );
};
