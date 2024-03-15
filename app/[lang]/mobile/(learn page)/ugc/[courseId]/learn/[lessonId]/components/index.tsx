'use client';
import React, { useEffect } from 'react';
import LessonContainer from './LessonContainer';
import UgcNavbar from './UgcNavbar';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { useLearnStore } from '@/store/zustand/learnStore';
import { CourseType } from '@/service/webApi/course/type';
import UgcProgress from './UgcProgress';

interface UgcProp {
  lessonId: string;
}

const Ugc: React.FC<UgcProp> = ({ lessonId }) => {
  const setLearnLesson = useLearnStore((state) => state.setLearnLesson);
  const { data: lesson, loading } = useRequest(() => {
    return webApi.courseApi.getLessonContentMob(lessonId);
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
    <div className="flex h-full w-full flex-col gap-[.9375rem]">
      <UgcProgress />
      <div className="flex flex-1 flex-col ">
        <UgcNavbar />
        <div className="relative mt-[1.875rem] w-full flex-1 overflow-hidden">
          <div className="scroll-wrap-y absolute left-0 top-0 h-full w-full overflow-auto px-[1.375rem] pb-[4.875rem]">
            <LessonContainer lesson={lesson}></LessonContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ugc;
