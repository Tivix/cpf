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
  bandNumber: number;
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
  status?: string;
}

export interface Bucket {
  bucketName: string;
  bucketSlug: string;
  bucketType: keyof typeof BucketType;
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
  proofStatus?: keyof typeof ProofStatus;
}

export const ProofStatus = {
  approved: 'approved',
  pending: 'pending',
  rejected: 'rejected',
} as const;

export const SoftSkillStatus = {
  completed: 'completed',
  pending: 'pending',
} as const;
