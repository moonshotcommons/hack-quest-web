import { CourseLanguageType } from '@/service/webApi/course/type';

export enum LearningTrackTab {
  BASIC = 'Basic',
  SPECIALLIZATION = 'Specialization'
}

export enum LanguageTab {
  ALL = ''
}

export interface SearchInfoType {
  track: LearningTrackTab;
  language: CourseLanguageType | LanguageTab;
}
