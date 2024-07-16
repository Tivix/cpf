import { AdvancementLevelProps } from './AdvancementLevel.interface';
import { MAX_LEVEL, MIN_LEVEL } from './constants';

export const AdvancementLevel = ({ level }: AdvancementLevelProps) => {
  const currentLevel = Math.min(Math.max(level ?? MIN_LEVEL, MIN_LEVEL), MAX_LEVEL);

  return (
    <div className="flex flex-row gap-[7px]">
      {[...Array(currentLevel)].map((idx) => (
        <div key={`green-${idx}`} className="h-3 w-3 rounded-full bg-green-600"></div>
      ))}
      {[...Array(MAX_LEVEL - currentLevel)].map((idx) => (
        <div key={`grey-${idx}`} className="h-3 w-3 rounded-full bg-navy-300"></div>
      ))}
    </div>
  );
};
