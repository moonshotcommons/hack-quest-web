import Button from '@/components/Common/Button';
import { FC } from 'react';

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
        className="underline font-next-book text-neutral-rich-gray hover:text-neutral-black transition tracking-[0.28px] leading-[125%] cursor-pointer"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer && 'Hide'}
        {!showAnswer && 'Hint'}
      </div>
      <Button
        type="primary"
        className={`py-[8px] px-[40px] font-next-book text-neutral-black text-[14px] ${
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
