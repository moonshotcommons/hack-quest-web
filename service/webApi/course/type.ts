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
  LEARNING_TRACK = 'LEARNING_TRACK',
  Mini = 'MINI'
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
export interface CourseDataType {
  total: number;
  data: CourseResponse[];
}

export interface CourseDetailType {
  id: string;
  name: string;
  description: string;
  type: CourseType;
  level?: string | string[];
  duration: number;
  aboutDesc: any[];
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
  file: FormData;
  lessonId: string;
  link: string;
}
