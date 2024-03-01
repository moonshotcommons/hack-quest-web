import { create } from 'zustand';
import {
  ProjectCourseType,
  UnitPagesListType
} from '@/service/webApi/course/type';

export enum LearnPageType {
  UGC_CREATE = 'ugc-create'
}
export interface CourseStateType {
  courseList: ProjectCourseType[];
  unitsLessonsList: UnitPagesListType[];
  learnPageTitle: string;
  learnPageType: LearnPageType | null;
  setUnitsLessonsList: (payload: UnitPagesListType[]) => void;
  setCourseList: (payload: ProjectCourseType[]) => void;
  setLearnPageTitle: (payload: string) => void;
  setPageType: (payload: LearnPageType | null) => void;
}

export const useCourseStore = create<CourseStateType>()((set) => ({
  courseList: [],
  unitsLessonsList: [],
  learnPageTitle: '',
  learnPageType: null,
  setUnitsLessonsList(payload) {
    set((state) => ({ unitsLessonsList: payload }));
  },
  setCourseList(payload) {
    set((state) => ({ courseList: payload }));
  },
  setLearnPageTitle(payload) {
    set((state) => ({ learnPageTitle: decodeURIComponent(payload) }));
  },
  setPageType(payload) {
    set(() => ({ learnPageType: payload }));
  }
}));
