'use client';
import webApi from '@/service';
import { ElectiveCourseDetailType } from '@/service/webApi/elective/type';
import { useRequest } from 'ahooks';
import { FC, ReactNode, createContext } from 'react';

interface ElectiveDetailProviderProps {
  courseId: string;
  children: ReactNode;
}

export const ElectiveDetailContext = createContext<{
  courseDetail: ElectiveCourseDetailType | null;
  refreshLearningTrackDetail: VoidFunction;
}>({
  courseDetail: null,
  refreshLearningTrackDetail: () => {}
});

const ElectiveDetailProvider: FC<ElectiveDetailProviderProps> = ({ courseId, children }) => {
  const { data, refresh } = useRequest(() => {
    return webApi.courseApi.getCourseDetail(courseId, false, true);
  });

  return (
    <ElectiveDetailContext.Provider
      value={{
        courseDetail: data as ElectiveCourseDetailType,
        refreshLearningTrackDetail: refresh
      }}
    >
      {children}
    </ElectiveDetailContext.Provider>
  );
};

export default ElectiveDetailProvider;
