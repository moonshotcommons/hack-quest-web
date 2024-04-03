'use client';
import type { NextPage } from 'next';

import MiniCoursePage from '@/components/Web/MiniCoursePage';
import { CourseType } from '@/service/webApi/course/type';
import { useParams } from 'next/navigation';
interface IProps {}

const MiniLessonPage: NextPage<IProps> = (props) => {
  const { lessonId } = useParams();
  if (!lessonId) {
    return null;
  }

  return (
    <>
      <div className="flex h-full w-full flex-col bg-neutral-off-white px-[40px] ">
        <MiniCoursePage lessonId={lessonId as string} courseType={CourseType.MINI}></MiniCoursePage>
      </div>
    </>
  );
};

export default MiniLessonPage;
