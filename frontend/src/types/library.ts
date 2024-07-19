export interface LadderBand {
  hardSkillBuckets: LadderBandBucket[];
  softSkillBuckets: LadderBandBucket[];
  salaryRange: string;
  threshold: number;
}

export interface LadderBandBucket {
  bucketName: string;
  bucketSlug: string;
  bucketType: typeof BucketType;
  description: string;
  level?: number;
}

export interface Bucket {
  bucketName: string;
  bucketSlug: string;
  bucketType: typeof BucketType;
  description: string;
  advancementLevels: AdvancementLevel[];
}

export const BucketType = {
  HARD: 'hard',
  SOFT: 'soft',
} as const;

export interface AdvancementLevel {
  advancementLevel: number;
  description: string;
  projects: ExampleProject[];
  categories: {
    [categoryGroup: string]: AtomicSkill[];
  };
}

export interface ExampleProject {
  title: string;
  overview: string;
}

export interface AtomicSkill {
  name: string;
  description?: string;
}
