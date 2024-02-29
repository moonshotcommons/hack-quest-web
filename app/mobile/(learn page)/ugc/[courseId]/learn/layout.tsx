'use client';
import { FC, ReactNode, useMemo } from 'react';
import UgcSidebar from './components/UgcSidebar';
import UgcProvider from '@/app/(web)/(learn page)/ugc/[courseId]/learn/components/UgcProvider';
import UgcFooter from './components/UgcFooter';
import { useGetPageInfo } from '@/hooks/useGetPageInfo';
import { MOBILE_NAVBAR_HEIGHT } from '@/components/Mobile/MobLayout/BasePage/Navbar/constant';

interface LearnLayoutProps {
  children: ReactNode;
}

const LearnLayout: FC<LearnLayoutProps> = ({ children }) => {
  const pageInfo = useGetPageInfo();
  const boxHeight = useMemo(() => {
    return pageInfo.windowHeight - MOBILE_NAVBAR_HEIGHT;
  }, [pageInfo]);
  return (
    <UgcProvider>
      <div className="flex h-[calc(100vh-64px)] w-full flex-col">
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
