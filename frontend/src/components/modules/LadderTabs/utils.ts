import { LadderInterface } from './LadderTabs.interface';

export const generateBandGrouping = (
  totalNumberOfBands: number,
  bandsPerLevel = 3,
  positionNames = ['Junior', 'Mid', 'Senior'],
): LadderInterface => {
  const bands = Array.from({ length: totalNumberOfBands }, (_, i) => i + 1);

  return Object.fromEntries(
    positionNames.map((key, index) => {
      const startIndex = index * bandsPerLevel;
      return [key, bands.slice(startIndex, startIndex + bandsPerLevel)];
    }),
  );
};
