'use client';
import { FC, ReactNode, useEffect, useState } from 'react';
import UgcProvider from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/components/UgcProvider';
import { useGetPageInfo } from '@/hooks/dom/useGetPageInfo';
import { MOBILE_NAVBAR_HEIGHT } from '@/components/Mobile/MobLayout/BasePage/Navbar/constant';

interface UgcContainerProps {
  children: ReactNode;
}

const UgcContainer: FC<UgcContainerProps> = ({ children }) => {
  const pageInfo = useGetPageInfo();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <UgcProvider>
      <div
        className="flex w-full flex-col"
        style={{
          height: isMounted ? `${pageInfo.windowHeight - MOBILE_NAVBAR_HEIGHT}px` : 'calc(100vh-64px)'
        }}
      >
        {children}
      </div>
    </UgcProvider>
  );
};

export default UgcContainer;
