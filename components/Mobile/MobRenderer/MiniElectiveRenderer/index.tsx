import { CustomComponent, CustomType, NotionComponent, NotionType, QuizAType, QuizBType } from '@/components/Web/Business/Renderer/type';
import { FC } from 'react';

import BulletedListItemRenderer from '@/components/Web/Business/NotionRender/BulletedListItem';
import CalloutRenderer from '@/components/Web/Business/NotionRender/CalloutRenderer';
import CodeRenderer from '@/components/Web/Business/NotionRender/CodeRenderer';
import EquationRenderer from '@/components/Web/Business/NotionRender/EquationRenderer';
import HeaderRenderer from '@/components/Web/Business/NotionRender/HeaderRenderer';
import ImageRenderer from '@/components/Web/Business/NotionRender/ImageRenderer';
import NumberListItemRenderer from '@/components/Web/Business/NotionRender/NumberListItemRenderer';
import ParagraphRenderer from '@/components/Web/Business/NotionRender/ParagraphRenderer';
import QuoteRenderer from '@/components/Web/Business/NotionRender/QuoteRenderer';
import ToggleRenderer from '@/components/Web/Business/NotionRender/ToggleRenderer';
import VideoRenderer from '@/components/Web/Business/NotionRender/VideoRenderer';
import ContentRenderer from './ContentRenderer';
import QuizARenderer from './QuizRenderer/QuizARenderer';
import QuizBRenderer from './QuizRenderer/QuizBRenderer';
import QuizCRenderer from './QuizRenderer/QuizCRenderer';

interface ComponentRendererProps {
  // children: ReactNode
  parent: any;
  component: CustomComponent | NotionComponent;
  isRenderChildren?: boolean;
}

const ComponentRenderer: FC<ComponentRendererProps> = (props) => {
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
      return <HeaderRenderer component={component} isRenderChildren={isRenderChildren} parent={parent}></HeaderRenderer>;
    default:
      console.log('不能渲染的类型', component.type.trim());
      return <div></div>;
  }
};

export default ComponentRenderer;
