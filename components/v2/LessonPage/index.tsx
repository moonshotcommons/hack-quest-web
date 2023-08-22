'use client';
import { FC, ReactNode, useEffect, useState } from 'react';
import Split from 'react-split';
import { useRequest } from 'ahooks';
import { LessonContent as LessonContentType } from './type';
import LessonContent from './LessonContent';
import Playground from './Playground';
import LessonFooter from './LessonFooter';
import { useDispatch } from 'react-redux';
import {
  CompleteStateType,
  CourseLessonType,
  CourseType,
  UnitPagesListType
} from '@/service/webApi/course/type';
import webApi from '@/service';
import { setUnitsLessonsList } from '@/store/redux/modules/course';
import { useGetLessonContent } from '@/hooks/useCoursesHooks/useGetLessenContent';

interface LessonPageProps {
  lessonId: string;
  courseType: CourseType;
}

const LessonPage: FC<LessonPageProps> = (props) => {
  const { lessonId } = props;
  const { lesson } = useGetLessonContent(lessonId);
  const [tempLesson, setTempLesson] = useState<
    Omit<CourseLessonType, 'content'> & { content: LessonContentType }
  >();

  useEffect(() => {
    if (lesson) {
      fetch('/api/pages/temp-lesson')
        .then((res) => res.json())
        .then((res) => {
          setTempLesson({ ...lesson, content: res });
        });
    }
  }, [lesson]);

  if (!lesson || !tempLesson) return null;

  return (
    <div className="relative w-full h-full">
      <Split
        className="flex-1 w-full h-full flex justify-between [&>div]:w-[50%] [&>.gutter]:border-x [&>.gutter]:cursor-col-resize"
        minSize={80}
        cursor="col-resize"
      >
        <LessonContent lesson={tempLesson!}></LessonContent>
        <Playground lesson={tempLesson!}></Playground>
      </Split>
      <LessonFooter lesson={lesson} />
    </div>
  );
};

export default LessonPage;
