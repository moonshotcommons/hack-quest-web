export enum HelperType {
  Chat = 'Chat',
  SummarizeContent = 'SummarizeContent',
  ExpandContent = 'ExpandContent',
  RelatedContent = 'RelatedContent',
  ExplainExample = 'ExplainExample',
  ExplainQuiz = 'ExplainQuiz'
}

export enum ChatRole {
  Assistant = 'ai',
  Human = 'human'
}

export interface CompletionsInput {
  type: HelperType; // Chat, SummarizeContent, ExpandContent, RelatedContent, ExplainExample, ExplainQuiz
  content: string;
  pageId: string;
  exampleNum: number; // 0, 1, 2
  quizNum: number; // 0, 1, 2
}

export interface CompletionsRes {
  id: string;
  message: {
    type: ChatRole;
    content: string;
  };
}

export interface DocsItem {
  id: string;
  title: string;
  alias: string;
  content: [];
  parentId: string;
  createdAt: string;
  updatedAt: string;
  children: DocsItem[];
}
