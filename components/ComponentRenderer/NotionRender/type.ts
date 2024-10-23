import { CustomComponent, CustomType } from '../type';

export enum NotionComponentType {
  H1 = 'heading_1',
  H2 = 'heading_2',
  H3 = 'heading_3',
  H4 = 'heading_4',
  H5 = 'heading_5',
  H6 = 'heading_6',
  IMAGE = 'image',
  QUOTE = 'quote',
  TOGGLE = 'toggle',
  CODE = 'code',
  TEXT = 'text',
  NUMBERED_LIST_ITEM = 'numbered_list_item',
  BULLETED_LIST_ITEM = 'bulleted_list_item',
  /** 视频 */
  VIDEO = 'video',
  COLUMN_LIST = 'column_list',
  COLUMN = 'column',
  PARAGRAPH = 'paragraph',
  CALLOUT = 'callout',
  EQUATION = 'equation',
  BOOKMARK = 'bookmark',
  DIVIDER = 'divider'
}

export interface AnnotationsType {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
}

export type NotionLinkType = { url: string } | null;

export interface RichTextType {
  annotations: AnnotationsType;
  href: string | null;
  plain_text: string;
  [NotionComponentType.TEXT]: {
    link: NotionLinkType;
    content: string;
  };
  type: NotionComponentType.TEXT;
}

export interface NotionComponent {
  id: string;
  type: NotionComponentType | CustomType;
  children?: (NotionComponent | CustomComponent)[];
  content: any;
  isCustomType: boolean;
  isToggle: boolean;
  isCompleted?: boolean;
}
