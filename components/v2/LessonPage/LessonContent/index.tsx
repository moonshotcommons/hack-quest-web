'use client';
import { FC, ReactNode, useMemo, useState } from 'react';
import { CustomComponent, LessonContent, NotionComponent } from '../type';
import ComponentRenderer from '../ComponentRenderer';
import Split from 'react-split';
import { useDispatch } from 'react-redux';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import LessonNav from '../LessonNav';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import LessonEvents from '../LessonEvents';

interface LessonContentProps {
  // children: ReactNode

  lesson: Omit<CourseLessonType, 'content'> & { content: LessonContent };
}

const LessonContent: FC<LessonContentProps> = (props) => {
  const { lesson } = props;

  const [components, setComponents] = useState<
    (CustomComponent | NotionComponent)[]
  >(() => {
    console.log('根据lesson重新设置');
    return lesson.content.left;
  });

  const parent = useMemo(() => {
    return {
      ...lesson.content,
      isRoot: true
    };
  }, [lesson]);

  return (
    <div className="flex flex-col h-[calc(100%-10px)] min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] pr-5">
      <LessonNav lesson={lesson as any} courseType={CourseType.SYNTAX} />
      <LessonEvents
        // unitData={dropData}
        lesson={lesson as any}
        courseType={CourseType.SYNTAX}
      />
      {!!components.length && (
        <Split
          direction="vertical"
          className="flex flex-col mb-[20px] w-full flex-1 shrink-0 overflow-auto h-full scroll-wrap-y scroll-wrap-x"
          minSize={80}
        >
          {components.map((component) => {
            return (
              <div key={component.id} className="">
                <ComponentRenderer
                  parent={parent}
                  component={component}
                ></ComponentRenderer>
              </div>
            );
          })}
        </Split>
      )}
    </div>
  );
};

export default LessonContent;
