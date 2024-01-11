import { create } from 'zustand';
import {
  ProjectCourseType,
  UnitPagesListType
} from '@/service/webApi/course/type';

export interface CourseStateType {
  courseList: ProjectCourseType[];
  unitsLessonsList: UnitPagesListType[];
  learnPageTitle: string;
  setUnitsLessonsList: (payload: UnitPagesListType[]) => void;
  setCourseList: (payload: ProjectCourseType[]) => void;
  setLearnPageTitle: (payload: string) => void;
}

export const useCourseStore = create<CourseStateType>()((set) => ({
  courseList: [],
  unitsLessonsList: [],
  learnPageTitle: '',
  setUnitsLessonsList(payload) {
    set((state) => ({ unitsLessonsList: payload }));
  },
  setCourseList(payload) {
    set((state) => ({ courseList: payload }));
  },
  setLearnPageTitle(payload) {
    set((state) => ({ learnPageTitle: decodeURIComponent(payload) }));
  }
}));
