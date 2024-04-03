'use client';
import { CourseType } from '@/service/webApi/course/type';
import type { NextPage } from 'next';

import LessonPage from '@/components/Web/LessonPage';
import { useParams } from 'next/navigation';

interface IProps {}

const GuidedProjectLessonPage: NextPage<IProps> = (props) => {
  const { lessonId } = useParams();

  return (
    <>
      <div className="flex h-full w-full flex-col ">
        <LessonPage lessonId={lessonId as string} courseType={CourseType.SYNTAX}></LessonPage>
      </div>
    </>
  );
};

export default GuidedProjectLessonPage;
