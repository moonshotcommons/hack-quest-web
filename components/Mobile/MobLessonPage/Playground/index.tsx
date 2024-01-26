'use client';
import {
  CustomComponent,
  NotionComponent
} from '@/components/Web/Business/Renderer/type';
import { FC, useEffect, useMemo, useState } from 'react';
import { LessonType, PlaygroundContext } from './type';
import ComponentRenderer from '../../MobRenderer/ComponentRenderer';

interface PlaygroundProps {
  // children: ReactNode
  lesson: LessonType;
  onCompleted: VoidFunction;
  isPreview?: boolean;
}

const Playground: FC<PlaygroundProps> = (props) => {
  const { lesson, onCompleted, isPreview = false } = props;

  const [components, setComponents] = useState<
    (CustomComponent | NotionComponent)[]
  >(() => {
    return lesson.content.right;
  });

  const parent = useMemo(() => {
    return {
      ...lesson.content,
      isRoot: true
    };
  }, [lesson]);

  useEffect(() => {
    if (lesson.content.right) {
      setComponents(lesson.content.right);
    }
  }, [lesson]);

  return (
    <div className="">
      <PlaygroundContext.Provider
        value={{ lesson, onCompleted, isPreview, isPlayground: true }}
      >
        {!!components?.length &&
          components.map((component) => {
            return (
              <ComponentRenderer
                parent={parent}
                key={component.id}
                component={component}
              ></ComponentRenderer>
            );
          })}
      </PlaygroundContext.Provider>
    </div>
  );
};

export default Playground;
