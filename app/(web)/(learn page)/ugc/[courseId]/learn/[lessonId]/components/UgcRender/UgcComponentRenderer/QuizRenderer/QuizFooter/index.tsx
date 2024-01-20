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
        className="underline body-s text-neutral-off-black hover:text-black transition cursor-pointer"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer && 'Hide'}
        {!showAnswer && 'Hint'}
      </div>
    </div>
  );
};

export default QuizFooter;
