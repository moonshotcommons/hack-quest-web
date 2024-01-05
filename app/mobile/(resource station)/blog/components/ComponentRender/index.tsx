import {
  CustomComponent,
  NotionComponent,
  NotionType
} from '@/components/v2/Business/Renderer/type';
import { FC } from 'react';

import BulletedListItemRenderer from './NotionRender/BulletedListItem';
import CalloutRenderer from './NotionRender/CalloutRenderer';
import EquationRenderer from './NotionRender/EquationRenderer';
import HeaderRenderer from './NotionRender/HeaderRenderer';
import ImageRenderer from './NotionRender/ImageRenderer';
import NumberListItemRenderer from './NotionRender/NumberListItemRenderer';
import ParagraphRenderer from './NotionRender/ParagraphRenderer';
import QuoteRenderer from './NotionRender/QuoteRenderer';
import ToggleRenderer from './NotionRender/ToggleRenderer';
import VideoRenderer from './NotionRender/VideoRenderer';
import CodeRenderer from './NotionRender/CodeRenderer';

interface ComponentRendererProps {
  // children: ReactNode
  parent: any;
  component: CustomComponent | NotionComponent;
  isRenderChildren?: boolean;
}

const ComponentRenderer: FC<ComponentRendererProps> = (props) => {
  const { parent, component, isRenderChildren = true } = props;
  switch (component.type.trim()) {
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

export default ComponentRenderer;
