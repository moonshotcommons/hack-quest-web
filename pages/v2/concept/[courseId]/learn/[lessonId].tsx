// ./pages/article/[articleId].tsx

import webApi from '@/service';
import {
  CourseLessonType,
  CourseType,
  LessonStyleType
} from '@/service/webApi/course/type';
import wrapper from '@/store/redux';

import type { GetServerSideProps, NextPage } from 'next';

import LessonHeader from '@/components/LessonPages/LessonHeader';
import LessonPageA from '@/components/LessonPages/LessonPageA';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetLessonContent } from '@/hooks/useCoursesHooks/useGetLessenContent';
import LessonPageE from '@/components/LessonPages/LessonPageE';
import LessonPageB from '@/components/LessonPages/LessonPageB';
import LessonPageD from '@/components/LessonPages/LessonPageD';

interface IProps {}

const SyntaxUnit: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { lessonId } = router.query;
  const { lesson } = useGetLessonContent(lessonId as string);

  const LessonPage = useMemo(() => {
    if (lesson) {
      switch (lesson.style) {
        case LessonStyleType.A:
          return (
            <>
              <LessonPageA
                lesson={lesson}
                courseType={CourseType.CONCEPT}
              ></LessonPageA>
            </>
          );
        case LessonStyleType.B:
          return (
            <LessonPageB
              lesson={lesson}
              courseType={CourseType.CONCEPT}
            ></LessonPageB>
          );
        case LessonStyleType.C:
        case LessonStyleType.D:
          return (
            <LessonPageD
              lesson={lesson}
              courseType={CourseType.CONCEPT}
            ></LessonPageD>
          );
        case LessonStyleType.E:
          return (
            <>
              <LessonPageE
                lesson={lesson}
                courseType={CourseType.CONCEPT}
              ></LessonPageE>
            </>
          );
        default:
          return <></>;
      }
    }
  }, [lesson]);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <LessonHeader
          isBetween={true}
          lesson={lesson as CourseLessonType}
          courseType={CourseType.CONCEPT}
        ></LessonHeader>
        {LessonPage}
      </div>
    </>
  );
};

export default SyntaxUnit;
