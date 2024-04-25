export interface LadderBand {
    buckets: Bucket[];
    salaryRange: string;
    threshold: number;
}

export interface Bucket {
    bucketName: string;
    bucketSlug: string;
    bucketType: BucketType;
    description: string;
    advancementLevels: AdvancementLevel[];
}

export enum BucketType {
    HARD = 'hard',
    SOFT = 'soft',
}

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
