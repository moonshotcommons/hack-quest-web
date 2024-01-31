'use client';
import React, { useEffect } from 'react';
import LessonContainer from './LessonContainer';
import UgcNavbar from './UgcNavbar';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { useLearnStore } from '@/store/zustand/learnStore';
import { CourseType } from '@/service/webApi/course/type';
import Loading from '@/components/Common/Loading';

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
    <div className="relative flex flex-1 justify-center bg-neutral-white">
      <UgcNavbar />
      <div className="flex h-full w-full flex-col overflow-hidden">
        <div className="scroll-wrap-y mt-[5.125rem] flex flex-1 justify-center overflow-auto">
          <Loading loading={loading}>
            <LessonContainer lesson={lesson}></LessonContainer>
          </Loading>
        </div>
      </div>
    </div>
  );
};

export default Ugc;
