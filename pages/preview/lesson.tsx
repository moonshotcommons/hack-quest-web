import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import PreviewLessonPage from '@/components/v2/PreviewLessonPage';

interface IProps {}

const SyntaxUnit: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { previewUrl } = router.query;

  return (
    <>
      <div className="w-full min-h-[calc(100vh-80px)] flex flex-col font-next-book-Thin">
        <PreviewLessonPage
          previewUrl={previewUrl as string}
        ></PreviewLessonPage>
      </div>
    </>
  );
};

export default SyntaxUnit;
