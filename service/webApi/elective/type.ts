import { thirdPartyMedia } from '@/helper/thirdPartyMedia';
import { CompleteStateType, CourseType } from '../course/type';

export interface CreatorType {
  id: string;
  name: string;
  nickname: string;
  profileImage: string;
}

export interface PageType {
  electiveId: string;
  id: string;
  name: string;
  state: CompleteStateType;
}

export interface ElectiveListDataType {
  total: number;
  data: MiniElectiveCourseType[];
}

export interface MiniElectiveCourseType {
  id: string;
  image: string;
  level: string;
  name: string;
  description: string;
  isRegistered: boolean;
  peopleJoined: number;
  progress: number;
  status: string;
  track: string;
  type: CourseType.Mini;
  completed: boolean;
  completedPages: number;
  duration: number;
  creator: null | CreatorType;
  pages?: PageType[];
  pageCount?: number;
  unitCount?: number;
  creatorId: string;
}

export interface ElectiveLessonType {
  content: Record<string, any>;
  createAt: Date;
  electiveId: string;
  id: string;
  name: string;
  sequence: number;
  state: CompleteStateType;
  updateAt: Date;
}

export enum EcosystemProfileLink {
  DISCORD = 'discord',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  TELEGRAM = 'telegram'
}
export interface EcosystemProfileType {
  id: string;
  name: string;
  description: string;
  website: string;
  links: Record<keyof typeof thirdPartyMedia, string>;
  profileImage: string;
  background: string;
  courseCount: number;
  learnCount: number;
}

export interface EcosystemElectiveType {
  id: string;
  name: string;
  description: string;
  image: string;
  type: CourseType.Mini;
  level: string;
  track: string;
  duration: number;
  peopleJoined: number;
}
