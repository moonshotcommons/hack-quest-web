'use client';
import { LearningStateType, useLearningTrackLearningInfo } from '@/hooks/courses/useLearningTrackLearningInfo';
import webApi from '@/service';
import { CertificationType } from '@/service/webApi/campaigns/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { useRequest } from 'ahooks';
import { FC, ReactNode, SetStateAction, createContext, useMemo, useState, Dispatch } from 'react';

interface LearningTrackDetailProviderProps {
  learningTrackDetail: LearningTrackDetailType;
  children: ReactNode;
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

  const { learningCourse, learningSection, learningSectionIndex } = useLearningTrackLearningInfo(learningTrackDetail);

  const [expandList, setExpandList] = useState<number[]>([]);

  const expandAll = useMemo(() => {
    return expandList.length === learningTrackDetail?.sections.length;
  }, [expandList, learningTrackDetail?.sections.length]);

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
