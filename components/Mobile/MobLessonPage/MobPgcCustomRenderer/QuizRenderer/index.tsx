import { QuizType } from '@/components/ComponentRenderer/type';
import { FC, createContext } from 'react';

interface QuizRendererProps {
  quiz: QuizType;
  parent: any;
}

export const QuizContext = createContext<{
  onPass: VoidFunction;
  currentQuizIndex: number;
  parentQuiz: any;
}>({
  onPass: () => {},
  currentQuizIndex: 0,
  parentQuiz: {}
});

const QuizRenderer: FC<QuizRendererProps> = (props) => {
  return (
    <div className="w-full rounded-[.5rem] bg-neutral-off-white px-[1.25rem]  py-[1.125rem] text-neutral-black">
      <p className="text-h4 mb-[.625rem]">Quiz</p>
      <p className="caption-12pt">This is only available on desktop.</p>
    </div>
  );
};

export default QuizRenderer;
