'use client';
import {
  CustomComponent,
  CustomType,
  NotionComponent,
  NotionType,
  QuizAType,
  QuizBType,
  QuizType
} from '@/components/Web/Business/Renderer/type';
import { FC } from 'react';

import BulletedListItemRenderer from './UgcNotionRenderer/BulletedListItem';
import CalloutRenderer from './UgcNotionRenderer/CalloutRenderer';
import CodeRenderer from './UgcNotionRenderer/CodeRenderer';
import EquationRenderer from './UgcNotionRenderer/EquationRenderer';
import HeaderRenderer from './UgcNotionRenderer/HeaderRenderer';
import ImageRenderer from './UgcNotionRenderer/ImageRenderer';
import NumberListItemRenderer from './UgcNotionRenderer/NumberListItemRenderer';
import ParagraphRenderer from './UgcNotionRenderer/ParagraphRenderer';
import QuoteRenderer from './UgcNotionRenderer/QuoteRenderer';
import ToggleRenderer from './UgcNotionRenderer/ToggleRenderer';
import VideoRenderer from './UgcNotionRenderer/VideoRenderer';
import ContentRenderer from './UgcComponentRenderer/ContentRenderer';
import QuizARenderer from './UgcComponentRenderer/QuizRenderer/QuizARenderer';
import QuizBRenderer from './UgcComponentRenderer/QuizRenderer/QuizBRenderer';
import QuizCRenderer from './UgcComponentRenderer/QuizRenderer/QuizCRenderer';
import QuizRenderer from './UgcComponentRenderer/QuizRenderer';

interface ComponentRendererProps {
  // children: ReactNode
  parent: any;
  component: CustomComponent | NotionComponent;
  isRenderChildren?: boolean;
}

const ComponentRenderer: FC<ComponentRendererProps> = (props) => {
  const { parent, component, isRenderChildren = true } = props;
  switch (component.type.trim()) {
    case CustomType.Reading:
    case CustomType.Video:
    case CustomType.Content:
      return <ContentRenderer component={component as CustomComponent} parent={parent as any}></ContentRenderer>;
    case CustomType.QUIZ:
      return <QuizRenderer quiz={component as QuizType} parent={parent}></QuizRenderer>;
    case CustomType.QuizA:
      return <QuizARenderer parent={parent} quiz={component as QuizAType}></QuizARenderer>;
    case CustomType.QuizB:
      return <QuizBRenderer parent={parent} quiz={component as QuizBType}></QuizBRenderer>;
    case CustomType.QuizC:
      return <QuizCRenderer parent={parent} quiz={component as QuizBType}></QuizCRenderer>;
    case NotionType.PARAGRAPH:
      return <ParagraphRenderer component={component} parent={parent}></ParagraphRenderer>;
    case NotionType.NUMBERED_LIST_ITEM:
      return <NumberListItemRenderer component={component} parent={parent}></NumberListItemRenderer>;
    case NotionType.BULLETED_LIST_ITEM:
      return <BulletedListItemRenderer component={component} parent={parent}></BulletedListItemRenderer>;

    case NotionType.IMAGE:
      return <ImageRenderer component={component} parent={parent}></ImageRenderer>;

    case NotionType.VIDEO:
      return <VideoRenderer component={component} parent={parent}></VideoRenderer>;

    case NotionType.QUOTE:
      return <QuoteRenderer component={component} parent={parent}></QuoteRenderer>;
    case NotionType.CALLOUT:
      return <CalloutRenderer component={component} parent={parent}></CalloutRenderer>;

    case NotionType.TOGGLE:
      return <ToggleRenderer component={component} parent={parent}></ToggleRenderer>;

    case NotionType.CODE:
      return <CodeRenderer component={component} parent={parent}></CodeRenderer>;
    case NotionType.EQUATION:
      return <EquationRenderer component={component} parent={parent}></EquationRenderer>;

    case NotionType.H1:
    case NotionType.H2:
    case NotionType.H3:
      return (
        <HeaderRenderer component={component} isRenderChildren={isRenderChildren} parent={parent}></HeaderRenderer>
      );
    default:
      console.log('不能渲染的类型', component.type.trim());
      return <div></div>;
  }
};

export default ComponentRenderer;
