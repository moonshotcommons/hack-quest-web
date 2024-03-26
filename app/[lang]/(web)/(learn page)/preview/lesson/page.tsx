'use client';
import type { NextPage } from 'next';
import PreviewLesson from '@/components/Web/PreviewLessonPage';

interface PreviewLessonPageProps {
  searchParams: {
    previewUrl: string;
  };
}

const PreviewLessonPage: NextPage<PreviewLessonPageProps> = ({
  searchParams
}) => {
  return (
    <>
      <div className="flex h-full w-full flex-col ">
        <PreviewLesson previewUrl={searchParams.previewUrl}></PreviewLesson>
      </div>
    </>
  );
};

export default PreviewLessonPage;
