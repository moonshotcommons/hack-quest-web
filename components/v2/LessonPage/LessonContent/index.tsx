'use client';
import { FC, createContext, useMemo, useState } from 'react';
import { CustomComponent, LessonContent, NotionComponent } from '../type';
import ComponentRenderer from '../ComponentRenderer';
import Split from 'react-split';
import LessonNav from '../LessonNav';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import LessonEvents from '../LessonEvents';
import { useLessonExpand, ExpandDataType } from '@/hooks/useLessonExpand';

export const LessonContentContext = createContext<{
  expandData: ExpandDataType[];
  changeExpandData: (data: ExpandDataType[], index: number) => void;
}>({} as any);
interface LessonContentProps {
  // children: ReactNode

  lesson: Omit<CourseLessonType, 'content'> & { content: LessonContent };
  isPreview?: boolean;
}

const LessonContent: FC<LessonContentProps> = (props) => {
  const { lesson, isPreview = false } = props;

  const [components, setComponents] = useState<
    (CustomComponent | NotionComponent)[]
  >(() => {
    return lesson.content.left;
  });

  const [expandData, setExpandData] = useState<ExpandDataType[][]>(
    useLessonExpand(lesson.content.left) as ExpandDataType[][]
  );

  const changeExpandData = (data: ExpandDataType[], index: number) => {
    expandData[index] = data;
    setExpandData([...expandData]);
  };

  const parent = useMemo(() => {
    return {
      ...lesson.content,
      isRoot: true
    };
  }, [lesson]);

  return (
    <div className="flex flex-col h-[calc(100%-10px)] min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] [&>div]:pr-5">
      {!isPreview && (
        <>
          <LessonNav lesson={lesson as any} courseType={CourseType.SYNTAX} />
          <LessonEvents
            // unitData={dropData}
            lesson={lesson as any}
            courseType={CourseType.SYNTAX}
          />
        </>
      )}

      {!!components.length && (
        <Split
          direction="vertical"
          className="flex flex-col mb-[20px] w-full flex-1 shrink-0 overflow-auto h-full scroll-wrap-y scroll-wrap-x no-scrollbar"
          minSize={80}
        >
          {components.map((component, i) => {
            return (
              <div key={component.id} className="">
                <LessonContentContext.Provider
                  value={{
                    expandData: expandData[i],
                    changeExpandData
                  }}
                >
                  <ComponentRenderer
                    parent={parent}
                    component={component}
                  ></ComponentRenderer>
                </LessonContentContext.Provider>
              </div>
            );
          })}
        </Split>
      )}
    </div>
  );
};

export default LessonContent;
