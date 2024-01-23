'use client';
import React, { useEffect } from 'react';
import UgcFooter from './UgcFooter';
import LessonContainer from './LessonContainer';
import UgcNavbar from './UgcNavbar';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import UgcProgress from './UgcProgress';
import { useLearnStore } from '@/store/zustand/learnStore';
import { CourseType } from '@/service/webApi/course/type';

interface UgcProp {
  lessonId: string;
}

const Ugc: React.FC<UgcProp> = ({ lessonId }) => {
  const setLearnLesson = useLearnStore((state) => state.setLearnLesson);
  const { data: lesson, loading } = useRequest(() => {
    return webApi.courseApi.getLessonContent(lessonId);
  });

  useEffect(() => {
    if (lesson) {
      setLearnLesson({
        courseType: CourseType.UGC,
        lesson: lesson
      });
    }
  }, [lesson]);

  if (!lesson) return null;

  return (
    <div className="h-full flex flex-col gap-[.9375rem] w-full">
      <UgcProgress />
      <div className="flex-1 flex flex-col ">
        <UgcNavbar />
        <div className="w-full flex-1 mt-[1.875rem] overflow-hidden relative">
          <div className="absolute w-full h-full left-0 top-0 overflow-auto scroll-wrap-y px-[1.375rem] pb-[4.875rem]">
            <LessonContainer lesson={lesson}></LessonContainer>
          </div>
        </div>
        <UgcFooter />
      </div>
    </div>
  );
};

export default Ugc;
