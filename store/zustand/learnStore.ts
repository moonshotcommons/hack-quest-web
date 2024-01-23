import { CourseType } from '@/service/webApi/course/type';
import { create } from 'zustand';

export interface LearnLessonType {
  courseType: CourseType;
  lesson: any;
}

export interface LearnStateType {
  learnLesson: LearnLessonType | null;
  sidebarOpen: boolean;
  setLearnLesson: (payload: LearnLessonType | null) => void;
  setSidebarOpen: (payload: boolean) => void;
}

export const useLearnStore = create<LearnStateType>()((set) => ({
  learnLesson: null,
  sidebarOpen: false,
  setLearnLesson(payload) {
    set((state) => ({ learnLesson: payload }));
  },
  setSidebarOpen(payload) {
    set((state) => ({ sidebarOpen: payload }));
  }
}));
