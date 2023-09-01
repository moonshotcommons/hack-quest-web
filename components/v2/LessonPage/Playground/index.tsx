'use client';
import { FC, useEffect, useMemo, useState } from 'react';
import ComponentRenderer from '../ComponentRenderer';
import { CustomComponent, NotionComponent } from '../type';
import { LessonType, PlaygroundContext } from './type';

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
    <div className="p-5 bg-lesson-code-bg h-full overflow-auto flex flex-col gap-[20px] scroll-wrap-y">
      <PlaygroundContext.Provider value={{ lesson, onCompleted, isPreview }}>
        {!!components.length &&
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
