import React, { useMemo } from 'react';
import LessonPageA from '@/components/v2/LessonPages/LessonPageA';
import LessonPageB from '@/components/v2/LessonPages/LessonPageB';
import LessonPageD from '@/components/v2/LessonPages/LessonPageD';
import LessonPageE from '@/components/v2/LessonPages/LessonPageE';
import {
  CourseLessonType,
  CourseType,
  LessonStyleType
} from '@/service/webApi/course/type';

interface PreviewRenderProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}
const PreviewRender: React.FC<PreviewRenderProps> = ({
  lesson,
  courseType
}) => {
  const lessonPreview = useMemo(() => {
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
        case LessonStyleType.B:
          return (
            <LessonPageB
              lesson={lesson}
              courseType={CourseType.SYNTAX}
            ></LessonPageB>
          );
        case LessonStyleType.C:
        case LessonStyleType.D:
          return (
            <LessonPageD
              lesson={lesson}
              courseType={CourseType.SYNTAX}
            ></LessonPageD>
          );
        case LessonStyleType.E:
          return (
            <>
              <LessonPageE
                lesson={lesson}
                courseType={CourseType.SYNTAX}
              ></LessonPageE>
            </>
          );
        default:
          return <></>;
      }
    }
  }, [lesson]);
  return (
    <div className="flex-1 w-full relative">
      <div className="absolute w-full h-full overflow-auto left-0 top-0 no-scrollbar">
        {lessonPreview}
      </div>
    </div>
  );
};

export default PreviewRender;
