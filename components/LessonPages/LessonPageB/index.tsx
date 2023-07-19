import { useParseLessonBSection } from '@/hooks/useParseLesson/useParseLessonBSection';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
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
    <div className="w-full h-[80vh] flex-col gap-[4.5rem] mt-[1.25rem] text-white rounded-[2.5rem] bg-[#111] px-[3rem] py-[2.5rem]">
      {sections?.map((section: any) => {
        return (
          <div key={section.id}>
            <h1>{section[section.type].rich_text[0].text.content}</h1>
            <div className="flex">
              <div>
                children数组，type是numbered_list_item，需要渲染成step的块
                <div>每一个step下面有其他的内容，代码块，引述等等</div>
              </div>
              <div>图片 type 是image，从image下的type的url取图片链接</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LessonPageB;
