// interface Quiz

export interface Quiz {
  id: string;
  type: string;
  object: string;
  archived: boolean;
  children: Children[];
  created_by: CreatedBy2;
  created_time: string;
  // has_children: boolean;
  last_edited_by: LastEditedBy2;
  parent_block_id: string;
  last_edited_time: string;
  bulleted_list_item: BulletedListItem;
}

export interface Children {
  id: string;
  code: Code;
  type: string;
  object: string;
  archived: boolean;
  created_by: CreatedBy;
  created_time: string;
  // has_children: boolean;
  last_edited_by: LastEditedBy;
  parent_block_id: string;
  last_edited_time: string;
}

export interface Code {
  caption: any[];
  language: string;
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

export interface CreatedBy2 {
  id: string;
  object: string;
}

export interface LastEditedBy2 {
  id: string;
  object: string;
}

export interface BulletedListItem {
  color: string;
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
