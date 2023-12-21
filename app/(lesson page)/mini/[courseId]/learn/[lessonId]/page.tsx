'use client';
import type { NextPage } from 'next';

import MiniCoursePage from '@/components/v2/MiniCoursePage';
import { CourseType } from '@/service/webApi/course/type';
import useGetDevice from '@/hooks/useGetDevice';
import { useParams } from 'next/navigation';
interface IProps {}

const MiniLessonPage: NextPage<IProps> = (props) => {
  const { lessonId } = useParams();
  const isMobile = useGetDevice();
  if (!lessonId) {
    return null;
  }

  return (
    <>
      <div className="w-full h-full flex flex-col font-next-book px-[40px] bg-[#f4f4f4]">
        <MiniCoursePage
          lessonId={lessonId as string}
          courseType={CourseType.Mini}
        ></MiniCoursePage>
      </div>
    </>
  );
};

export default MiniLessonPage;
