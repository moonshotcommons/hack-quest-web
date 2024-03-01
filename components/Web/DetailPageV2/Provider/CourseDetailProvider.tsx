'use client';
import webApi from '@/service';
import { CourseBaseType } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { FC, ReactNode, createContext } from 'react';

interface CourseDetailProviderProps {
  courseId: string;
  children: ReactNode;
}

export const CourseDetailContext = createContext<{
  courseDetail: CourseBaseType | null;
  refreshLearningTrackDetail: VoidFunction;
}>({
  courseDetail: null,
  refreshLearningTrackDetail: () => {}
});

const CourseDetailProvider: FC<CourseDetailProviderProps> = ({
  courseId,
  children
}) => {
  const { data, refresh } = useRequest(() => {
    return webApi.courseApi.getCourseDetail(courseId, true);
  });

  return (
    <CourseDetailContext.Provider
      value={{
        courseDetail: data as CourseBaseType,
        refreshLearningTrackDetail: refresh
      }}
    >
      {children}
    </CourseDetailContext.Provider>
  );
};

export default CourseDetailProvider;
