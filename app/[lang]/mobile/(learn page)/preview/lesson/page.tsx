'use client';
import type { NextPage } from 'next';
import PreviewLesson from '@/components/Web/PreviewLessonPage';

interface IProps {}

const PreviewLessonPage: NextPage<IProps> = (props) => {
  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const previewUrl = query.get('previewUrl');

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <PreviewLesson previewUrl={previewUrl as string}></PreviewLesson>
      </div>
    </>
  );
};

export default PreviewLessonPage;
