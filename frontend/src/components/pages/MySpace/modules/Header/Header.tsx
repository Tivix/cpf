import { Typography } from '@app/components/common/Typography';
import { HeaderProps } from './Header.interface';
import { Avatar } from '@app/components/common/Avatar';
import { CheckIcon } from '@app/static/icons/CheckIcon';
import { TargetIcon } from '@app/static/icons/TargetIcon';
import { LevelCard } from '@app/components/pages/MySpace/modules/LevelCard';

export const Header: React.FC<HeaderProps> = ({ user, currentLevel, nextLevel }) => {
  const { firstName, lastName, photo, position } = user;

  return (
    <div className="flex w-full justify-between rounded-3xl bg-navy-200 px-6 py-9">
      <div className="flex items-center gap-6">
        <Avatar firstName={firstName} lastName={lastName} imageUrl={photo} variant="100" />
        <div className="flex flex-col justify-center gap-1">
          <Typography variant="head-m/medium">
            {firstName} {lastName}
          </Typography>
          <Typography variant="body-m/medium" className="text-navy-600">
            {position}
          </Typography>
        </div>
      </div>
      <div className="flex items-center">
        <LevelCard
          title="Current Level"
          band={currentLevel.band}
          score={currentLevel.score}
          icon={<CheckIcon className="h-6 w-6" />}
          scoreLabel="Score"
        />
        <hr className="w-14 border-navy-300" />
        <LevelCard
          title="Next Level"
          band={nextLevel.band}
          score={nextLevel.threshold}
          icon={<TargetIcon className="h-6 w-6" />}
          scoreLabel="Threshold"
        />
      </div>
    </div>
  );
};
