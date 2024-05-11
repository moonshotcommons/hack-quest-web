import { QuizType } from '@/components/ComponentRenderer/type';
import { cn } from '@/helper/utils';
import { FC } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
interface QuizDropdownProps {
  quiz: QuizType;
  onChange?: (index: number) => void;
  currentQuizIndex: number;
}

const QuizDropdown: FC<QuizDropdownProps> = (props) => {
  const { quiz, onChange, currentQuizIndex } = props;

  return (
    <>
      <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full rounded-[8px] border border-neutral-light-gray">
        {quiz.children.map((quizChild: any, index: number) => {
          return (
            <div
              key={quizChild.id}
              onClick={() => {
                (quizChild.isCompleted || quiz.children[index - 1]?.isCompleted) && onChange?.(index);
              }}
              className={cn(
                `body-s flex cursor-pointer items-center gap-6 bg-neutral-white px-3 py-[8px]`,
                index === quiz.children.length - 1 && 'rounded-b-lg',
                currentQuizIndex === index && 'bg-neutral-off-white',
                !quizChild.isCompleted && !quiz.children[index - 1]?.isCompleted
                  ? 'cursor-not-allowed'
                  : 'hover:bg-neutral-off-white'
              )}
            >
              <span>{`${quiz.title ? 'Quiz' : 'Quiz'} ${index + 1}/${quiz.children.length}`}</span>
              <BsCheckCircleFill
                size={20}
                color={`${quizChild.isCompleted ? '#00C365' : '#E6E6E6'}`}
              ></BsCheckCircleFill>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QuizDropdown;
