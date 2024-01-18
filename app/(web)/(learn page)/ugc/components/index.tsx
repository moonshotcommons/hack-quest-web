import React from 'react';
import UgcFooter from './UgcFooter';
import UgcProvider from './UgcProvider';
import UgcSidebar from './UgcSidebar';
import LessonContainer from './LessonContainer';
import { mockData, mockLessonReadingData } from './UgcSidebar/constant';
import { UGCCourseType } from '@/service/webApi/course/type';
import UgcNavbar from './UgcNavbar';

interface UgcProp {}

const Ugc: React.FC<UgcProp> = () => {
  return (
    <UgcProvider>
      <div className="h-full flex flex-col">
        <div className="w-full flex-1 flex overflow-hidden">
          <UgcSidebar course={mockData as UGCCourseType} />
          <div className="flex-1 bg-neutral-white flex justify-center relative">
            <UgcNavbar />
            <div className="w-[50.5rem] h-full flex flex-col">
              <div className="flex-1 overflow-hidden pt-[5.125rem]">
                <LessonContainer
                  lesson={mockLessonReadingData}
                ></LessonContainer>
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
