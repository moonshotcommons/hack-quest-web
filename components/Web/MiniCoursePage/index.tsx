import { FC } from 'react';
import ComponentRenderer from '../Business/Renderer/MiniElectiveRenderer';
// import mockLessonData from './content.json';
// import mockLessonData from './quizA.json';
// import mockLessonData from './quizB.json';
import Sidebar from './Sidebar';
import { CourseType } from '@/service/webApi/course/type';
import { useGetLessonContent } from '@/hooks/useCoursesHooks/useGetLessenContent';
import { ElectiveLessonType } from '@/service/webApi/elective/type';
import Loading from '@/components/Common/Loading';
import LessonContentWrap from './LessonContentWrap';
export interface ProgressType {
  total: number;
  current: number;
  mounted: boolean;
}

interface MiniCoursePageProps {
  lessonId: string;
  courseType: CourseType.Mini;
}

const MiniCoursePage: FC<MiniCoursePageProps> = (props) => {
  const { lessonId, courseType } = props;

  const { lesson, loading } = useGetLessonContent<ElectiveLessonType>(
    lessonId,
    courseType
  );

  return (
    <Loading
      loading={loading}
      className="h-[100vh] flex justify-center items-center translate-y-[calc(50vh-50%)]"
    >
      <div className="py-[40px] flex h-full">
        {lesson && (
          <>
            <Sidebar lesson={lesson}></Sidebar>
            <LessonContentWrap lesson={lesson}>
              <div className="flex-1 max-w-[840px] bg-white h-full rounded-[12px] px-[64px] py-[48px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)] flex flex-col">
                <h1 className="pb-[24px] text-[28px] font-next-poster-Bold text-[#131313] tracking-[1.68px]">
                  {lesson.name}
                </h1>
                <div className="h-[1px] w-full scale-y-50 bg-black mb-4">
                  &nbsp;
                </div>
                <div className="flex-1 overflow-y-auto overflow-x-visible scroll-wrap-y pr-4 pl-1">
                  <ComponentRenderer
                    parent={lesson}
                    component={lesson.content as any}
                  ></ComponentRenderer>
                </div>
              </div>
            </LessonContentWrap>
          </>
        )}
      </div>
    </Loading>
  );
};

export default MiniCoursePage;
