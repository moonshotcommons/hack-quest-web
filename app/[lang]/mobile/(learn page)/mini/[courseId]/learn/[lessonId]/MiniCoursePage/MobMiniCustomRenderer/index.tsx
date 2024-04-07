import { FC } from 'react';

import ContentRenderer from './ContentRenderer';
import QuizARenderer from './QuizRenderer/QuizARenderer';
import QuizBRenderer from './QuizRenderer/QuizBRenderer';
import QuizCRenderer from './QuizRenderer/QuizCRenderer';
import {
  CustomComponent,
  CustomType,
  NotionComponent,
  QuizAType,
  QuizBType
} from '@/components/ComponentRenderer/type';

interface MobMiniCustomRendererProps {
  // children: ReactNode
  parent: any;
  component: CustomComponent | NotionComponent;
  isRenderChildren?: boolean;
}

const MobMiniCustomRenderer: FC<MobMiniCustomRendererProps> = (props) => {
  const { parent, component, isRenderChildren = true } = props;

  switch (component.type.trim()) {
    case CustomType.Content:
      return <ContentRenderer component={component as CustomComponent} parent={parent as any}></ContentRenderer>;
    case CustomType.QuizA:
      return <QuizARenderer parent={parent} quiz={component as QuizAType}></QuizARenderer>;
    case CustomType.QuizB:
      return <QuizBRenderer parent={parent} quiz={component as QuizBType}></QuizBRenderer>;
    case CustomType.QuizC:
      return <QuizCRenderer parent={parent} quiz={component as QuizBType}></QuizCRenderer>;
    default:
      console.log('不能渲染的类型', component.type.trim());
      return <div></div>;
  }
};

export default MobMiniCustomRenderer;
