'use client';
import { FC, ReactNode } from 'react';
import UgcCreateProvider from './components/UgcCreateProvider';
import UgcSidebar from './components/UgcSidebar';
import Loading from '@/components/Common/Loading';
import {
  CreationPageKey,
  useUgcCreationStore
} from '@/store/zustand/ugcCreationStore';
import { useShallow } from 'zustand/react/shallow';
import UgcUnitSidebar from './components/UgcUnitSidebar';
import { SuggestText } from './[lessonId]/components/ChooseLesson';

interface LearnLayoutProps {
  children: ReactNode;
  params: {
    courseId: string;
  };
}

const LearnLayout: FC<LearnLayoutProps> = ({ params, children }) => {
  const { loading, selectLessonId } = useUgcCreationStore(
    useShallow((state) => ({
      loading: state.loading,
      selectLessonId: state.selectLessonId
    }))
  );
  return (
    <UgcCreateProvider courseId={params.courseId}>
      <div className="flex h-full w-full">
        <UgcSidebar />
        <UgcUnitSidebar />
        <div className="scroll-wrap-y relative h-full flex-1 overflow-x-hidden py-[40px] text-center">
          <Loading loading={loading}>
            <div className="inline-block max-w-[808px] text-left">
              {children}
            </div>
          </Loading>
          {selectLessonId === CreationPageKey.ChooseLesson && <SuggestText />}
        </div>
      </div>
    </UgcCreateProvider>
  );
};

export default LearnLayout;
