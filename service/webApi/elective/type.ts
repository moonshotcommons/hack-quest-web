import { CompleteStateType, CourseType } from '../course/type';

export interface CreatorType {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
}

export interface PageType {
  electiveId: string;
  id: string;
  name: string;
  state: CompleteStateType;
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
