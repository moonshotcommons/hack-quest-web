import { FC } from 'react';
import Sidebar from './Sidebar';
import { CourseType } from '@/service/webApi/course/type';
import { useGetLessonContent } from '@/hooks/courses/useGetLessenContent';
import { ElectiveLessonType } from '@/service/webApi/elective/type';
import Loading from '@/components/Common/Loading';
import LessonContentWrap from './LessonContentWrap';
import { ComponentRenderer } from '@/components/ComponentRenderer';

export interface ProgressType {
  total: number;
  current: number;
  mounted: boolean;
}

interface MiniCoursePageProps {
  lessonId: string;
  courseType: CourseType.MINI;
}

const MiniCoursePage: FC<MiniCoursePageProps> = (props) => {
  const { lessonId, courseType } = props;

  const { lesson, loading } = useGetLessonContent<ElectiveLessonType>(lessonId, courseType);

  return (
    <Loading loading={loading} className="flex h-[100vh] translate-y-[calc(50vh-50%)] items-center justify-center">
      <div className="flex h-full py-[40px]">
        {lesson && (
          <>
            <Sidebar lesson={lesson}></Sidebar>
            <LessonContentWrap lesson={lesson}>
              <div className="flex h-full max-w-[840px] flex-1 flex-col rounded-[12px] bg-neutral-white px-[64px] py-[48px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
                <h1 className="text-h3 pb-[24px] text-neutral-off-black">{lesson.name}</h1>
                <div className="mb-4 h-[1px] w-full scale-y-50 bg-neutral-black">&nbsp;</div>
                <div className="scroll-wrap-y flex-1 overflow-y-auto overflow-x-visible pl-1 pr-4">
                  <ComponentRenderer
                    parent={lesson}
                    component={lesson.content as any}
                    prevComponent={null}
                    nextComponent={null}
                    position={0}
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
