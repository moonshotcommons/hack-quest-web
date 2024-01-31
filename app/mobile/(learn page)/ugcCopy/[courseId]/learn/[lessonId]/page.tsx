import { FC } from 'react';
import Ugc from './components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electives'
};

interface UgcPageProps {
  params: { lessonId: string; courseId: string };
}

const UgcPage: FC<UgcPageProps> = async ({ params }) => {
  const { lessonId } = params;

  return (
    <>
      <Ugc lessonId={lessonId} />
    </>
  );
};

export default UgcPage;
