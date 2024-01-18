import {
  CustomComponent,
  CustomType,
  NotionComponent,
  NotionType,
  QuizAType,
  QuizBType,
  QuizType
} from '@/components/Web/Business/Renderer/type';
import React, { FC } from 'react';
import ContentRenderer from './ContentRenderer';
import ExampleRenderer from './ExampleRenderer';
import QuizRenderer from './QuizRenderer';
import QuizARenderer from './QuizRenderer/QuizARenderer';
import QuizBRenderer from './QuizRenderer/QuizBRenderer';
import ParagraphRenderer from './ParagraphRenderer';
import NumberListItemRenderer from './NumberListItemRenderer';
import BulletedListItemRenderer from './BulletedListItem';
import ImageRenderer from './ImageRenderer';
import VideoRenderer from './VideoRenderer';
import QuoteRenderer from './QuoteRenderer';
import CalloutRenderer from './CalloutRenderer';
import ToggleRenderer from './ToggleRenderer';
import CodeRenderer from './CodeRenderer';
import EquationRenderer from './EquationRenderer';
import HeaderRenderer from './HeaderRenderer';

interface UgcRenderProps {
  // children: ReactNode
  parent: any;
  component: CustomComponent | NotionComponent;
  isRenderChildren?: boolean;
}

const UgcRender: FC<UgcRenderProps> = (props) => {
  const { parent, component, isRenderChildren = true } = props;
  switch (component.type.trim()) {
    case CustomType.Content:
      return (
        <ContentRenderer
          component={component as CustomComponent}
          parent={parent as any}
        ></ContentRenderer>
      );
    case CustomType.Example:
      return (
        <ExampleRenderer
          component={component as any}
          parent={parent as any}
        ></ExampleRenderer>
      );
    case CustomType.Quiz:
      return (
        <QuizRenderer
          quiz={component as QuizType}
          parent={parent}
        ></QuizRenderer>
      );
    case CustomType.QuizA:
      return (
        <QuizARenderer
          parent={parent}
          quiz={component as QuizAType}
        ></QuizARenderer>
      );
    case CustomType.QuizB:
      return (
        <QuizBRenderer
          parent={parent}
          quiz={component as QuizBType}
        ></QuizBRenderer>
      );
    case NotionType.PARAGRAPH:
      return (
        <ParagraphRenderer
          component={component}
          parent={parent}
        ></ParagraphRenderer>
      );

    case NotionType.NUMBERED_LIST_ITEM:
      return (
        <NumberListItemRenderer
          component={component}
          parent={parent}
        ></NumberListItemRenderer>
      );
    case NotionType.BULLETED_LIST_ITEM:
      return (
        <BulletedListItemRenderer
          component={component}
          parent={parent}
        ></BulletedListItemRenderer>
      );

    case NotionType.IMAGE:
      return (
        <ImageRenderer component={component} parent={parent}></ImageRenderer>
      );

    case NotionType.VIDEO:
      return (
        <VideoRenderer component={component} parent={parent}></VideoRenderer>
      );

    case NotionType.QUOTE:
      return (
        <QuoteRenderer component={component} parent={parent}></QuoteRenderer>
      );
    case NotionType.CALLOUT:
      return (
        <CalloutRenderer
          component={component}
          parent={parent}
        ></CalloutRenderer>
      );

    case NotionType.TOGGLE:
      return (
        <ToggleRenderer component={component} parent={parent}></ToggleRenderer>
      );

    case NotionType.CODE:
      return (
        <CodeRenderer component={component} parent={parent}></CodeRenderer>
      );
    case NotionType.EQUATION:
      return (
        <EquationRenderer
          component={component}
          parent={parent}
        ></EquationRenderer>
      );

    case NotionType.H1:
    case NotionType.H2:
    case NotionType.H3:
      return (
        <HeaderRenderer
          component={component}
          isRenderChildren={isRenderChildren}
          parent={parent}
        ></HeaderRenderer>
      );
    default:
      console.log('不能渲染的类型', component.type.trim());
      return <div></div>;
  }
};

export default UgcRender;
