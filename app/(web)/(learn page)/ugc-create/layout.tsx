'use client';
import { FC, ReactNode, useEffect } from 'react';
import UgcCreateProvider from './components/UgcCreateProvider';
import UgcSidebar from './components/UgcSidebar';
import { LearnPageType, useCourseStore } from '@/store/zustand/courseStore';

interface LearnLayoutProps {
  children: ReactNode;
}

const LearnLayout: FC<LearnLayoutProps> = ({ children }) => {
  const setLearnPageTitle = useCourseStore((state) => state.setPageType);
  useEffect(() => {
    setLearnPageTitle(LearnPageType.UGC_CREATE);
    return () => {
      setLearnPageTitle(null);
    };
  }, []);
  return (
    <UgcCreateProvider>
      <div className="flex h-full w-full">
        <UgcSidebar />
        <div className="flex h-full flex-1 justify-center overflow-auto py-[40px]">
          <div className="w-[808px]">{children}</div>
        </div>
      </div>
    </UgcCreateProvider>
  );
};

export default LearnLayout;
