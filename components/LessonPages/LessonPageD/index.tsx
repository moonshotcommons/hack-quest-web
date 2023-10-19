import NotionRenderer, { Renderer } from '@/components/NotionRender';

import Button from '@/components/Common/Button';
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
interface LessonPageDProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}

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

const LessonPageD: FC<LessonPageDProps> = (props) => {
  const { lesson, courseType } = props;
  const router = useRouter();
  const { courseId: courseName } = router.query;
  const sections = useParseLessonBSection(lesson.content);
  const { onNextClick, completeModalOpen, setCompleteModalOpen } =
    useGotoNextLesson(lesson, courseType, true);
  const { onBackClick, isFirst } = useBackToPrevLesson(lesson, courseType);
  useEffect(() => {
    if (lesson) {
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson]);

  return (
    <div className="w-full h-[80vh] flex gap-[4.5rem] mt-[1.25rem] text-text-default-color px-[3rem] py-[2.5rem]  bg-lesson-content-global-bg rounded-[2.5rem]">
      <div className="flex-1 scroll-wrap-y">
        <h1 className="mb-[2rem] font-next-poster-Bold leading-[110%] tracking-[0.03rem] text-[1.5rem] text-text-default-color">
          {lesson.name}
        </h1>
        <NotionRenderer styleType={LessonStyleType.D}>
          {lesson.content?.map((source: any, index: number) => {
            return (
              <Renderer
                key={index}
                type={source.type}
                source={source}
                parent={{ ...lesson, isRoot: true }}
              ></Renderer>
            );
          })}
        </NotionRenderer>
      </div>
      <div className="flex-1 flex flex-col gap-[2.5rem]">
        <div className="h-full w-full flex justify-end">
          <img
            src={'/images/lesson/lesson_type_b_cover.svg'}
            alt="cover"
            className="h-full"
          ></img>
        </div>
        <div className="h-[3rem] flex gap-4 self-end">
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
      </div>
      <CompleteModal
        title={courseName as string}
        open={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
      ></CompleteModal>
    </div>
  );
};

export default LessonPageD;
