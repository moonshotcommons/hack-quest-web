import { QuizBType } from '@/components/Web/Business/Renderer/type';
import { Dispatch, SetStateAction, createContext } from 'react';
import { AnswerState } from '@/hooks/useParseQuiz';

//#region quizA
interface QuizAContextType {
  answers: AnswerState[];
  setAnswers: Dispatch<SetStateAction<Record<string, any>>>;
  showAnswer: boolean;
}

export const QuizAContextDefaultValue: QuizAContextType = {
  answers: [],
  showAnswer: false,
  setAnswers: () => {}
};
//#endregion

// #region QuizB
export type QuizOptionType = QuizBType['options'][number] & {
  isRender: boolean;
};

export interface AnswerType {
  id: string;
  answer: string;
  option: QuizOptionType | null;
  status: 'error' | 'default';
}

export interface QuizBContextType {
  onDrop: (item: AnswerType) => void;
  answers: Record<string, AnswerType>;
  setAnswers: Dispatch<SetStateAction<Record<string, AnswerType>>>;
  showAnswer: boolean;
  accept: QuizOptionType[];
  changeOptionState: (options: QuizOptionType[]) => void;
  quiz: any;
}

export const QuizBContextDefaultValue = {
  onDrop: (item: any) => {},
  changeOptionState: (options: any) => {},
  answers: {},
  showAnswer: false,
  setAnswers: () => {},
  accept: [],
  quiz: {}
};

// #endregion

export const ExampleContext = createContext({
  updateExampleContent: (value: string) => {},
  isExample: false
});

export interface GlobalContextType {
  onCompleted?: VoidFunction;
  onQuizPass?: VoidFunction;
}

export const GlobalContextDefaultValue: GlobalContextType = {
  onCompleted: () => {},
  onQuizPass: () => {}
};

export interface RendererContextType {
  textRenderer?: {
    fontSize: string;
  };
  quizBRendererContext?: QuizBContextType;
  quizARendererContext?: QuizAContextType;
  globalContext?: GlobalContextType;
}

export const RendererContext = createContext<RendererContextType>({
  textRenderer: { fontSize: '14px' },
  quizBRendererContext: QuizBContextDefaultValue,
  quizARendererContext: QuizAContextDefaultValue,
  globalContext: GlobalContextDefaultValue
});
