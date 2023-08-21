import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext
} from 'react';
import { QuizBType } from '../../../type';

export type QuizOptionType = QuizBType['options'][number] & {
  isRender: boolean;
};

export interface AnswerType {
  id: string;
  answer: string;
  option: QuizOptionType | null;
}

interface QuizBContextType {
  onDrop: (item: AnswerType) => void;
  answers: Record<string, AnswerType>;
  setAnswers: Dispatch<SetStateAction<Record<string, AnswerType>>>;
  showAnswer: boolean;
  accept: QuizOptionType[];
  changeOptionState: (options: QuizOptionType[]) => void;
}

export const QuizBContext = createContext<QuizBContextType>({
  onDrop: (item: any) => {},
  changeOptionState: (options) => {},
  answers: {},
  showAnswer: false,
  setAnswers: () => {},
  accept: []
});
