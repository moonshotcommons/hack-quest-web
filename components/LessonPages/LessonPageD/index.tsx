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
import { FC, ReactNode, useEffect, useState } from 'react';
import Cover from '@/public/images/lesson/lesson_type_b_cover.svg';
import Image from 'next/image';
import Button, { ButtonProps } from '@/components/Common/Button';
import { useRouter } from 'next/router';
import { useDebounceFn } from 'ahooks';
import { shallowEqual, useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import { getCourseLink } from '@/helper/utils';
import { useGotoNextLesson } from '@/hooks/useCoursesHooks/useGotoNextLesson';
import webApi from '@/service';
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
  console.log(lesson);
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
    <div className="w-full h-[80vh] flex gap-[4.5rem] mt-[1.25rem] text-white px-[3rem] py-[2.5rem]  bg-[#111] rounded-[2.5rem]">
      <div className="flex-1 overflow-y-scroll">
        <h1 className="mb-[2rem] font-next-poster-Bold leading-[110%] tracking-[0.03rem] text-[1.5rem] text-[#F2F2F2]">
          {lesson.name}
        </h1>
        <NotionRenderer styleType={LessonStyleType.D}>
          {lesson.content?.map((source: any, index) => {
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
          <CustomButton>Back</CustomButton>
          <CustomButton className="border" onClick={onNextClick}>
            Next
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default LessonPageD;
