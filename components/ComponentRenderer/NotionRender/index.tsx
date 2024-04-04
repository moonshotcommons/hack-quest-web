'use client';

import { FC } from 'react';

import BulletedListItemRenderer from './BulletedListItem';
import CalloutRenderer from './CalloutRenderer';
import CodeRenderer from './CodeRenderer';
import EquationRenderer from './EquationRenderer';
import HeaderRenderer from './HeaderRenderer';
import ImageRenderer from './ImageRenderer';
import NumberListItemRenderer from './NumberListItemRenderer';
import ParagraphRenderer from './ParagraphRenderer';
import QuoteRenderer from './QuoteRenderer';
import ToggleRenderer from './ToggleRenderer';
import VideoRenderer from './VideoRenderer';
import { NotionComponent, NotionComponentType } from './type';

interface NotionRendererProps {
  // children: ReactNode
  parent: any;
  component: NotionComponent;
  isRenderChildren?: boolean;
}

export const NOTION_RENDERER_TYPES = [
  NotionComponentType.H1,
  NotionComponentType.H2,
  NotionComponentType.H3,
  NotionComponentType.PARAGRAPH,
  NotionComponentType.NUMBERED_LIST_ITEM,
  NotionComponentType.BULLETED_LIST_ITEM,
  NotionComponentType.IMAGE,
  NotionComponentType.VIDEO,
  NotionComponentType.QUOTE,
  NotionComponentType.CALLOUT,
  NotionComponentType.TOGGLE,
  NotionComponentType.CODE,
  NotionComponentType.EQUATION
];

const NotionRenderer: FC<NotionRendererProps> = (props) => {
  const { parent, component, isRenderChildren = true } = props;
  switch (component.type.trim()) {
    case NotionComponentType.PARAGRAPH:
      return <ParagraphRenderer component={component} parent={parent}></ParagraphRenderer>;
    case NotionComponentType.NUMBERED_LIST_ITEM:
      return <NumberListItemRenderer component={component} parent={parent}></NumberListItemRenderer>;
    case NotionComponentType.BULLETED_LIST_ITEM:
      return <BulletedListItemRenderer component={component} parent={parent}></BulletedListItemRenderer>;
    case NotionComponentType.IMAGE:
      return <ImageRenderer component={component} parent={parent}></ImageRenderer>;
    case NotionComponentType.VIDEO:
      return <VideoRenderer component={component} parent={parent}></VideoRenderer>;
    case NotionComponentType.QUOTE:
      return <QuoteRenderer component={component} parent={parent}></QuoteRenderer>;
    case NotionComponentType.CALLOUT:
      return <CalloutRenderer component={component} parent={parent}></CalloutRenderer>;
    case NotionComponentType.TOGGLE:
      return <ToggleRenderer component={component} parent={parent}></ToggleRenderer>;
    case NotionComponentType.CODE:
      return <CodeRenderer component={component} parent={parent}></CodeRenderer>;
    case NotionComponentType.EQUATION:
      return <EquationRenderer component={component} parent={parent}></EquationRenderer>;
    case NotionComponentType.H1:
    case NotionComponentType.H2:
    case NotionComponentType.H3:
      return (
        <HeaderRenderer component={component} isRenderChildren={isRenderChildren} parent={parent}></HeaderRenderer>
      );
    default:
      <div>{component.type}</div>;
  }
};

export default NotionRenderer;
