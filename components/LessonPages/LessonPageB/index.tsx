import Button from '@/components/Common/Button';
import NotionRenderer, { Renderer } from '@/components/NotionRender';

import { CustomRenderType } from '@/components/NotionRender/type';
import {
  useBackToPrevLesson,
  useGotoNextLesson
} from '@/hooks/useCoursesHooks/useGotoNextLesson';
import { useParseLessonBSection } from '@/hooks/useParseLesson/useParseLessonBSection';
import webApi from '@/service';
import {
  CourseLessonType,
  CourseType,
  LessonStyleType
} from '@/service/webApi/course/type';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import CompleteModal from '../CompleteModal';

// const CustomButton: FC<ButtonProps> = (props) => {
//   const { children } = props;
//   return (
//     <Button
//       padding="px-[3rem] py-[1.25rem]"
//       fontStyle="Inter font-normal"
//       textStyle="text-[.875rem] text-white leading-[1.25rem]"
//       {...props}
//     >
//       {children}
//     </Button>
//   );
// };

interface LessonPageBProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}

const LessonPageB: FC<LessonPageBProps> = (props) => {
  const { lesson, courseType } = props;
  const router = useRouter();
  const { courseId: courseName } = router.query;
  const sections = useParseLessonBSection(lesson.content);

  const { onNextClick } = useGotoNextLesson(lesson, courseType, true);
  const { onBackClick, isFirst } = useBackToPrevLesson(lesson, courseType);
  useEffect(() => {
    if (lesson) {
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson]);
  return (
    <div className="relative w-full h-[80vh] flex-col gap-[4.5rem] mt-[1.25rem] text-text-default-color px-[3rem] py-[2.5rem]">
      <div className=" w-full h-full scroll-wrap-y">
        {lesson.content?.map((section: any, index: number) => {
          return (
            <div key={section.id} className="relative bottom-line mb-8">
              <NotionRenderer styleType={LessonStyleType.B}>
                <Renderer
                  type={CustomRenderType.SECTION}
                  source={section}
                  parent={{ ...lesson, isRoot: true }}
                ></Renderer>
              </NotionRenderer>
            </div>
          );
        })}
      </div>
      <div className="h-[3rem] flex gap-4 self-end absolute right-[4rem] bottom-[2.5rem]">
        {!isFirst && (
          <Button
            onClick={onBackClick}
            className="bg-lesson-ghost-button-bg text-lesson-ghost-button-text-color border border-lesson-ghost-border-color px-[3rem] py-[1rem]"
          >
            Back
          </Button>
        )}
        <Button
          onClick={() => onNextClick()}
          className="bg-lesson-primary-button-bg text-lesson-primary-button-text-color border border-lesson-primary-button-border-color font-next-book px-[3rem] py-[1rem]"
        >
          Next
        </Button>
      </div>
      {/* <CompleteModal
        title={courseName as string}
        open={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
      ></CompleteModal> */}
    </div>
  );
};

export default LessonPageB;
