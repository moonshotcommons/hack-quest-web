import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import PreviewLesson from '@/components/v2/PreviewLessonPage';

interface IProps {}

const PreviewLessonPage: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { previewUrl } = router.query;

  return (
    <>
      <div className="w-full h-full flex flex-col font-next-book-Thin">
        <PreviewLesson previewUrl={previewUrl as string}></PreviewLesson>
      </div>
    </>
  );
};

export default PreviewLessonPage;
