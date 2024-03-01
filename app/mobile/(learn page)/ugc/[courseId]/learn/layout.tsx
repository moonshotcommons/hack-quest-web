import { FC, ReactNode } from 'react';
import UgcSidebar from './components/UgcSidebar';
import UgcProvider from '@/app/(web)/(learn page)/ugc/[courseId]/learn/components/UgcProvider';
import UgcFooter from './components/UgcFooter';
import UgcContainer from './components/UgcContainer';

interface LearnLayoutProps {
  children: ReactNode;
}

const LearnLayout: FC<LearnLayoutProps> = ({ children }) => {
  // const boxHeight = useMemo(() => {
  //   console.info(pageInfo.windowHeight, '22222');
  //   return pageInfo.windowHeight - MOBILE_NAVBAR_HEIGHT;
  // }, [pageInfo]);

  return (
    <UgcProvider>
      <UgcContainer>
        <div className="relative flex w-full flex-1 overflow-hidden">
          <UgcSidebar />
          {children}
        </div>
        <UgcFooter />
      </UgcContainer>
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
