import { Renderer } from '@/components/NotionRender';
import ImageRenderer from '@/components/NotionRender/ImageRenderer';
import TextRenderer from '@/components/NotionRender/TextRenderer';
import { Block } from '@/components/TempComponent/Block';
import { useParseLessonBSection } from '@/hooks/useParseLesson/useParseLessonBSection';
import {
  CourseLessonType,
  CourseType,
  LessonStyleType
} from '@/service/webApi/course/type';
import { FC, ReactNode, useState } from 'react';

interface LessonPageBProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}

const LessonPageB: FC<LessonPageBProps> = (props) => {
  const { lesson } = props;
  const sections = useParseLessonBSection(lesson.content);
  console.log(sections);
  return (
    <div className="w-full h-[80vh] flex-col gap-[4.5rem] mt-[1.25rem] text-white px-[3rem] py-[2.5rem] overflow-y-scroll">
      {lesson.content?.map((section: any, index) => {
        return (
          <div key={section.id}>
            <Renderer type="section" source={section}></Renderer>
          </div>
        );
      })}
      {/* {lesson.content &&
        lesson.content?.map((block: any) => (
          <Block
            styleType={LessonStyleType.B}
            block={block}
            key={block.id}
            darkMode={true}
            renderChildren={true}
          />
        ))} */}
    </div>
  );
};

export default LessonPageB;
