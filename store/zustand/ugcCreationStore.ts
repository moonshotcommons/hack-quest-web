import {
  CourseLevelType,
  CourseTrackType,
  IntendedLearnersType,
  KnowledgeGainType
} from '@/service/webApi/course/type';
import { create } from 'zustand';

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

export enum CreationHandle {
  UN_SAVE = 'unSave',
  ON_SAVE = 'onSave'
}

export interface CourseFormDataType {
  introduction: IntroductionType;
  intendedLearners: IntendedLearnersType;
  knowledgeGain: KnowledgeGainType;
}

export enum InformationKey {
  Introduction = 'introduction',
  IntendedLearners = 'intendedLearners',
  KnowledgeGain = 'knowledgeGain'
}

export interface UgcCreationStateType {
  courseInformation: CourseInformationType;
  selectLessonId: string | InformationKey;
  courseId: string;
  units: any[];
  setCourseInformation: (payload: CourseInformationType) => void;
  setSelectLessonId: (
    courseId: string,
    lessonId: string | InformationKey
  ) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handle: CreationHandle;
  setHandle: (save: CreationHandle) => void;
}

const defaultCourseInformation: CourseInformationType = {
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

export const useUgcCreationStore = create<UgcCreationStateType>()((set) => ({
  courseInformation: defaultCourseInformation,
  selectLessonId: '',
  courseId: '',
  units: [],
  async setSelectLessonId(courseId, lessonId) {
    set((state) => {
      return { selectLessonId: lessonId, courseId };
    });

    if (courseId === '-1') {
    } else {
      switch (lessonId) {
        case InformationKey.Introduction:
        case InformationKey.IntendedLearners:
        case InformationKey.KnowledgeGain:
          // TODO 请求information数据设置进去
          break;
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
            [
              !courseInformation[key].track,
              !courseInformation[key].level,
              !courseInformation[key].description,
              !courseInformation[key].subTitle,
              !courseInformation[key].title
            ].includes(true)
          ) {
            courseInformation[key].completed = false;
          } else {
            courseInformation[key].completed = true;
          }
          break;
        case InformationKey.IntendedLearners:
          if (
            courseInformation[key]?.audience?.length ||
            courseInformation[key]?.requirements?.length
          ) {
            courseInformation[key].completed = true;
          } else {
            courseInformation[key].completed = false;
          }
          break;
        case InformationKey.KnowledgeGain:
          if (
            courseInformation[key].description?.length ||
            courseInformation[key].tags?.length
          ) {
            courseInformation[key]!.completed = true;
          } else {
            courseInformation[key]!.completed = false;
          }
          break;
      }
    }
    set((state) => ({ courseInformation }));
  },
  loading: false,
  setLoading(loading) {
    set((state) => ({ loading }));
  },
  handle: CreationHandle.UN_SAVE,
  setHandle(handle) {
    set((state) => ({ handle }));
  }
}));
