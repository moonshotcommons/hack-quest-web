import Button, { ButtonProps } from '@/components/Common/Button';
import NotionRenderer, { Renderer } from '@/components/NotionRender';
import ImageRenderer from '@/components/NotionRender/ImageRenderer';
import TextRenderer from '@/components/NotionRender/TextRenderer';
import { Block } from '@/components/TempComponent/Block';
import { useGotoNextLesson } from '@/hooks/useCoursesHooks/useGotoNextLesson';
import { useParseLessonBSection } from '@/hooks/useParseLesson/useParseLessonBSection';
import webApi from '@/service';
import {
  CourseLessonType,
  CourseType,
  LessonStyleType
} from '@/service/webApi/course/type';
import { FC, ReactNode, useEffect, useState } from 'react';

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

interface LessonPageBProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}

const LessonPageB: FC<LessonPageBProps> = (props) => {
  const { lesson, courseType } = props;
  const sections = useParseLessonBSection(lesson.content);
  console.log(sections);

  const { onNextClick } = useGotoNextLesson(lesson, courseType, true);

  useEffect(() => {
    if (lesson) {
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson]);
  return (
    <div className="relative w-full h-[80vh] flex-col gap-[4.5rem] mt-[1.25rem] text-white px-[3rem] py-[2.5rem]">
      <div className=" w-full h-full overflow-y-scroll">
        {lesson.content?.map((section: any, index) => {
          return (
            <div key={section.id} className="relative bottom-line mb-8">
              <NotionRenderer styleType={LessonStyleType.B}>
                <Renderer
                  type="section"
                  source={section}
                  parent={{ ...lesson, isRoot: true }}
                ></Renderer>
              </NotionRenderer>
            </div>
          );
        })}
      </div>
      <div className="h-[3rem] flex gap-4 self-end absolute right-[3rem] bottom-[2.5rem]">
        <CustomButton>Back</CustomButton>
        <CustomButton className="border" onClick={onNextClick}>
          Next
        </CustomButton>
      </div>
    </div>
  );
};

export default LessonPageB;
