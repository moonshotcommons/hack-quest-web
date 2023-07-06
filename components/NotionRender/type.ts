export type Root = Root2[];

export interface Root2 {
  id: string;
  type: string;
  object: string;
  parent: Parent;
  archived: boolean;
  children: Children[];
  heading_1: Heading1;
  created_by: CreatedBy4;
  created_time: string;
  has_children: boolean;
  last_edited_by: LastEditedBy4;
  last_edited_time: string;
}

export interface Parent {
  type: string;
  page_id: string;
}

export interface Children {
  id: string;
  type: string;
  object: string;
  archived: boolean;
  children: Children2[];
  heading_3?: Heading3;
  created_by: CreatedBy3;
  created_time: string;
  has_children: boolean;
  last_edited_by: LastEditedBy3;
  parent_block_id: string;
  last_edited_time: string;
  bulleted_list_item?: BulletedListItem2;
}

export interface Children2 {
  id: string;
  type: string;
  object: string;
  archived: boolean;
  paragraph?: Paragraph;
  created_by: CreatedBy;
  created_time: string;
  has_children: boolean;
  last_edited_by: LastEditedBy;
  parent_block_id: string;
  last_edited_time: string;
  code?: Code;
  children?: Children3[];
  bulleted_list_item?: BulletedListItem;
}

export interface Paragraph {
  color: string;
  rich_text: RichText[];
}

export interface RichText {
  href: any;
  text: Text;
  type: string;
  plain_text: string;
  annotations: Annotations;
}

export interface Text {
  link: any;
  content: string;
}

export interface Annotations {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

export interface CreatedBy {
  id: string;
  object: string;
}

export interface LastEditedBy {
  id: string;
  object: string;
}

export interface Code {
  caption: any[];
  language: string;
  rich_text: RichText2[];
}

export interface RichText2 {
  href: any;
  text: Text2;
  type: string;
  plain_text: string;
  annotations: Annotations2;
}

export interface Text2 {
  link: any;
  content: string;
}

export interface Annotations2 {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

export interface Children3 {
  id: string;
  type: string;
  object: string;
  archived: boolean;
  paragraph?: Paragraph2;
  created_by: CreatedBy2;
  created_time: string;
  has_children: boolean;
  last_edited_by: LastEditedBy2;
  parent_block_id: string;
  last_edited_time: string;
  code?: Code2;
  callout?: Callout;
}

export interface Paragraph2 {
  color: string;
  rich_text: RichText3[];
}

export interface RichText3 {
  href: any;
  text: Text3;
  type: string;
  plain_text: string;
  annotations: Annotations3;
}

export interface Text3 {
  link: any;
  content: string;
}

export interface Annotations3 {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

export interface CreatedBy2 {
  id: string;
  object: string;
}

export interface LastEditedBy2 {
  id: string;
  object: string;
}

export interface Code2 {
  caption: any[];
  language: string;
  rich_text: RichText4[];
}

export interface RichText4 {
  href: any;
  text: Text4;
  type: string;
  plain_text: string;
  annotations: Annotations4;
}

export interface Text4 {
  link: any;
  content: string;
}

export interface Annotations4 {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

export interface Callout {
  icon: Icon;
  color: string;
  rich_text: RichText5[];
}

export interface Icon {
  type: string;
  emoji: string;
}

export interface RichText5 {
  href: any;
  text: Text5;
  type: string;
  plain_text: string;
  annotations: Annotations5;
}

export interface Text5 {
  link: any;
  content: string;
}

export interface Annotations5 {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

export interface BulletedListItem {
  color: string;
  rich_text: RichText6[];
}

export interface RichText6 {
  href: any;
  text: Text6;
  type: string;
  plain_text: string;
  annotations: Annotations6;
}

export interface Text6 {
  link: any;
  content: string;
}

export interface Annotations6 {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

export interface Heading3 {
  color: string;
  rich_text: RichText7[];
  is_toggleable: boolean;
}

export interface RichText7 {
  href: any;
  text: Text7;
  type: string;
  plain_text: string;
  annotations: Annotations7;
}

export interface Text7 {
  link: any;
  content: string;
}

export interface Annotations7 {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

export interface CreatedBy3 {
  id: string;
  object: string;
}

export interface LastEditedBy3 {
  id: string;
  object: string;
}

export interface BulletedListItem2 {
  color: string;
  rich_text: RichText8[];
}

export interface RichText8 {
  href: any;
  text: Text8;
  type: string;
  plain_text: string;
  annotations: Annotations8;
}

export interface Text8 {
  link: any;
  content: string;
}

export interface Annotations8 {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

export interface Heading1 {
  color: string;
  rich_text: RichText9[];
  is_toggleable: boolean;
}

export interface RichText9 {
  href: any;
  text: Text9;
  type: string;
  plain_text: string;
  annotations: Annotations9;
}

export interface Text9 {
  link: any;
  content: string;
}

export interface Annotations9 {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

export interface CreatedBy4 {
  id: string;
  object: string;
}

export interface LastEditedBy4 {
  id: string;
  object: string;
}
