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
      <div className="flex h-full w-full flex-col ">
        <MobLessonPage
          lessonId={lessonId as string}
          courseType={CourseType.GUIDED_PROJECT}
        ></MobLessonPage>
      </div>
    </>
  );
};

export default GuidedProjectLessonPage;
