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
      <div className="w-full h-full flex flex-col font-next-book px-[40px] bg-[#f4f4f4]">
        <MiniCoursePage
          lessonId={lessonId as string}
          courseType={CourseType.MINI}
        ></MiniCoursePage>
      </div>
    </>
  );
};

export default MiniLessonPage;
