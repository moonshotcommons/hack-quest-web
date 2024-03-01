'use client';
import { FC, ReactNode } from 'react';
import UgcSidebar from './components/UgcSidebar';
import UgcProvider from '@/app/(web)/(learn page)/ugc/[courseId]/learn/components/UgcProvider';
import UgcFooter from './components/UgcFooter';
import useGetHeight from '@/hooks/useGetHeight';

interface LearnLayoutProps {
  children: ReactNode;
}

const LearnLayout: FC<LearnLayoutProps> = ({ children }) => {
  const { pageHeight } = useGetHeight();
  return (
    <UgcProvider>
      <div
        className="flex  w-full flex-col"
        style={{
          height: pageHeight
        }}
      >
        <div className="relative flex w-full flex-1 overflow-hidden">
          <UgcSidebar />
          {children}
        </div>
        <UgcFooter />
      </div>
    </UgcProvider>
  );
};

export default LearnLayout;
