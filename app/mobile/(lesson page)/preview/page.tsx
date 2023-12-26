import PreviewWorkspace from '@/components/v2/PreviewLessonPage/PreviewWorkspace';
import type { NextPage } from 'next';

interface IProps {}

const PreviewPage: NextPage<IProps> = (props) => {
  return (
    <>
      <div className="w-full h-[calc(100vh-80px)] flex flex-col gap-4 font-next-book-Thin text-text-default-color px-10 py-10">
        <PreviewWorkspace></PreviewWorkspace>
      </div>
    </>
  );
};

export default PreviewPage;
