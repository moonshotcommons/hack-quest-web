'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { LessonType, PlaygroundContext } from './type';
import { CustomComponent, NotionComponent } from '@/components/ComponentRenderer/type';
import { ComponentRenderer, OverrideRendererConfig } from '@/components/ComponentRenderer';
import useLessonExpand from '@/hooks/courses/useLessonExpand';
import { ExpandDataType, PgcExpandDataType } from '@/components/ComponentRenderer/context';

interface PlaygroundProps {
  // children: ReactNode
  lesson: LessonType;
  onCompleted: VoidFunction;
  isPreview?: boolean;
}

const Playground: FC<PlaygroundProps> = (props) => {
  const { lesson, onCompleted, isPreview = false } = props;

  const [components, setComponents] = useState<(CustomComponent | NotionComponent)[]>(() => {
    return lesson.content.right;
  });

  const { getLessonExpand } = useLessonExpand(lesson.content.right);
  const [expandData, setExpandData] = useState<PgcExpandDataType[][]>(getLessonExpand());
  const updateExpandData = (data: ExpandDataType[], index?: number) => {
    expandData[index!] = data as PgcExpandDataType[];
    setExpandData([...expandData]);
  };
  const getExpandData = (cId: string) => {
    const eData = expandData.find((v) => v.some((v1) => v1.cId === cId));
    return eData || [];
  };
  const parent = useMemo(() => {
    return {
      ...lesson.content,
      isRoot: true
    };
  }, [lesson]);

  useEffect(() => {
    setExpandData(getLessonExpand());
    if (lesson.content.right) {
      setComponents(lesson.content.right);
    }
  }, [lesson]);

  return (
    <div className="flex h-full flex-col gap-[20px] overflow-hidden bg-lesson-code-bg p-5 pl-[0px]">
      <PlaygroundContext.Provider value={{ lesson, onCompleted, isPreview, isPlayground: true }}>
        {!!components?.length &&
          components.map((component, index) => {
            const prevComponent = index === 0 ? null : components![index - 1];
            const nextComponent = index === components!.length - 1 ? null : components![index + 1];
            return (
              <OverrideRendererConfig
                key={component.id}
                codeRenderer={{ isPlayground: true }}
                globalContext={{
                  expandDataRight: getExpandData(component.id),
                  updateExpandDataRight: updateExpandData
                }}
              >
                <ComponentRenderer
                  parent={parent}
                  component={component}
                  position={index}
                  prevComponent={prevComponent}
                  nextComponent={nextComponent}
                />
              </OverrideRendererConfig>
            );
          })}
      </PlaygroundContext.Provider>
    </div>
  );
};

export default Playground;
