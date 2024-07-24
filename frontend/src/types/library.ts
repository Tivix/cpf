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
  status?: string;
}

export interface Bucket {
  bucketName: string;
  bucketSlug: string;
  bucketType: typeof BucketType;
  description: string;
  advancementLevels: AdvancementLevel[];
}

export interface SoftSkillBucket {
  bucketName: string;
  bucketSlug: string;
  description: string;
  status?: string;
  categories: {
    [categoryGroup: string]: AtomicSkill[];
  };
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
  proofStatus?: typeof ProofStatus;
}

export const ProofStatus = {
  APPROVED: 'approved',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

export const SoftSkillStatus = {
  COMPLETED: 'completed',
  PENDING: 'pending',
};
