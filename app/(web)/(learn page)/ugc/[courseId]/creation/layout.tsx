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
        <div className="flex h-full flex-1 justify-center overflow-auto py-[40px]">
          <div className="w-[808px]">{children}</div>
        </div>
      </div>
    </UgcCreateProvider>
  );
};

export default LearnLayout;
