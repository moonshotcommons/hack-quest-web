import { CourseResponse, CourseType } from '../course/type';

export type SectionType = {
  name: string;
  courses: CourseResponse[];
  progress?: number;
};

/** 学习路线详情 */
export interface LearningTrackDetailType {
  id: string;
  type: CourseType;
  name: string;
  description: string;
  level: string;
  enrolled?: boolean;
  aboutDesc: any;
  courseCount: number;
  progress: number;
  duration: number;
  peopleJoined: number;
  // courses: (CourseResponse )[];
  sections: SectionType[];
  unitCount: number;
  certificationId?: string;
  campaignId?: string;
  language: string;
}
