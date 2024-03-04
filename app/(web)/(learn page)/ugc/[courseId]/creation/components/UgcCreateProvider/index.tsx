'use client';
import { FC, ReactNode, createContext, useEffect } from 'react';

import emitter from '@/store/emitter';
import { LearnPageType, useCourseStore } from '@/store/zustand/courseStore';
interface UgcProviderProps {
  children: ReactNode;
  courseId: string;
}

export interface UgcCreateContextType {
  courseId: string;
}
export const UgcCreateContext = createContext<UgcCreateContextType>({
  courseId: '-1'
});

const UgcProvider: FC<UgcProviderProps> = ({ children, courseId }) => {
  const setLearnPageTitle = useCourseStore((state) => state.setPageType);
  useEffect(() => {
    setLearnPageTitle(LearnPageType.UGC_CREATE);
    return () => {
      setLearnPageTitle(null);
    };
  }, []);

  useEffect(() => {
    return () => {
      emitter.all.clear();
    };
  }, []);

  return (
    <UgcCreateContext.Provider
      value={{
        courseId
      }}
    >
      {/* <RendererContext.Provider
        value={{
          textRenderer: {
            textStyle: 'body-l text-neutral-black',
            codeStyle:
              'code-l text-code-red bg-neutral-off-white py-[2px] px-[7px]'
          }
        }}
      >
   
      </RendererContext.Provider> */}
      {children}
    </UgcCreateContext.Provider>
  );
};

export default UgcProvider;
