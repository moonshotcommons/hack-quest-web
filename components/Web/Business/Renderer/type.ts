export enum NotionType {
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
  PARAGRAPH = 'paragraph',
  CALLOUT = 'callout',
  EQUATION = 'equation'
}

export enum CustomType {
  Quiz = 'Quiz',
  QuizA = 'QuizA',
  QuizB = 'QuizB',
  QuizC = 'QuizC',
  Content = 'Content',
  Example = 'Example',
  Reading = 'READING',
  Video = 'VIDEO'
}

export enum LineType {
  /* 正常渲染的code文本 */
  DEFAULT = 'default',
  /* 单行既有文本也有Input框 */
  INSERT_INPUT = 'insert_input',
  /* 单行或多行为Input框 */
  INPUT = 'input',
  /* 注释 */
  ANNOTATION = 'annotation'
}

export interface CodeLineType {
  id: string;
  type: LineType;
  content: string;
  lineNumber: number;
  regex: string;
  answers: {
    regex: string;
    content: string[];
    type: LineType;
  }[];
}

export interface LessonContent {
  left: CustomComponent[];
  right: CustomComponent[];
}

export interface CustomComponent {
  id: string;
  type: NotionType | CustomType;
  children: (NotionComponent | CustomComponent)[];
  content: any;
  notionType: NotionType;
  isCustomType: boolean;
  isToggle: boolean;
  title: string;
  isCompleted?: boolean;
}

export interface NotionComponent {
  id: string;
  type: NotionType | CustomType;
  children?: (NotionComponent | CustomComponent)[];
  content: any;
  isCustomType: boolean;
  isToggle: boolean;
  isCompleted?: boolean;
}

export interface QuizType extends CustomComponent {
  type: CustomType.Quiz;
}

export interface QuizAType extends CustomComponent {
  type: CustomType.QuizA;
  sourceEditorCode: object;
  answerRegex: string[];
  lines: CodeLineType[];
}

export interface QuizBType extends CustomComponent {
  options: (NotionComponent & { type: NotionType.BULLETED_LIST_ITEM })[];
  children: (NotionComponent & { content: { isGapFill: boolean }[] })[];
}

export interface CodeFileComponent extends CustomComponent {
  filename: string;
  isActive: boolean;
  codeContent: NotionComponent;
}

export interface ExampleComponent extends CustomComponent {
  renderIdeBtn: boolean;
  codeFiles: CodeFileComponent[];
}
