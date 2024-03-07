'use client';
import { FC, ReactNode } from 'react';
import UgcCreateProvider from './components/UgcCreateProvider';
import UgcSidebar from './components/UgcSidebar';
import Loading from '@/components/Common/Loading';
import { useUgcCreationStore } from '@/store/zustand/ugcCreationStore';
import { useShallow } from 'zustand/react/shallow';

interface LearnLayoutProps {
  children: ReactNode;
  params: {
    courseId: string;
  };
}

const LearnLayout: FC<LearnLayoutProps> = ({ params, children }) => {
  const { loading } = useUgcCreationStore(
    useShallow((state) => ({
      loading: state.loading
    }))
  );
  return (
    <UgcCreateProvider courseId={params.courseId}>
      <div className="flex h-full w-full">
        <UgcSidebar />
        <div className="scroll-wrap-y relative h-full w-full py-[40px] text-center">
          <Loading loading={loading}>
            <div className="inline-block w-[808px] text-left">{children}</div>
          </Loading>
        </div>
      </div>
    </UgcCreateProvider>
  );
};

export default LearnLayout;
