import { ProjectCourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { LearningTrackDetailType, SectionType } from '@/service/webApi/learningTrack/type';
import { useMemo } from 'react';

export interface LearningStateType {
  learningSection: SectionType | null;
  learningSectionIndex: number;
  learningCourse: ProjectCourseType | ElectiveCourseType | null;
}

export const useLearningTrackLearningInfo = (learningTrackDetail: LearningTrackDetailType) => {
  const { learningSection, learningCourse, learningSectionIndex } = useMemo(() => {
    let state: LearningStateType = {
      learningSection: null,
      learningSectionIndex: 0,
      learningCourse: null
    };
    if (!learningTrackDetail || !learningTrackDetail.enrolled) return state;
    const sections = learningTrackDetail.sections;
    state.learningSection = sections[0];
    state.learningCourse = state.learningSection.courses[0];
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const course = section.courses.find((course) => (!!course.progress && course.progress < 1) || !course.progress);
      if (course) {
        state.learningCourse = course;
        state.learningSection = section;
        state.learningSectionIndex = i;
        break;
      }
    }
    return state;
  }, [learningTrackDetail]);

  return {
    learningSection,
    learningCourse,
    learningSectionIndex
  };
};
