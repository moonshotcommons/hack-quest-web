import { FC, ReactNode } from 'react';
import {
  CustomComponent,
  CustomType,
  NotionComponent,
  NotionType,
  QuizAType,
  QuizBType,
  QuizType
} from '../type';

import ExampleRenderer from './ExampleRenderer';
import QuizRenderer from './QuizRenderer';
import QuizARenderer from './QuizRenderer/QuizARenderer';
import QuizBRenderer from './QuizRenderer/QuizBRenderer';
import ParagraphRenderer from '../../NotionRender/ParagraphRenderer';
import NumberListItemRenderer from '../../NotionRender/NumberListItemRenderer';
import BulletedListItemRenderer from '../../NotionRender/BulletedListItem';
import VideoRenderer from '../../NotionRender/VideoRenderer';
import QuoteRenderer from '../../NotionRender/QuoteRenderer';
import ToggleRenderer from '../../NotionRender/ToggleRenderer';
import CodeRenderer from '../../NotionRender/CodeRenderer';
import HeaderRenderer from '../../NotionRender/HeaderRenderer';
import ImageRenderer from '../../NotionRender/ImageRenderer';
import ContentRenderer from './ContentRenderer';

interface ComponentRendererProps {
  // children: ReactNode
  parent: any;
  component: CustomComponent | NotionComponent;
  isRenderChildren?: boolean;
}

const ComponentRenderer: FC<ComponentRendererProps> = (props) => {
  const { parent, component, isRenderChildren = true } = props;
  switch (component.type) {
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
          component={component as CustomComponent}
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

    case NotionType.TOGGLE:
      return (
        <ToggleRenderer component={component} parent={parent}></ToggleRenderer>
      );

    case NotionType.CODE:
      return (
        <CodeRenderer component={component} parent={parent}></CodeRenderer>
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
      return <div></div>;
  }
};

export default ComponentRenderer;
