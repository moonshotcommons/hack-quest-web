'use client';
import React, { useState } from 'react';
import UgcFooter from './UgcFooter';
import UgcProvider from './UgcProvider';
import LessonContainer from './LessonContainer';
import UgcNavbar from './UgcNavbar';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import UgcProgress from './UgcProgress';

interface UgcProp {
  lessonId: string;
}

const Ugc: React.FC<UgcProp> = ({ lessonId }) => {
  const [lesson, setLesson] = useState<any>();

  useRequest(
    () => {
      return webApi.courseApi.getLessonContent(lessonId);
    },
    {
      onSuccess(res: unknown) {
        setLesson(res as any);
      }
    }
  );

  if (!lesson) return null;

  return (
    <UgcProvider lesson={lesson}>
      <div className="h-full flex flex-col gap-[.9375rem]">
        <UgcProgress />
        <div className="flex-1 flex flex-col  relative">
          <UgcNavbar />
          <div className="w-full flex-1 mt-[1.875rem] overflow-hidden">
            <div className="absolute w-full h-full left-0 top-0 overflow-auto scroll-wrap-y px-[1.375rem] pb-[4.875rem]">
              <LessonContainer lesson={lesson}></LessonContainer>
            </div>
          </div>
          <UgcFooter />
        </div>
      </div>
      {/* <UgcSidebar lesson={lesson} /> */}
    </UgcProvider>
  );
};

export default Ugc;
