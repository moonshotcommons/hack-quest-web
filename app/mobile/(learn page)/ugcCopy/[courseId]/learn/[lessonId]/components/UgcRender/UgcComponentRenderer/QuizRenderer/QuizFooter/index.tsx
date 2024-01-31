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
    <div className="flex items-center justify-between">
      <div
        className="body-s cursor-pointer text-neutral-off-black underline transition hover:text-neutral-black"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer && 'Hide'}
        {!showAnswer && 'Hint'}
      </div>
    </div>
  );
};

export default QuizFooter;
