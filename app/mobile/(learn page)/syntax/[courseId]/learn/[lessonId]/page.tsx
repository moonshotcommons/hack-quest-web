'use client';
import { CourseType } from '@/service/webApi/course/type';
import MobLessonPage from '@/components/Mobile/MobLessonPage';
import type { NextPage } from 'next';

import { useParams } from 'next/navigation';

interface IProps {}

const GuidedProjectLessonPage: NextPage<IProps> = (props) => {
  const { lessonId } = useParams();

  return (
    <>
      <div className="w-full h-full flex flex-col font-next-book-Thin">
        <MobLessonPage
          lessonId={lessonId as string}
          courseType={CourseType.SYNTAX}
        ></MobLessonPage>
      </div>
    </>
  );
};

export default GuidedProjectLessonPage;
