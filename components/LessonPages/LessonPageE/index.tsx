import NotionRenderer, { Renderer } from '@/components/NotionRender';
import ImageRenderer from '@/components/NotionRender/ImageRenderer';
import TextRenderer from '@/components/NotionRender/TextRenderer';
import { Block } from '@/components/TempComponent/Block';
import { useParseLessonBSection } from '@/hooks/useParseLesson/useParseLessonBSection';
import {
  CourseLessonType,
  CourseType,
  LessonStyleType
} from '@/service/webApi/course/type';
import { FC, HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import Cover from '@/public/images/lesson/lesson_type_e_cover.svg';
import Image from 'next/image';
import Button, { ButtonProps } from '@/components/Common/Button';
import { useRouter } from 'next/router';
import { useDebounceFn } from 'ahooks';
import { shallowEqual, useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import { cn, getCourseLink } from '@/helper/utils';
import {
  useBackToPrevLesson,
  useGotoNextLesson
} from '@/hooks/useCoursesHooks/useGotoNextLesson';
import webApi from '@/service';
import CompleteModal from '../CompleteModal';
import SessionRenderer from '@/components/NotionRender/SessionRenderer';
interface LessonPageDProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}

const CustomButton: FC<ButtonProps> = (props) => {
  const { children } = props;
  return (
    <Button
      padding="px-[3rem] py-[1.25rem]"
      fontStyle="Inter font-normal"
      textStyle="text-[.875rem] text-white leading-[1.25rem]"
      {...props}
    >
      {children}
    </Button>
  );
};

const LessonPageD: FC<LessonPageDProps> = (props) => {
  const { lesson, courseType } = props;
  const router = useRouter();
  const { courseId: courseName } = router.query;
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  // const sections = useParseLessonBSection(lesson.content);
  const { onNextClick, completeModalOpen, setCompleteModalOpen } =
    useGotoNextLesson(lesson, courseType, true);
  const { onBackClick } = useBackToPrevLesson(lesson, courseType);
  useEffect(() => {
    setIsCompleted(false);
    if (lesson) {
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson]);

  return (
    <div className="w-full h-[80vh] relative flex mt-[1.25rem] text-white  bg-[#111] rounded-[2.5rem]">
      <div className="w-[47rem] h-full rounded-[2.5rem] bg-[url('/images/lesson/lesson_type_e_cover.jpg')] bg-no-repeat bg-cover bg-center"></div>
      <div className="flex-1 px-[3rem] py-[2.5rem]">
        <SessionRenderer
          type={'session'}
          source={lesson.content}
          parent={{ ...lesson, isRoot: true }}
          onCompleteStateChange={(value: boolean) => setIsCompleted(value)}
        ></SessionRenderer>
      </div>
      <div className="absolute bottom-10 right-10">
        {/* <CustomButton onClick={onBackClick}>Back</CustomButton> */}
        {isCompleted && (
          <CustomButton className="border" onClick={onNextClick}>
            Next
          </CustomButton>
        )}
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
