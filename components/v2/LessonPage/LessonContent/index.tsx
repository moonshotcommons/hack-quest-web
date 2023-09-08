'use client';
import { ExpandDataType, useLessonExpand } from '@/hooks/useLessonExpand';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { FC, createContext, useEffect, useMemo, useState } from 'react';
import ComponentRenderer from '../ComponentRenderer';
import LessonEvents from '../LessonEvents';
import { CustomComponent, LessonContent, NotionComponent } from '../type';

export const LessonContentContext = createContext<{
  expandData: ExpandDataType[];
  changeExpandData: (data: ExpandDataType[], index: number) => void;
}>({} as any);
interface LessonContentProps {
  lesson: Omit<CourseLessonType, 'content'> & { content: LessonContent };
  isPreview?: boolean;
  courseType: CourseType;
}

const LessonContent: FC<LessonContentProps> = (props) => {
  const { lesson, isPreview = false, courseType } = props;

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

  useEffect(() => {
    if (lesson.content.left) {
      setComponents(lesson.content.left);
    }
  }, [lesson]);

  return (
    <div className="flex flex-col h-[calc(100%-10px)] ">
      <LessonEvents
        isPreview={isPreview}
        lesson={lesson as any}
        courseType={courseType}
      />

      {!!components.length && (
        <div className="flex flex-col mb-[20px] w-full flex-1 shrink-0 overflow-auto h-full scroll-wrap-y scroll-wrap-x no-scrollbar">
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
        </div>
      )}
    </div>
  );
};

export default LessonContent;
