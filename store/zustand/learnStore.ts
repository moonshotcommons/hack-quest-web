import { CourseType } from '@/service/webApi/course/type';
import { create } from 'zustand';

export interface LearnLessonType {
  courseType: CourseType;
  lesson: any;
}

export interface LearnStateType {
  learnLesson: LearnLessonType | null;
  setLearnLesson: (payload: LearnLessonType | null) => void;
}

export const useLearnStore = create<LearnStateType>()((set) => ({
  learnLesson: null,
  setLearnLesson(payload) {
    set((state) => ({ learnLesson: payload }));
  }
}));
