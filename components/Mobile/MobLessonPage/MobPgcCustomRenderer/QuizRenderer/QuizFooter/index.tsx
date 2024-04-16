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
        className="underline-s cursor-pointer transition hover:text-neutral-black"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer && 'Hide'}
        {!showAnswer && 'Hint'}
      </div>
      <Button
        type="primary"
        className={`body-s px-[40px] py-[8px] text-neutral-black ${submitDisable ? 'cursor-not-allowed opacity-40' : ''}`}
        disabled={submitDisable}
        onClick={() => onSubmit()}
      >
        Submit
      </Button>
    </div>
  );
};

export default QuizFooter;
