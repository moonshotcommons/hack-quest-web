'use client';

import { FC } from 'react';
import { CustomComponent, CustomType, NotionComponent } from './type';
import NotionRenderer, { NOTION_RENDERER_TYPES } from './NotionRender';
import { NotionComponentType } from './type';
import { useCustomComponentRenderer } from '.';

interface ComponentRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  parent: any;
  component: NotionComponent | CustomComponent;
  isRenderChildren?: boolean;
}

const ComponentRenderer: FC<ComponentRendererProps> = (props) => {
  const { component, parent } = props;

  const CustomComponentRenderer = useCustomComponentRenderer();
  const type = component.type.trim() as NotionComponentType | CustomType;

  if (NOTION_RENDERER_TYPES.includes(type as any)) {
    return <NotionRenderer {...props} />;
  }

  switch (type) {
    case CustomType.Reading:
    case CustomType.Video:
    case CustomType.Content:
    case CustomType.Example:
    case CustomType.Quiz:
    case CustomType.QUIZ:
    case CustomType.QuizA:
    case CustomType.QuizB:
    case CustomType.QuizC:
    case CustomType.QuizD:
      return <CustomComponentRenderer {...props} />;
    default:
      console.log('不能渲染的类型', component.type.trim());
      console.log(component);
      return <div></div>;
  }
};

export const childRenderCallback = (component: NotionComponent | CustomComponent) => {
  const ChildComponent = (child: NotionComponent | CustomComponent, index: number) => {
    const prevComponent = index === 0 ? null : component.children![index - 1];
    const nextComponent = index === component.children!.length - 1 ? null : component.children![index + 1];
    return (
      <ComponentRenderer
        key={child.id ?? index}
        component={child}
        parent={component}
        position={index}
        prevComponent={prevComponent}
        nextComponent={nextComponent}
      ></ComponentRenderer>
    );
  };

  return ChildComponent;
};

export default ComponentRenderer;
