import { FC, ReactNode } from 'react';
import UgcCreateProvider from './components/UgcCreateProvider';
import UgcSidebar from './components/UgcSidebar';

interface LearnLayoutProps {
  children: ReactNode;
  params: {
    courseId: string;
  };
}

const LearnLayout: FC<LearnLayoutProps> = ({ params, children }) => {
  return (
    <UgcCreateProvider courseId={params.courseId}>
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
