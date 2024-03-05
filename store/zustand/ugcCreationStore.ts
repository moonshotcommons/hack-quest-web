import {
  CourseLevelType,
  CourseTrackType,
  IntendedLearnersType,
  KnowledgeGainType
} from '@/service/webApi/course/type';
import { create } from 'zustand';

interface CourseInformationType {
  introduction: {
    courseTrack: CourseTrackType | null;
    difficulty: CourseLevelType | null;
    title: string;
    subTitle: string;
    description: string;
    completed: boolean;
  };
  intendedLearners: IntendedLearnersType & { completed: boolean };
  knowledgeGain: KnowledgeGainType & { completed: boolean };
}

export enum InformationKey {
  Introduction = 'introduction',
  IntendedLearners = 'intendedLearners',
  KnowledgeGain = 'knowledgeGain'
}

export interface UgcCreationStateType {
  courseInformation: CourseInformationType;
  selectLessonId: string | InformationKey;
  units: any[];
  setCourseInformation: (payload: CourseInformationType) => void;
  setSelectLessonId: (
    courseId: string,
    lessonId: string | InformationKey
  ) => void;
}

const defaultCourseInformation: CourseInformationType = {
  introduction: {
    courseTrack: null,
    difficulty: null,
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

export const useUgcCreationStore = create<UgcCreationStateType>()((set) => ({
  courseInformation: defaultCourseInformation,
  selectLessonId: '',
  units: [],

  async setSelectLessonId(courseId, lessonId) {
    set((state) => {
      return { selectLessonId: lessonId };
    });

    if (courseId === '-1') {
    } else {
      switch (lessonId) {
        case InformationKey.Introduction:
        case InformationKey.IntendedLearners:
        case InformationKey.KnowledgeGain:
        // TODO 请求information数据设置进去
        // this.setCourseInformation(defaultCourseInformation);
        default:
        // 请求 lesson 数据
        // 设置 lesson 数据
      }
    }
  },
  setCourseInformation(courseInformation) {
    for (let key in courseInformation) {
      switch (key) {
        case InformationKey.Introduction:
          if (
            ![
              !courseInformation[key].courseTrack,
              !courseInformation[key].difficulty,
              !courseInformation[key].description,
              !courseInformation[key].subTitle,
              !courseInformation[key].title
            ].includes(true)
          ) {
            courseInformation[key].completed = true;
          }
          break;
        case InformationKey.IntendedLearners:
          if (
            (courseInformation[key].audience?.length || 0) > 0 &&
            (courseInformation[key].requirements?.length || 0) > 0
          ) {
            courseInformation[key].completed = true;
          }
          break;
        case InformationKey.KnowledgeGain:
          if (
            (courseInformation[key].description?.length || 0) > 0 &&
            (courseInformation[key].tags?.length || 0) > 0
          ) {
            courseInformation[key].completed = true;
          }
      }
    }
    set((state) => ({ courseInformation }));
  }
}));
