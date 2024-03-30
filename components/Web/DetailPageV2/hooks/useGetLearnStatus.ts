import { CourseDetailType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { useMemo } from 'react';

export enum LearningStatus {
  IN_PROGRESS = 'in_progress',
  UN_START = 'UN_START',
  COMPLETED = 'completed'
}

export const useGetCourseLearnStatus = (courseDetail: CourseDetailType) => {
  const learningStatus = useMemo(() => {
    if (courseDetail) {
      if ((!!courseDetail.progress && courseDetail.progress <= 0) || !courseDetail.progress)
        return LearningStatus.UN_START;
      if (courseDetail.progress >= 1) return LearningStatus.COMPLETED;
    }
    return LearningStatus.IN_PROGRESS;
  }, [courseDetail]);

  return learningStatus;
};

export const useGetLearningTrackLearnStatus = (learningTrackDetail: LearningTrackDetailType) => {
  const learningStatus = useMemo(() => {
    if (learningTrackDetail) {
      let progress = learningTrackDetail.progress || 0;
      if (!learningTrackDetail.enrolled) return LearningStatus.UN_START;
      if (progress >= 1) return LearningStatus.COMPLETED;
    }
    return LearningStatus.IN_PROGRESS;
  }, [learningTrackDetail]);

  return learningStatus;
};
