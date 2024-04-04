'use client';

import { useLessonExpand } from '@/hooks/courses/useLessonExpand';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { FC, useEffect, useMemo, useRef, useState, Suspense } from 'react';
import LessonEvents from '../LessonEvents';
import FoundBugButton from '../../Business/FoundBugButton';
import LessonNavbar from '../LessonNavbar';
import { ComponentRenderer, OverrideRendererConfig } from '@/components/ComponentRenderer';
import { CustomComponent, LessonContent, NotionComponent } from '@/components/ComponentRenderer/type';

import { ExpandDataType, PgcExpandDataType } from '@/components/ComponentRenderer/context';

interface LessonContentProps {
  lesson: Omit<CourseLessonType, 'content'> & { content: LessonContent };
  isPreview?: boolean;
  courseType: CourseType;
}

const LessonContentComponent: FC<LessonContentProps> = (props) => {
  const { lesson, isPreview = false, courseType } = props;
  const [components, setComponents] = useState<(CustomComponent | NotionComponent)[]>(() => {
    return lesson.content.left;
  });

  const { getLessonExpand } = useLessonExpand(lesson.content.left);
  const [expandData, setExpandData] = useState<PgcExpandDataType[][]>(getLessonExpand());

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
    <div className="flex h-[calc(100%-10px)] flex-shrink-0 flex-col pl-[20px] pr-[20px]">
      <Suspense>
        <LessonNavbar />
      </Suspense>

      <LessonEvents isPreview={isPreview} lesson={lesson as any} courseType={courseType} />

      {!!components?.length && (
        <div
          className="scroll-wrap-y scroll-wrap-x mb-[20px] flex h-full w-full flex-1 shrink-0 flex-col"
          ref={componentsWrapRef}
        >
          {components.map((component, i) => {
            return (
              <div key={component.id} className="">
                <OverrideRendererConfig globalContext={{ expandData: getExpandData(component.id), updateExpandData }}>
                  <ComponentRenderer parent={parent} component={component}></ComponentRenderer>
                </OverrideRendererConfig>
              </div>
            );
          })}

          <FoundBugButton
            params={{
              lessonId: lesson.id
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LessonContentComponent;
