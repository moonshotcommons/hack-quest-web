'use client';
import { FC, ReactNode, createContext, useEffect, useState } from 'react';

import emitter from '@/store/emitter';
import { LearnPageType, useCourseStore } from '@/store/zustand/courseStore';
interface UgcProviderProps {
  children: ReactNode;
  courseId: string;
}

export interface UgcCreateContextType {
  courseId: string;
  loading: boolean;
  setLoading: (val: boolean) => void;
}
export const UgcCreateContext = createContext<UgcCreateContextType>({
  courseId: '-1',
  loading: false,
  setLoading: () => {}
});

const UgcProvider: FC<UgcProviderProps> = ({ children, courseId }) => {
  const setLearnPageTitle = useCourseStore((state) => state.setPageType);
  const [loading, setLoading] = useState(false);
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
        courseId,
        loading,
        setLoading: (val: boolean) => setLoading(val)
      }}
    >
      {children}
    </UgcCreateContext.Provider>
  );
};

export default UgcProvider;
