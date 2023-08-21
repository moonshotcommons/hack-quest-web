import Button from '@/components/Common/Button';
import { FC, ReactNode } from 'react';

interface QuizFooterProps {
  showAnswer: boolean;
  setShowAnswer: (showAnswer: boolean) => void;
  onSubmit: VoidFunction;
  submitDisable?: boolean;
}

const QuizFooter: FC<QuizFooterProps> = (props) => {
  const { showAnswer, setShowAnswer, onSubmit, submitDisable = false } = props;
  return (
    <div className="flex justify-between items-center">
      <div
        className="underline font-next-book text-[#3E3E3E] tracking-[0.28px] leading-[125%] cursor-pointer"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer && 'Hidden me right answer '}
        {!showAnswer && 'Show me right answer'}
      </div>
      <Button
        className={`bg-[#FFD850] py-[8px] px-[40px] font-next-book text-[#0B0B0B] text-[14px] ${
          submitDisable ? 'opacity-40 cursor-not-allowed' : ''
        }`}
        disabled={submitDisable}
        onClick={() => onSubmit()}
      >
        Submit
      </Button>
    </div>
  );
};

export default QuizFooter;
