import { FC } from 'react';

import ContentRenderer from './ContentRenderer';
import ExampleRenderer from './ExampleRenderer';
import QuizRenderer from './QuizRenderer';
import QuizARenderer from './QuizRenderer/QuizARenderer';
import QuizBRenderer from './QuizRenderer/QuizBRenderer';

import {
  CustomComponent,
  CustomType,
  NotionComponent,
  QuizAType,
  QuizBType,
  QuizType
} from '@/components/ComponentRenderer/type';

interface MobPgcCustomRendererProps {
  // children: ReactNode
  parent: any;
  component: CustomComponent | NotionComponent;
  isRenderChildren?: boolean;
}

const MobPgcCustomRenderer: FC<MobPgcCustomRendererProps> = (props) => {
  const { parent, component, isRenderChildren = true } = props;
  switch (component.type.trim()) {
    case CustomType.Content:
      return <ContentRenderer component={component as CustomComponent} parent={parent as any}></ContentRenderer>;
    case CustomType.Example:
      return <ExampleRenderer component={component as any} parent={parent as any}></ExampleRenderer>;
    case CustomType.Quiz:
    case CustomType.QUIZ:
      return <QuizRenderer quiz={component as QuizType} parent={parent}></QuizRenderer>;
    case CustomType.QuizA:
      return <QuizARenderer parent={parent} quiz={component as QuizAType}></QuizARenderer>;
    case CustomType.QuizB:
      return <QuizBRenderer parent={parent} quiz={component as QuizBType}></QuizBRenderer>;
    default:
      console.log('不能渲染的类型', component.type.trim());
      return <div></div>;
  }
};

export default MobPgcCustomRenderer;
