export interface Response {
  id: string;
}

/** Tab类型 */
export enum CourseType {
  SYNTAX = 'SYNTAX',
  GUIDED_PROJECT = 'GUIDED_PROJECT',
  CONCEPT = 'CONCEPT',
  TEASER = 'TEASER',
  HACKATHON = 'HACKATHON',
  LEARNING_TRACKS = 'LEARNING_TRACKS'
}

export enum LessonStyleType {
  A = 'A',
  B = 'B',
  C = 'C'
}

export enum CompleteStateType {
  NOT_STARTED = 0,
  LEARNING = 1,
  COMPLETED = 2
}

/** 课程列表的返回值 */
export interface CourseResponse {
  id: string;
  name: string;
  description: string;
  type: CourseType;
  level?: string | string[];
  duration: number;
  aboutDesc: string;
  unitCount: number;
  progress: number;
}

export interface CourseDetailType {
  id: string;
  name: string;
  description: string;
  type: CourseType;
  level?: string | string[];
  duration: number;
  aboutDesc: string;
  progress: number;
  peopleJoined: number;
  units?: CourseUnitType[];
}

export interface CourseUnitType {
  id: string;
  name: string;
  description: string;
  sequence: number;
  progress: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseUnitStateType {
  id: string;
  name: string;
  description: string;
  state: CompleteStateType;
  progress: number;
}

export interface CourseLessonType {
  id: string;
  name: string;
  style: LessonStyleType;
  sequence: number;
  unitId: string;
  courseId: string;
  content?: any[];
}

export interface CourseLessonStateType {
  id: string;
  name: string;
  unitId: string;
  state: CompleteStateType;
}

export type UnitPagesListType = CourseUnitStateType & {
  pages: CourseLessonStateType[];
};
