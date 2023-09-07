import { CourseType } from '@/service/webApi/course/type';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import LessonPage from '@/components/v2/LessonPage';

interface IProps {}

const MiniUnit: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { lessonId } = router.query;

  return (
    <>
      <div className="w-full h-full flex flex-col font-next-book-Thin">
        <LessonPage
          lessonId={lessonId as string}
          courseType={CourseType.Mini}
        ></LessonPage>
      </div>
    </>
  );
};

export default MiniUnit;
