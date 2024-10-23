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
import { CustomComponent } from '../type';
import BookmarkRenderer from './BookmarkRenderer';
import DividerRenderer from './DividerRenderer';
import ColumnListRenderer from './ColumnListRenderer';

interface NotionRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  parent: any;
  component: NotionComponent;
  isRenderChildren?: boolean;
  isFullscreen?: boolean;
}

export const NOTION_RENDERER_TYPES = [
  NotionComponentType.H1,
  NotionComponentType.H2,
  NotionComponentType.H3,
  NotionComponentType.H4,
  NotionComponentType.H5,
  NotionComponentType.H6,
  NotionComponentType.PARAGRAPH,
  NotionComponentType.NUMBERED_LIST_ITEM,
  NotionComponentType.BULLETED_LIST_ITEM,
  NotionComponentType.IMAGE,
  NotionComponentType.VIDEO,
  NotionComponentType.QUOTE,
  NotionComponentType.CALLOUT,
  NotionComponentType.TOGGLE,
  NotionComponentType.CODE,
  NotionComponentType.EQUATION,
  NotionComponentType.BOOKMARK,
  NotionComponentType.DIVIDER,
  NotionComponentType.COLUMN_LIST
];

const NotionRenderer: FC<NotionRendererProps> = (props) => {
  const { component } = props;
  switch (component.type.trim()) {
    case NotionComponentType.PARAGRAPH:
      return <ParagraphRenderer {...props}></ParagraphRenderer>;
    case NotionComponentType.NUMBERED_LIST_ITEM:
      return <NumberListItemRenderer {...props}></NumberListItemRenderer>;
    case NotionComponentType.BULLETED_LIST_ITEM:
      return <BulletedListItemRenderer {...props}></BulletedListItemRenderer>;
    case NotionComponentType.IMAGE:
      return <ImageRenderer {...props}></ImageRenderer>;
    case NotionComponentType.VIDEO:
      return <VideoRenderer {...props}></VideoRenderer>;
    case NotionComponentType.QUOTE:
      return <QuoteRenderer {...props}></QuoteRenderer>;
    case NotionComponentType.CALLOUT:
      return <CalloutRenderer {...props}></CalloutRenderer>;
    case NotionComponentType.TOGGLE:
      return <ToggleRenderer {...props}></ToggleRenderer>;
    case NotionComponentType.CODE:
      return <CodeRenderer {...props}></CodeRenderer>;
    case NotionComponentType.EQUATION:
      return <EquationRenderer {...props}></EquationRenderer>;
    case NotionComponentType.BOOKMARK:
      return <BookmarkRenderer {...props}></BookmarkRenderer>;
    case NotionComponentType.DIVIDER:
      return <DividerRenderer {...props}></DividerRenderer>;
    case NotionComponentType.COLUMN_LIST:
      return <ColumnListRenderer {...props}></ColumnListRenderer>;
    case NotionComponentType.H1:
    case NotionComponentType.H2:
    case NotionComponentType.H3:
    case NotionComponentType.H4:
    case NotionComponentType.H5:
    case NotionComponentType.H6:
      return <HeaderRenderer {...props}></HeaderRenderer>;
    default:
      <div>{component.type}</div>;
  }
};

export default NotionRenderer;
