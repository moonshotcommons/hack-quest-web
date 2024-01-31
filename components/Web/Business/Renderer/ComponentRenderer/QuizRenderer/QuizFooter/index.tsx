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
    <div className="flex items-center justify-between">
      <div
        className="cursor-pointer font-next-book leading-[125%] tracking-[0.28px] text-neutral-rich-gray underline transition hover:text-neutral-black"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer && 'Hide'}
        {!showAnswer && 'Hint'}
      </div>
      <Button
        type="primary"
        className={`px-[40px] py-[8px] font-next-book text-[14px] text-neutral-black ${
          submitDisable ? 'cursor-not-allowed opacity-40' : ''
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
