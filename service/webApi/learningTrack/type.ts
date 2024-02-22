import { ProjectCourseType, CourseBaseType } from '../course/type';

export type SectionType = {
  name: string;
  courses: ProjectCourseType[];
  progress?: number;
};

/** 学习路线详情 */
// export interface LearningTrackDetailType {
//   id: string;
//   type: CourseType;
//   name: string;
//   description: string;
//   level: string;
//   enrolled?: boolean;
//   aboutDesc: any;
//   courseCount: number;
//   progress: number;
//   duration: number;
//   peopleJoined: number;
//   // courses: (ProjectCourseType )[];
//   sections: SectionType[];
//   unitCount: number;
//   certificationId?: string;
//   campaignId?: string;
//   language: string;
// }

export interface LearningTrackDetailType extends CourseBaseType {
  courseCount: number;
  unitCount: number;
  campaignId?: string;
  certificationId?: string;
  enrolled: boolean;
  image: string;
  sections: SectionType[];
}
