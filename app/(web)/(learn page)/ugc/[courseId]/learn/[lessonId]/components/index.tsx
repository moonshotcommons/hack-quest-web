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
      console.log('重新设置lesson');
    }
  }, [lesson]);

  if (!lesson) return null;

  return (
    <div className="flex-1 bg-neutral-white flex justify-center relative">
      <UgcNavbar />
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="flex-1 mt-[5.125rem] overflow-auto flex justify-center scroll-wrap-y">
          <Loading loading={loading}>
            <LessonContainer lesson={lesson}></LessonContainer>
          </Loading>
        </div>
      </div>
    </div>
  );
};

export default Ugc;
