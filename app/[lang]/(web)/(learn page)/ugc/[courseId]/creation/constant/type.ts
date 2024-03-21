'use client';
import { ReactNode, createContext } from 'react';
import {
  CompleteStateType,
  CourseLevelType,
  CourseTrackType,
  IntendedLearnersType,
  KnowledgeGainType,
  LessonType
} from '@/service/webApi/course/type';

export interface LessonTypeDataType {
  value: LessonType;
  label: string;
  icon: ReactNode;
  description: string;
}

export interface IntroductionType {
  track: CourseTrackType | null;
  level: CourseLevelType | null;
  title: string;
  subTitle: string;
  description: string;
  completed: boolean;
}
export interface CourseInformationType {
  introduction: IntroductionType;
  intendedLearners: IntendedLearnersType & { completed: boolean };
  knowledgeGain: KnowledgeGainType & { completed: boolean };
}

export interface CourseContentType {
  getYourReady: {
    completed: boolean;
  };
  curriculum: {
    completed: boolean;
    units: any[];
  };
}

export interface CourseFormDataType {
  introduction: IntroductionType;
  intendedLearners: IntendedLearnersType;
  knowledgeGain: KnowledgeGainType;
}

export enum CreationPageKey {
  Introduction = 'introduction',
  IntendedLearners = 'intendedLearners',
  KnowledgeGain = 'knowledgeGain',
  GetYourReady = 'getYourReady',
  Curriculum = 'curriculum',
  ChooseLesson = 'chooseLesson'
}

export interface LessonMenuType {
  id: string;
  name?: string;
  unitId: string;
  state: CompleteStateType;
  disable?: boolean;
  title: string;
  type: LessonType | null;
  icon: ReactNode;
  isInput: boolean;
  isDragging: boolean;
}
export interface UnitMenuType {
  id: string;
  name?: string;
  state?: CompleteStateType;
  disable?: boolean;
  progress: number;
  title: string;
  isInput: boolean;
  isToggle: boolean;
  lessonInputValue: string;
  isDragging: boolean;
  pages: LessonMenuType[];
}

export enum CreationHandleKey {
  ADD_LESSON = 'addLesson'
}

export const defaultCourseInformation: CourseInformationType = {
  introduction: {
    track: null,
    level: null,
    title: '',
    subTitle: '',
    description: '',
    completed: false
  },
  intendedLearners: {
    audience: [],
    requirements: [],
    completed: false
  },
  knowledgeGain: {
    description: [],
    tags: [],
    completed: false
  }
};

export interface UgcCreateContextType {
  courseInformation: CourseInformationType;
  setCourseInformation: (payload: CourseInformationType) => void;
  selectLessonId: string | CreationPageKey;
  setSelectLessonId: (id: string) => void;
  courseId: string;
  units: any[];
  setUnits: (units: any[]) => void;
  setCourseId: (id: string) => void;
  selectUnitMenuId: string;
  setSelectUnitMenuId: (id: string) => void;
  handleNext: (id?: string) => void;
}

export const UgcCreateContext = createContext<UgcCreateContextType>({
  courseInformation: defaultCourseInformation,
  setCourseInformation: () => {},
  selectLessonId: '',
  setSelectLessonId: () => {},
  courseId: '',
  units: [],
  setUnits: (units: any) => {},
  setCourseId: () => {},
  selectUnitMenuId: '',
  setSelectUnitMenuId: () => {},
  handleNext: () => {}
});
