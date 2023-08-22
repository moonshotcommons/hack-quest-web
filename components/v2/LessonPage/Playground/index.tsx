'use client';
import { FC, ReactNode, useMemo, useState } from 'react';
import { CustomComponent, LessonContent, NotionComponent } from '../type';
import ComponentRenderer from '../ComponentRenderer';
import Split from 'react-split';
import { CourseLessonType } from '@/service/webApi/course/type';

interface PlaygroundProps {
  // children: ReactNode
  lesson: Omit<CourseLessonType, 'content'> & { content: LessonContent };
}

const Playground: FC<PlaygroundProps> = (props) => {
  const { lesson } = props;

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
  return (
    <div
      className="p-5 bg-lesson-code-bg h-full overflow-auto flex flex-col gap-[20px] scroll-wrap-y"
      style={{
        boxShadow: ' -2px 0px 4px 0px rgba(0, 0, 0, 0.10)'
      }}
    >
      {
        !!components.length &&
          // <Split
          //   direction="vertical"
          //   className="flex flex-col w-full h-full"
          //   sizes={[95, 5]}
          //   minSize={80}
          // >
          components.map((component) => {
            return (
              <ComponentRenderer
                key={component.id}
                parent={parent}
                component={component}
              ></ComponentRenderer>
            );
          })
        // </Split>
      }
    </div>
  );
};

export default Playground;
