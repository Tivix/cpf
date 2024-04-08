import { LadderInterface } from './LadderTabs.interface';

export const generateBandGrouping = (
  totalNumberOfBands: number,
  bandsPerLevel = 3,
  positionNames = ['Junior', 'Mid', 'Senior'],
) => {
  let bandGrouping: LadderInterface = {};

  let bandCounter = 1; // Initialize band counter

  // Loop through position names
  for (const position of positionNames) {
    const bands = [];
    // Calculate the starting band for the current position
    const startBand = positionNames.indexOf(position) * bandsPerLevel + 1;
    // Generate bands for the current position
    for (let i = 0; i < bandsPerLevel && bandCounter <= totalNumberOfBands; i++) {
      bands.push(startBand + i);
      bandCounter++;
    }
    // Assign bands to position if bands were generated
    if (bands.length > 0) {
      bandGrouping[position] = bands;
    }
  }

  return bandGrouping;
};
