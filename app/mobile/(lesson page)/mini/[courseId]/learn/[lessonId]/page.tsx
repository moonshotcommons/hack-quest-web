'use client';
import type { NextPage } from 'next';

import MiniCoursePage from './MiniCoursePage';
import { CourseType } from '@/service/webApi/course/type';
import { useParams } from 'next/navigation';
import MiniElectiveCompletedModal, {
  MiniElectiveCompletedModalRef
} from './MiniElectiveCompletedModal';
import { useRef } from 'react';
interface IProps {}

const MiniLessonPage: NextPage<IProps> = (props) => {
  const { lessonId } = useParams();
  const miniElectiveCompletedModalInstance =
    useRef<MiniElectiveCompletedModalRef>(null);
  const completed = () => {
    miniElectiveCompletedModalInstance.current?.open({});
  };
  if (!lessonId) {
    return null;
  }

  return (
    <>
      <div className="w-full h-full flex flex-col font-next-book p-[24px] bg-[#fff] relative">
        <MiniCoursePage
          lessonId={lessonId as string}
          courseType={CourseType.MINI}
          completed={completed}
        ></MiniCoursePage>
        <MiniElectiveCompletedModal
          ref={miniElectiveCompletedModalInstance}
        ></MiniElectiveCompletedModal>
      </div>
    </>
  );
};

export default MiniLessonPage;
