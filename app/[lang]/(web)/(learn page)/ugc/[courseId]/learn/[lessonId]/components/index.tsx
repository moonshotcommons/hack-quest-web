'use client';
import React, { useEffect } from 'react';
import LessonContainer from './LessonContainer';
import UgcNavbar from './UgcNavbar';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { useLearnStore } from '@/store/zustand/learnStore';
import { CourseType } from '@/service/webApi/course/type';
import Loading from '@/components/Common/Loading';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';

interface UgcProp {
  lessonId: string;
}

const Ugc: React.FC<UgcProp> = ({ lessonId }) => {
  const setLearnLesson = useLearnStore((state) => state.setLearnLesson);
  const { data: lesson, loading } = useRequest(() => {
    return webApi.courseApi.getLessonContent(lessonId);
  });

  const { updatePageId } = useUpdateHelperParams();

  useEffect(() => {
    if (lesson) {
      setLearnLesson({
        courseType: CourseType.UGC,
        lesson: lesson
      });
      updatePageId(lessonId);
    }
  }, [lesson]);

  if (!lesson) return null;

  return (
    <div className="relative flex-1 bg-neutral-white">
      <div className="scroll-wrap-y absolute left-0 top-0 h-full w-full">
        <UgcNavbar />
        <div className="mt-[30px] flex  justify-center">
          <Loading loading={loading}>
            <LessonContainer lesson={lesson}></LessonContainer>
          </Loading>
        </div>
      </div>
    </div>
  );
};

export default Ugc;
