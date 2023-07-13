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
                courseType={CourseType.SYNTAX}
              ></LessonPageA>
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
          lesson={lesson}
          courseType={CourseType.SYNTAX}
        ></LessonHeader>
        {LessonPage}
      </div>
    </>
  );
};

export default SyntaxUnit;
