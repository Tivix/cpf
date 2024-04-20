export interface BandInterface {
  [band: string]: {
    threshold: number;
    salaryRange: string;
    buckets: {
      bucketSlug: string;
    }[];
  };
}

export interface LibraryDetailedProps {
  data: {
    ladderName: string;
    bands: Record<string, BandInterface[]>;
  };
}
