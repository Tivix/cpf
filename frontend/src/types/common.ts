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
  exampleProjects: ExampleProject[];
  atomicSkills: AtomicSkill[];
}

export interface ExampleProject {
  title: string;
  overview: string;
}

export interface AtomicSkill {
  name: string;
  category: string;
}

export interface Employee {
  name: string;
  title: string;
  ladder: string;
  currentBand: number;
  activeGoal: boolean;
  goalProgress: number;
  latestActivity: number;
  active: boolean;
  draft: boolean;
  deactivated: boolean;
}
