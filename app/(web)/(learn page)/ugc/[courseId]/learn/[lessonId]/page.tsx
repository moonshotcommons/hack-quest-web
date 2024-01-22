'use client';
import { FC } from 'react';
import Ugc from './components';
import { useParams } from 'next/navigation';

interface UgcPageProps {
  params: { lessonId: string; courseId: string };
}

const UgcPage: FC<UgcPageProps> = () => {
  const { lessonId } = useParams();

  return (
    <>
      <Ugc lessonId={lessonId as string} />
    </>
  );
};

export default UgcPage;
