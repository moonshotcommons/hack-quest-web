'use client';
import React, { useState } from 'react';
import UgcFooter from './UgcFooter';
import UgcProvider from './UgcProvider';
import UgcSidebar from './UgcSidebar';
import LessonContainer from './LessonContainer';
import UgcNavbar from './UgcNavbar';
import { useRequest } from 'ahooks';
import webApi from '@/service';

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
      <div className="h-full flex flex-col">
        <div className="w-full flex-1 flex overflow-hidden">
          <UgcSidebar lesson={lesson} />
          <div className="flex-1 bg-neutral-white flex justify-center relative">
            <UgcNavbar />
            <div className="w-full h-full flex flex-col overflow-hidden">
              <div className="flex-1 mt-[5.125rem] overflow-auto flex justify-center scroll-wrap-y">
                <LessonContainer lesson={lesson}></LessonContainer>
              </div>
            </div>
          </div>
        </div>
        <UgcFooter />
      </div>
    </UgcProvider>
  );
};

export default Ugc;
