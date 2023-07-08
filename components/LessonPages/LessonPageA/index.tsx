import { Block } from '@/components/TempComponent/Block';
import Quest from '@/components/TempComponent/Quest';
import { getCourseLink } from '@/helper/utils';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { AppRootState } from '@/store/redux';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

interface LessonPageAProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}

const LessonPageA: FC<LessonPageAProps> = (props) => {
  const { lesson, courseType } = props;
  const [lessonContent, setLessonContent] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [isProgressing, setIsProgressing] = useState(false);
  const router = useRouter();

  const { unitsLessonsList } = useSelector((state: AppRootState) => {
    return {
      unitsLessonsList: state.course.unitsLessonsList
    };
  }, shallowEqual);

  useEffect(() => {
    if (lesson) {
      setLessonContent((lesson.content?.[0] as any).children);
      setQuizes((lesson.content?.[1] as any).children);
    } else {
      // router.push('/404');
    }
  }, [lesson]);
  return (
    <div className="w-full h-[80vh] flex justify-between gap-[4.5rem] mt-[1.25rem]">
      <div className="text-white h-full w-full px-[3rem] py-[2.5rem] rounded-[2.5rem] bg-[#101010] overflow-y-scroll notion-render-block no-scrollbar">
        {lessonContent &&
          lessonContent?.map((block: any) => (
            <Block block={block} key={block.id} darkMode={true} />
          ))}
      </div>
      <div className="text-[#E2E2E2] h-full bg-[#111] notion-render-block w-full py-[2.5rem] rounded-[2.5rem] overflow-y-scroll no-scrollbar">
        <Quest
          courseType={courseType}
          lessonID={lesson.id}
          isLastUnit={false}
          content={quizes}
          onPass={() => {
            const { courseId } = router.query;

            const currentUnit = unitsLessonsList?.find(
              (unit) => unit.id === lesson.unitId
            );
            const currentLessonIndex =
              currentUnit?.pages.findIndex((page) => page.id === lesson.id) ||
              0;

            router.push(
              `${getCourseLink(courseType)}/${courseId}/learn/${
                currentUnit?.pages[currentLessonIndex + 1].id
              }`
            );
          }}
          darkMode={true}
          setIsProgressing={setIsProgressing}
        />
      </div>
    </div>
  );
};

export default LessonPageA;
