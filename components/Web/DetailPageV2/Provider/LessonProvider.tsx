'use client';
import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import {
  ElectiveCourseDetailType,
  PageType
} from '@/service/webApi/elective/type';
import { CourseDetailContext } from '@/components/Web/DetailPageV2/Provider/CourseDetailProvider';

interface LessonProviderProps {
  lesson: PageType;
  children: ReactNode;
  courseDetail: ElectiveCourseDetailType;
}

export const LessonContext = createContext<{
  lesson: PageType | null;
}>({
  lesson: null
});

const LessonProvider: FC<LessonProviderProps> = ({
  courseDetail: propCourseDetail,
  lesson: propLesson,
  children
}) => {
  const { courseDetail: contextCourseDetail } = useContext(CourseDetailContext);

  const courseDetail = (contextCourseDetail ??
    propCourseDetail) as ElectiveCourseDetailType;

  // const lessons = useMemo(() => {
  //   let list: PageType[][] = [];
  //   courseDetail!.units?.forEach((unit) => {
  //     list.push(unit.pages!);
  //   });
  //   const newList = list.flat();
  //   return newList;
  // }, [courseDetail]);

  const lesson = useMemo(() => {
    if (courseDetail.pages?.length) {
      return (
        courseDetail.pages.find((l) => l.id === propLesson.id) || propLesson
      );
    }
    return propLesson;
  }, [propLesson, courseDetail]);

  return (
    <LessonContext.Provider value={{ lesson }}>
      {children}
    </LessonContext.Provider>
  );
};

export default LessonProvider;
