'use client';
import webApi from '@/service';
import { CourseBaseType } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { FC, ReactNode, createContext } from 'react';

interface CourseDetailProviderProps {
  courseId: string;
  children: ReactNode;
  includeUnits?: boolean;
  includePages?: boolean;
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
  children,
  includeUnits = false,
  includePages = false
}) => {
  const { data, refresh } = useRequest(() => {
    return webApi.courseApi.getCourseDetail(courseId, includeUnits, includePages);
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
