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
        <div className="scroll-wrap-y relative h-full w-full py-[40px] text-center">
          <div className="inline-block w-[808px] text-left">{children}</div>
        </div>
      </div>
    </UgcCreateProvider>
  );
};

export default LearnLayout;
