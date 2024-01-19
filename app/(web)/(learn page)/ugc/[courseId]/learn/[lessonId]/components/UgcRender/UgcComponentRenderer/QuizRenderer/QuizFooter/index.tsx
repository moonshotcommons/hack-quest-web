import { FC } from 'react';

interface QuizFooterProps {
  showAnswer: boolean;
  setShowAnswer: (showAnswer: boolean) => void;
  onSubmit?: VoidFunction;
  submitDisable?: boolean;
}

const QuizFooter: FC<QuizFooterProps> = (props) => {
  const { showAnswer, setShowAnswer } = props;
  return (
    <div className="flex justify-between items-center">
      <div
        className="underline font-next-book text-[#3E3E3E] hover:text-black transition tracking-[0.28px] leading-[125%] cursor-pointer"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer && 'Hide'}
        {!showAnswer && 'Hint'}
      </div>
    </div>
  );
};

export default QuizFooter;
