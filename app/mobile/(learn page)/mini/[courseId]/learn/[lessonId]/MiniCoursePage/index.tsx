import { FC } from 'react';
// import mockLessonData from './content.json';
// import mockLessonData from './quizA.json';
// import mockLessonData from './quizB.json';
import Sidebar from './Sidebar';
import { CourseType } from '@/service/webApi/course/type';
import { useGetLessonContent } from '@/hooks/useCoursesHooks/useGetLessenContent';
import { ElectiveLessonType } from '@/service/webApi/elective/type';
import LessonContentWrap from './LessonContentWrap';
import Loading from '@/components/Common/Loading';
import ComponentRenderer from '@/components/Web/Business/Renderer/MiniElectiveRenderer';
export interface ProgressType {
  total: number;
  current: number;
  mounted: boolean;
}

interface MiniCoursePageProps {
  lessonId: string;
  courseType: CourseType.MINI;
  completed: VoidFunction;
}

const MiniCoursePage: FC<MiniCoursePageProps> = (props) => {
  const { lessonId, courseType, completed } = props;

  const { lesson, loading } = useGetLessonContent<ElectiveLessonType>(
    lessonId,
    courseType
  );

  return (
    <Loading loading={loading} className="h-full">
      <div className="h-[calc(100vh-112px)]">
        {lesson && (
          <>
            <Sidebar lesson={lesson}></Sidebar>
            <LessonContentWrap lesson={lesson} completed={completed}>
              <div className="flex w-full flex-1 flex-col overflow-auto rounded-[12px]">
                <div className="scroll-wrap-y flex-1 overflow-y-auto overflow-x-visible px-[2px] pb-[70px]">
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
