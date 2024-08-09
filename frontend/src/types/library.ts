export interface LadderBand {
  hardSkillBuckets: LadderBandBucket[];
  softSkillBuckets: LadderBandBucket[];
  salaryRange: string;
  threshold: number;
}

export interface Band {
  salaryRange: string;
  threshold: number;
  ladderSlug: string;
  bandId: number;
}

export interface BandWithBuckets extends Band {
  buckets: Bucket[];
  ladder: {
    ladderName: string;
  };
}

export interface LadderBandBucket {
  bucketName: string;
  bucketSlug: string;
  bucketType: keyof typeof BucketType;
  description: string;
  level?: number;
}

export interface Bucket {
  bucketName: string;
  bucketSlug: string;
  bucketType: keyof typeof BucketType;
  description: string;
  advancementLevels: AdvancementLevel[];
}

export const BucketType = {
  hard: 'hard',
  soft: 'soft',
} as const;

export interface AdvancementLevel {
  advancementLevel: number;
  description: string;
  projects: ExampleProject[];
  skills: AtomicSkill[];
}

export interface ExampleProject {
  title: string;
  overview: string;
}

export interface AtomicSkill {
  name: string;
  description?: string;
  category: string;
  skillId: number;
}
