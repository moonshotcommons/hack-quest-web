import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useGetLessonContent } from '@/hooks/useCoursesHooks/useGetLessenContent';
import { CourseType } from '@/service/webApi/course/type';

import LessonPage from '@/components/v2/LessonPage';

interface IProps {}

const SyntaxUnit: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { lessonId } = router.query;

  return (
    <>
      <div className="w-full h-full flex flex-col font-next-book-Thin">
        <LessonPage
          lessonId={lessonId as string}
          courseType={CourseType.SYNTAX}
        ></LessonPage>
      </div>
    </>
  );
};

export default SyntaxUnit;
