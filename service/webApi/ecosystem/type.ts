import { Lang } from '@/i18n/config';
import { CourseDetailType } from '../course/type';

export interface EcosystemType {
  id: string;
  name: string;
  description: string;
  image: string;
  lang: Lang;
  language: string;
  tags: string[];
  track: string;
  certificateDesc: string;
  enrolled: boolean;
  projectCount: number;
}

export interface EcosystemLevelType {
  ecosystemId: string;
  label: string;
  level: number;
  currentExp: number;
  maxExp: number;
  certificationId: string;
}

export interface EcosystemDetailType {
  info: EcosystemType;
  level: EcosystemLevelType;
}

export interface EcosystemTask {
  taskId: string;
  name: string;
  description: string;
  type: string;
  exp: number;
  progress: [number, number];
  completed: boolean;
  claimed: boolean;
  track: string;
  language: string;
  courses: CourseDetailType[];
  learningTracks: LearningTrackDetail[];
}

export interface LearningTrackDetail {
  id: string;
  title: string;
  description: string;
  track: string;
  image: string;
  language: string;
  progress: number;
  courseCount: number;
}
