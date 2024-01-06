import { QuizBType } from '@/components/Web/Business/Renderer/type';

export type QuizOptionType = QuizBType['options'][number] & {
  isRender: boolean;
};

export interface AnswerType {
  id: string;
  answer: string;
  option: QuizOptionType | null;
  status: 'error' | 'default';
}

// export interface QuizBContextType {
//   onDrop: (item: AnswerType) => void;
//   answers: Record<string, AnswerType>;
//   setAnswers: Dispatch<SetStateAction<Record<string, AnswerType>>>;
//   showAnswer: boolean;
//   accept: QuizOptionType[];
//   changeOptionState: (options: QuizOptionType[]) => void;
// }

// export const QuizBContextDefaultValue = {
//   onDrop: (item: any) => {},
//   changeOptionState: (options: any) => {},
//   answers: {},
//   showAnswer: false,
//   setAnswers: () => {},
//   accept: []
// };
