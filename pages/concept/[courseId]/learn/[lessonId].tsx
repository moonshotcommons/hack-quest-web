// ./pages/article/[articleId].tsx

import { CourseType, LessonStyleType } from '@/service/webApi/course/type';

import type { NextPage } from 'next';

import LessonHeader from '@/components/LessonPages/LessonHeader';
import LessonPageA from '@/components/LessonPages/LessonPageA';
import LessonPageB from '@/components/LessonPages/LessonPageB';
import LessonPageD from '@/components/LessonPages/LessonPageD';
import LessonPageE from '@/components/LessonPages/LessonPageE';
import { useGetLessonContent } from '@/hooks/useCoursesHooks/useGetLessenContent';
import { ConfigProvider, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

interface IProps {}

const ConceptUnit: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { lessonId } = router.query;

  const { lesson, loading } = useGetLessonContent(lessonId as string);

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
      <div className="w-full h-full flex flex-col ">
        <ConfigProvider
          theme={{
            components: {
              Spin: {
                contentHeight: 400
              }
            },
            token: {
              colorPrimary: '#ffd850'
            }
          }}
        >
          <Spin
            spinning={loading}
            className="h-[100vh] flex justify-center items-center translate-y-[calc(50vh-50%)]"
            tip="loading..."
            size="large"
          >
            <LessonHeader
              lesson={lesson!}
              courseType={CourseType.CONCEPT}
            ></LessonHeader>
            {LessonPage}
          </Spin>
        </ConfigProvider>
      </div>
    </>
  );
};

export default ConceptUnit;
