'use client';

import { useLessonExpand } from '@/hooks/courses/useLessonExpand';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { FC, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { LessonPageContext } from '../type';
import { ComponentRenderer, OverrideRendererConfig } from '@/components/ComponentRenderer';
import { ExpandDataType, PgcExpandDataType } from '@/components/ComponentRenderer/context';
import { CustomComponent, LessonContent, NotionComponent } from '@/components/ComponentRenderer/type';

export const LessonContentContext = createContext<{
  expandData: ExpandDataType[];
  changeExpandData: (data: ExpandDataType[], index: number) => void;
}>({} as any);
interface LessonContentProps {
  lesson: Omit<CourseLessonType, 'content'> & { content: LessonContent };
  isPreview?: boolean;
  courseType: CourseType;
}

const LessonContentComponent: FC<LessonContentProps> = (props) => {
  const { lesson } = props;
  const { onBugCommit } = useContext(LessonPageContext);
  const [components, setComponents] = useState<(CustomComponent | NotionComponent)[]>(() => {
    return lesson.content.left;
  });
  const { getLessonExpand } = useLessonExpand(lesson.content.left);
  const [expandData, setExpandData] = useState<ExpandDataType[][]>(getLessonExpand());

  const updateExpandData = (data: ExpandDataType[], index?: number) => {
    expandData[index!] = data as PgcExpandDataType[];
    setExpandData([...expandData]);
  };

  const componentsWrapRef = useRef<HTMLDivElement>(null);

  const parent = useMemo(() => {
    return {
      ...lesson.content,
      isRoot: true
    };
  }, [lesson]);

  useEffect(() => {
    setExpandData(getLessonExpand());
    if (lesson.content.left) {
      setComponents(lesson.content.left);
    }
  }, [lesson]);

  const getExpandData = (cId: string) => {
    const eData = expandData.find((v) => v.some((v1) => v1.cId === cId));
    return eData || [];
  };

  useEffect(() => {
    if (componentsWrapRef.current) {
      componentsWrapRef.current.scrollTo(0, 0);
    }
  }, [lesson]);

  return (
    <div className="">
      {!!components?.length && (
        <div
          className="scroll-wrap-y scroll-wrap-x mb-[20px] flex h-full w-full flex-1 shrink-0 flex-col"
          ref={componentsWrapRef}
        >
          {components.map((component, index) => {
            const prevComponent = index === 0 ? null : components![index - 1];
            const nextComponent = index === components!.length - 1 ? null : components![index + 1];
            return (
              <div key={component.id} className="">
                <OverrideRendererConfig globalContext={{ expandData: getExpandData(component.id), updateExpandData }}>
                  <ComponentRenderer
                    parent={parent}
                    component={component}
                    position={index}
                    prevComponent={prevComponent}
                    nextComponent={nextComponent}
                  ></ComponentRenderer>
                </OverrideRendererConfig>
              </div>
            );
          })}
          {/* <Button
            icon={BugIcon}
            className="ml-[1.375rem] rounded-[10px] bg-neutral-medium-gray px-[16px] py-[14px] text-neutral-white"
            onClick={() => {
              onBugCommit?.();
            }}
          >
            <span className="body-m ml-[0.5]">Found a bug?</span>
          </Button> */}
        </div>
      )}
    </div>
  );
};

const BugIcon = (
  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11.5" cy="11.5" r="11.5" fill="white" />
    <circle cx="11.5001" cy="5.36634" r="1.53333" fill="#8C8C8C" />
    <rect x="9.9668" y="8.43359" width="3.06667" height="10.35" rx="1.53333" fill="#8C8C8C" />
  </svg>
);

export default LessonContentComponent;
