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

interface IProps {}

const SyntaxUnit: NextPage<IProps> = (props) => {
  const [lesson, setLesson] = useState<any>(null);
  const router = useRouter();
  const { lessonId } = router.query;
  useEffect(() => {
    webApi.courseApi
      .getLessonContent(lessonId as string)
      .then((res) => {
        setLesson(res);
      })
      .catch((error) => {
        if (error.code === 401) {
          router.push('/login');
        } else {
          router.push('/404');
        }
      });
  }, [lessonId, router]);

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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async (context) => {
      const { lessonId } = context.query;

      // let lesson = null;
      // try {
      //   lesson = await webApi.courseApi.getLessonContent(lessonId as string);
      //   // console.log(lesson);
      // } catch (e: any) {
      //   // message.error(`Course detail ${e.message}`);
      //   console.log(e);
      //   lesson = {};
      // }
      return {
        props: {
          // lesson: lesson
        }
      };
    };
  });

export default SyntaxUnit;
