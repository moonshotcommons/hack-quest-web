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
import QuizCRenderer from './QuizRenderer/QuizCRenderer';
import QuizDRenderer from './QuizRenderer/QuizDRenderer';

interface PgcCustomRendererProps {
  // children: ReactNode
  parent: any;
  component: CustomComponent | NotionComponent;
  isRenderChildren?: boolean;
}

const PgcCustomRenderer: FC<PgcCustomRendererProps> = (props) => {
  const { parent, component, isRenderChildren = true } = props;
  switch (component.type.trim()) {
    case CustomType.Example:
      return <ExampleRenderer component={component as any} parent={parent as any}></ExampleRenderer>;
    case CustomType.Content:
      return <ContentRenderer component={component as CustomComponent} parent={parent as any}></ContentRenderer>;
    case CustomType.Quiz:
      return <QuizRenderer quiz={component as QuizType} parent={parent}></QuizRenderer>;
    case CustomType.QuizA:
      return <QuizARenderer parent={parent} quiz={component as QuizAType}></QuizARenderer>;
    case CustomType.QuizB:
      return <QuizBRenderer parent={parent} quiz={component as QuizBType}></QuizBRenderer>;
    case CustomType.QuizC:
      return <QuizCRenderer parent={parent} quiz={component as QuizBType}></QuizCRenderer>;
    case CustomType.QuizD:
      console.log('QuizD');
      return <QuizDRenderer parent={parent} quiz={component as any}></QuizDRenderer>;
  }
};

export default PgcCustomRenderer;
