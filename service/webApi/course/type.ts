import { CourseTab } from '@/app/(web)/(base page)/(home)/instructor/constants/type';
import { ElectiveCourseType, PageType } from '../elective/type';

export interface Response {
  id: string;
}

/** Tab类型 */
export enum CourseType {
  SYNTAX = 'SYNTAX',
  GUIDED_PROJECT = 'GUIDED_PROJECT',
  LEARNING_TRACK = 'LEARNING_TRACK',
  MINI = 'MINI',
  UGC = 'UGC'
}

export enum LessonStyleType {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E'
}

export enum CompleteStateType {
  NOT_STARTED = 0,
  LEARNING = 1,
  COMPLETED = 2
}
export interface IntendedLearnersType {
  audience?: string[];
  requirements?: string[];
}
export interface KnowledgeGainType {
  description?: string[];
  tags?: string[];
}

/** 课程列表的返回值 */
// export interface ProjectCourseType {
//   id: string;
//   name: string;
//   description: string;
//   type: CourseType;
//   level?: string | string[];
//   duration: number;
//   aboutDesc: string;
//   unitCount?: number;
//   progress: number;
//   pageCount?: number;
// }

export enum CourseLevelType {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export enum CourseLanguageType {
  SOLIDITY = 'SOLIDITY',
  RUST = 'RUST',
  MOVE = 'MOVE'
}

export enum CourseTrackType {
  DeFi = 'DeFi',
  NFT = 'NFT',
  Security = 'Security',
  Gaming = 'Gaming'
}

export enum LessonType {
  READING = 'READING',
  VIDEO = 'VIDEO',
  QUIZ = 'QUIZ'
}

export interface CreatorType {
  id: string;
  name: string;
  nickname: string;
  profileImage: string;
}

//! UGC临时课程类型，可能是课程通用类型，后面需要更改
export interface UGCCourseType {
  id: string;
  title: string;
  subTitle: null | string;
  description: string;
  type: CourseType;
  level: CourseLevelType;
  duration: number;
  language: CourseLanguageType;
  track: CourseTrackType;
  progress?: number;
  peopleJoined: number;
  status: CourseTab;
  completed: boolean;
  optional: object;
  image: string | null;
  creator?: CreatorType;
  units?: {
    id: string;
    title: string;
    description: string;
    sequence: number;
    progress: number;
    courseId: string;
    createdAt: string;
    updatedAt: string;
    pages: {
      id: string;
      title: string;
      type: LessonType;
      unitId: string;
      state: CompleteStateType;
      courseId: string;
      sequence: number;
    }[];
  }[];
  intendedLearners: IntendedLearnersType & { completed: boolean };
  knowledgeGain: KnowledgeGainType & { completed: boolean };
}

/** 课程基础字段 */
export interface CourseBaseType {
  id: string;
  title: string;
  description: string;
  type: CourseType;
  level: CourseLevelType;
  image?: string;
  duration: number;
  language: CourseLanguageType;
  track: CourseTrackType;
  progress?: number;
  peopleJoined: number;
  intendedLearners: IntendedLearnersType | null;
  knowledgeGain: KnowledgeGainType | null;
  totalPages: number;
  certificationId?: string;
  creator?: CreatorType;
}

/** Project类型的课程 */
export interface ProjectCourseType extends CourseBaseType {
  unitCount: number;
}

export type CourseListType = ProjectCourseType | ElectiveCourseType;

export interface CourseDetailType extends CourseBaseType {
  units?: CourseUnitType[];
}

export interface CourseUnitType {
  id: string;
  // name: string;
  title: string;
  description: string;
  sequence: number;
  progress: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  pages?: PageType[];
}

export interface CourseUnitStateType {
  id: string;
  name: string;
  description: string;
  state: CompleteStateType;
  progress: number;
  disable: boolean;
}

export interface CourseLessonType {
  id: string;
  name: string;
  style: LessonStyleType;
  sequence: number;
  unitId: string;
  courseId: string;
  content?: Record<string, any>;
  state: CompleteStateType;
  completedQuiz?: number[];
}

export interface CourseLessonStateType {
  id: string;
  name: string;
  unitId: string;
  state: CompleteStateType;
  disable: boolean;
}

export type UnitPagesListType = CourseUnitStateType & {
  pages: CourseLessonStateType[];
};

export enum ProcessType {
  IN_PROCESS = 'inProcess',
  COMPLETED = 'completed'
}
export enum LearningTrackCourseType {
  IN_PROCESS = 'inProcess',
  COMPLETED = 'completed',
  UN_ENROLL = 'unEnroll'
}

export interface SuggestCommitParams {
  type: string[];
  content: string;
  // file: FormData;
  lessonId: string;
  link: string;
}
