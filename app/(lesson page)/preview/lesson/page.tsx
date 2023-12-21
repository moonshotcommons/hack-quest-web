'use client';
import type { NextPage } from 'next';
import PreviewLesson from '@/components/v2/PreviewLessonPage';
import { useSearchParams } from 'next/navigation';

interface IProps {}

const PreviewLessonPage: NextPage<IProps> = (props) => {
  const query = useSearchParams();
  const previewUrl = query.get('previewUrl');

  return (
    <>
      <div className="w-full h-full flex flex-col font-next-book-Thin">
        <PreviewLesson previewUrl={previewUrl as string}></PreviewLesson>
      </div>
    </>
  );
};

export default PreviewLessonPage;
