'use client';

import { FC } from 'react';
import { CustomComponent, CustomType, NotionComponent } from './type';
import NotionRenderer, { NOTION_RENDERER_TYPES } from './NotionRender';
import { NotionComponentType } from './type';
import { useCustomComponentRenderer } from '.';

interface ComponentRendererProps {
  // children: ReactNode
  parent: any;
  component: NotionComponent | CustomComponent;
  isRenderChildren?: boolean;
}

const ComponentRenderer: FC<ComponentRendererProps> = (props) => {
  const { component } = props;

  debugger;
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
      return <CustomComponentRenderer {...props} />;
    default:
      console.log('不能渲染的类型', component.type.trim());
      return <div></div>;
  }
};

export default ComponentRenderer;
