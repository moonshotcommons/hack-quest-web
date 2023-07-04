export interface Response {
  id: string;
}

/** Tab类型 */
export enum CourseType {
  SYNTAX = 'SYNTAX',
  GUIDED_PROJECT = 'GUIDED_PROJECT',
  CONCEPT_LEARNING = 'CONCEPT_LEARNING',
  TEASER = 'TEASER',
  HACKATHON = 'HACKATHON',
  LEARNING_TRACKS = 'LEARNING_TRACKS'
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
