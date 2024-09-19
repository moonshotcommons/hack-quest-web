export * from './NotionRender/type';
import { NotionComponent, NotionComponentType } from './NotionRender/type';

export enum CustomType {
  Quiz = 'Quiz',
  QUIZ = 'QUIZ',
  QuizA = 'QuizA',
  QuizB = 'QuizB',
  QuizC = 'QuizC',
  QuizD = 'QuizD',
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
  type: NotionComponentType | CustomType;
  children: (NotionComponent | CustomComponent)[];
  content: any;
  notionType: NotionComponentType;
  isCustomType: boolean;
  isToggle: boolean;
  title: string;
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
  hint?: CustomComponent;
}

export interface QuizBType extends CustomComponent {
  options: (NotionComponent & { type: NotionComponentType.BULLETED_LIST_ITEM })[];
  children: (NotionComponent & { content: { isGapFill: boolean }[] })[];
  hint?: CustomComponent;
}

export interface CodeFileComponent extends CustomComponent {
  filename: string;
  isActive: boolean;
  codeContent: NotionComponent;
}

export interface ExampleComponent extends CustomComponent {
  renderIdeBtn: boolean;
  codeFiles: CodeFileComponent[];
  ideUrl?: string;
}

export enum PageType {
  PGC = 'pgc',
  UGC = 'ugc',
  BLOG = 'blog',
  GLOSSARY = 'glossary',
  MINI = 'mini',
  DOCUMENTATION = 'documentation',
  DOCUMENTATION_FULL = 'documentation_full',
  HACKATHON = 'hackathon',
  DAILY_CHALLENGE = 'daily_challenge'
}

export const QUIZ_ITEM_TYPES = [CustomType.QuizA, CustomType.QuizB, CustomType.QuizC, CustomType.QuizD];
