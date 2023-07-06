// import type { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints.d";

export enum AnnotationEnum {
  bold = 'bold',
  code = 'code',
  italic = 'italic',
  underline = 'underline',
  color = 'color'
}

export type AnnotationType = {
  bold: boolean;
  code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  color: string;
};

// https://developers.notion.com/reference/rich-text
export type RichTextType = {
  plain_text: string;
  href: string | null;
  annotations: AnnotationType;
  type: string;
  text: {
    content: string;
    link: {
      url: string;
    } | null;
  };
};

// https://developers.notion.com/reference/block
export enum BlockEnum {
  paragraph = 'paragraph',
  heading_1 = 'heading_1',
  heading_2 = 'heading_2',
  heading_3 = 'heading_3',
  callout = 'callout',
  quote = 'quote',
  bulleted_list_item = 'bulleted_list_item',
  numbered_list_item = 'numbered_list_item',
  code = 'code',
  image = 'image',
  video = 'video',
  unsupported = 'unsupported',
  divider = 'divider',

  // 2023.5.11 add
  column_list = 'column_list',
  column = 'column'

  //   to_do = "to_do",
  //   toggle = "toggle",
  //   child_page = "child_page",
  //   child_database = "child_database",
  //   embed = "embed",
  //   file = "file",
  //   pdf = "pdf",
  //   bookmark = "bookmark",
  //   equation = "equation",
  //   table_of_contents = "table_of_contents",
  //   link_to_page = "link_to_page",
  //   table = "table",
}
export enum BlockListEnum {
  bulleted_list_item = BlockEnum.bulleted_list_item,
  numbered_list_item = BlockEnum.numbered_list_item
}

type TextBlockType = {
  color: string;
  rich_text: RichTextType[];
};

type CodeBlockType = {
  rich_text: RichTextType[];
  caption: RichTextType[];
  language: string;
};

export type FileBlockType = {
  caption: RichTextType[];
  external: {
    url: string;
  };
  file: {
    expiry_time?: string;
    url: string;
  };
  type: string;
};

type CalloutBlockType = {
  color: string;
  icon: {
    emoji: string;
  };
  rich_text: RichTextType[];
};

// type ImageBlockType = {
//   caption: RichTextType[];
//   file: {
//     expiry_time?: string;
//     url: string;
//   };
//   type: string;
// };

export type BlockTypeName =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'code'
  | 'image'
  | 'video'
  | 'callout'
  | 'quote'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'unsupported'
  | 'divider';

type BaseBlock = {
  id: string;
  object: string;
  parent: any;
  created_time: any;
  last_edited_time: any;
  created_by: any;
  last_edited_by: any;
  has_children: boolean;
  archived: boolean;
};

type Paragraph = BaseBlock & { type: 'paragraph'; paragraph: TextBlockType };
export type Heading1 = BaseBlock & {
  type: 'heading_1';
  heading_1: TextBlockType;
};
export type Heading2 = BaseBlock & {
  type: 'heading_2';
  heading_2: TextBlockType;
};
export type Heading3 = BaseBlock & {
  type: 'heading_3';
  heading_3: TextBlockType;
};
type TableOfContents = BaseBlock & {
  type: 'table_of_contents';
  table_of_contents: { color: string };
};
type Code = BaseBlock & { type: 'code'; code: CodeBlockType };
type Image = BaseBlock & { type: 'image'; image: FileBlockType };
type Video = BaseBlock & { type: 'video'; video: FileBlockType };
type Callout = BaseBlock & { type: 'callout'; callout: CalloutBlockType };
type Quote = BaseBlock & { type: 'quote'; quote: TextBlockType };
type BulletedListItem = BaseBlock & {
  type: 'bulleted_list_item';
  bulleted_list_item: TextBlockType;
};
type NumberedListItem = BaseBlock & {
  type: 'numbered_list_item';
  numbered_list_item: TextBlockType;
};

type Unsupported = BaseBlock & {
  type: 'unsupported';
  unsupported: {};
};

type Divider = BaseBlock & {
  type: 'divider';
  divider: {};
};

export type BlockType =
  | Paragraph
  | Heading1
  | Heading2
  | Heading3
  | TableOfContents
  | Code
  | Image
  | Video
  | Callout
  | Quote
  | BulletedListItem
  | NumberedListItem
  | Unsupported
  | Divider;

export type BlockProps = {
  block: BlockType;
  prefix?: string;
  blockPrefix?: string;
  blocksPrefix?: string;
  isCodeHighlighter?: boolean;
  syntaxHighlighterCSS?: {
    [key: string]: React.CSSProperties;
  };
  darkMode?: boolean;
};

export type BlocksProps = Omit<BlockProps, 'block'> & {
  blocks: BlockType[];
};

export type TextProps = {
  richTextArr: any;
  isCaption?: boolean;
};

// export type FileProps = {
//   url: string;
// };
// export type ImageProps = {
//   url: string;
// };

export type CodeProps = {
  lang: string;
  richTextArr: RichTextType[];
  darkMode?: boolean;
};

export type BlockListProps = {
  blockType: string;
  children: JSX.Element[];
};

export type FileBlockProps = {
  block: FileBlockType;
};
