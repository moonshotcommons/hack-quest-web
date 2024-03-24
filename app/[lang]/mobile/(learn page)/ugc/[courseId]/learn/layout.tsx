'use client';
import { FC, ReactNode } from 'react';
import UgcSidebar from './components/UgcSidebar';
import UgcProvider from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/components/UgcProvider';
import UgcFooter from './components/UgcFooter';
import useGetHeight from '@/hooks/dom/useGetHeight';

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
      {/* <div
        className="flex h-[calc(100vh-64px)] w-full flex-col"
        style={{
          height: `${info.windowHeight - MOBILE_NAVBAR_HEIGHT}px`
        }}
      >

      </div> */}
    </UgcProvider>
  );
};

export default LearnLayout;
