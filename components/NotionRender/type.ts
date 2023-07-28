export enum NotionRenderType {
  H1 = 'heading_1',
  H2 = 'heading_2',
  H3 = 'heading_3',
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
  PARAGRAPH = 'paragraph'
}

export enum CustomRenderType {
  /** 自定义类型，两栏布局 */
  SECTION = 'section',
  /** 自定义类型，步骤框 */
  STEP = 'step',
  DESCRIPTION = 'description'
}

export interface AnnotationsType {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
}

type NotionLinkType = { url: string } | null;

export interface RichTextType {
  annotations: AnnotationsType;
  href: string | null;
  plain_text: string;
  [NotionRenderType.TEXT]: {
    link: NotionLinkType;
    content: string;
  };
  type: NotionRenderType.TEXT;
}
