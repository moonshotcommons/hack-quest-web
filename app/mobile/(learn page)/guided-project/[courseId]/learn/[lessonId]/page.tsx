'use client';
import MobLessonPage from '@/components/Mobile/MobLessonPage';
import { CourseType } from '@/service/webApi/course/type';
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
          courseType={CourseType.GUIDED_PROJECT}
        ></MobLessonPage>
      </div>
    </>
  );
};

export default GuidedProjectLessonPage;
