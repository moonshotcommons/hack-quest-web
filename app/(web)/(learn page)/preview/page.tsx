import PreviewWorkspace from '@/components/Web/PreviewLessonPage/PreviewWorkspace';
import type { NextPage } from 'next';

interface IProps {}

const PreviewPage: NextPage<IProps> = (props) => {
  return (
    <>
      <div className="flex h-[calc(100vh-80px)] w-full flex-col gap-4 px-10 py-10  text-text-default-color">
        <PreviewWorkspace></PreviewWorkspace>
      </div>
    </>
  );
};

export default PreviewPage;
