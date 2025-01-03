import { Lang } from '@/i18n/config';
import { CourseDetailType } from '../course/type';
import { CertificationType } from '../campaigns/type';
import { HackathonType } from '../resourceStation/type';

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

export interface EcosystemHackathonType {
  alias: string;
  id: string;
  name: string;
  image: string;
  rewardTime: string;
  submissionClose: string;
  rewards: {
    totalPlace: number;
  }[];
  memberCount: number;
  hosts: {
    name: string;
    picture: string;
  }[];
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
  subTitle: string;
  courses: CourseDetailType[];
  learningTracks: CourseDetailType[];
  hackathons?: HackathonType[];
  extra?: {
    link: string;
  };
}

export interface LevelType {
  ecosystemId: string;
  label: string;
  level: number;
  maxExp: number;
  certificationId: string;
  certification: CertificationType;
}

export interface EcosystemStatsType {
  pageView: number;
  started: number;
}

export interface ecosystemUserData {
  EarnedCertificationCount: number;
  avatar: string;
  completedCourseCount: number;
  nickname: string;
  username: string;
}
