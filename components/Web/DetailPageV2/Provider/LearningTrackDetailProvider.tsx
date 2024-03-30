'use client';
import webApi from '@/service';
import { CertificationType } from '@/service/webApi/campaigns/type';
import { ProjectCourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { LearningTrackDetailType, SectionType } from '@/service/webApi/learningTrack/type';
import { useRequest } from 'ahooks';
import { FC, ReactNode, SetStateAction, createContext, useMemo, useState, Dispatch } from 'react';

interface LearningTrackDetailProviderProps {
  learningTrackDetail: LearningTrackDetailType;
  children: ReactNode;
}

interface LearningStateType {
  learningSection: SectionType | null;
  learningSectionIndex: number;
  learningCourse: ProjectCourseType | ElectiveCourseType | null;
}

interface LearningTrackDetailContextType {
  learningTrackDetail: LearningTrackDetailType | null;
  refreshLearningTrackDetail: VoidFunction;
  expandList: number[];
  setExpandList: Dispatch<SetStateAction<number[]>>;
  expandAll: boolean;
  certification: CertificationType | null;
}

export const LearningTrackDetailContext = createContext<LearningTrackDetailContextType & LearningStateType>({
  learningTrackDetail: null,
  expandList: [],
  setExpandList: () => {},
  expandAll: false,
  learningSection: null,
  learningSectionIndex: 0,
  learningCourse: null,
  certification: null,
  refreshLearningTrackDetail: () => {}
});

const LearningTrackDetailProvider: FC<LearningTrackDetailProviderProps> = ({
  learningTrackDetail: propTrackDetail,
  children
}) => {
  const { data, refresh } = useRequest(() => {
    return webApi.learningTrackApi.getLearningTrackDetailAndCourses(propTrackDetail.id);
  });

  const learningTrackDetail = (data as LearningTrackDetailType) ?? propTrackDetail;

  const { data: certification } = useRequest(() => {
    return webApi.campaignsApi.getCertificationDetail(learningTrackDetail.certificationId!);
  });

  const [expandList, setExpandList] = useState<number[]>([]);

  const expandAll = useMemo(() => {
    return expandList.length === learningTrackDetail?.sections.length;
  }, [expandList, learningTrackDetail?.sections.length]);

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

  return (
    <LearningTrackDetailContext.Provider
      value={{
        learningTrackDetail,
        expandList,
        expandAll,
        setExpandList,
        learningCourse,
        learningSection,
        learningSectionIndex,
        certification: certification || null,
        refreshLearningTrackDetail: refresh
      }}
    >
      {children}
    </LearningTrackDetailContext.Provider>
  );
};

export default LearningTrackDetailProvider;
