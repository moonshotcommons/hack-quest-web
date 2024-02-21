'use client';
import webApi from '@/service';
import { CourseDetailType } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { FC, ReactNode, createContext } from 'react';

interface PracticeDetailProviderProps {
  courseId: string;
  children: ReactNode;
}

export const PracticeDetailContext = createContext<{
  courseDetail: CourseDetailType | null;
  refreshLearningTrackDetail: VoidFunction;
}>({
  courseDetail: null,
  refreshLearningTrackDetail: () => {}
});

const PracticeDetailProvider: FC<PracticeDetailProviderProps> = ({
  courseId,
  children
}) => {
  const { data, refresh } = useRequest(() => {
    return webApi.courseApi.getCourseDetail(courseId, true);
  });

  return (
    <PracticeDetailContext.Provider
      value={{
        courseDetail: data as CourseDetailType,
        refreshLearningTrackDetail: refresh
      }}
    >
      {children}
    </PracticeDetailContext.Provider>
  );
};

export default PracticeDetailProvider;
