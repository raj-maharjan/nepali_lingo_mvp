export type ChallengeType = "SELECT" | "ASSIST";

export interface ChallengeOption {
    id: number;
    challengeId: number;
    text: string;
    correct: boolean;
    imageSrc: string | null;
    audioSrc: string | null;
}

export interface Challenge {
    id: number;
    lessonId: number;
    type: ChallengeType;
    question: string;
    order: number;
    challengeOptions: ChallengeOption[];
}

export interface Lesson {
    id: number;
    unitId: number;
    title: string;
    order: number;
    challenges: Challenge[];
    completed: boolean; // For mock user progress
}

export interface Unit {
    id: number;
    title: string;
    description: string;
    order: number;
    lessons: Lesson[];
}

export interface Course {
    id: number;
    title: string;
    imageSrc: string;
    units: Unit[];
}
