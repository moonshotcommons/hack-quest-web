import { cn } from '@/helper/utils';
import { FC } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { QuizType } from '../../../type';
interface QuizDropdownProps {
  quiz: QuizType;
  onChange?: (index: number) => void;
  currentQuizIndex: number;
}

const QuizDropdown: FC<QuizDropdownProps> = (props) => {
  const { quiz, onChange, currentQuizIndex } = props;

  return (
    <>
      <div className="absolute left-0 top-[100%] w-full z-50">
        {quiz.children.map((quizChild: any, index: number) => {
          return (
            <div
              key={quizChild.id}
              onClick={() => {
                (quizChild.isCompleted ||
                  quiz.children[index - 1]?.isCompleted) &&
                  onChange?.(index);
              }}
              className={cn(
                `px-[20px] py-[8px] text-[14px] bg-white tracking-[0.28px] leading-[125%] font-next-book cursor-pointer flex items-center gap-[20px] hover:bg-[#F4F4F4]`,
                index === quiz.children.length - 1 && 'rounded-b-lg',
                currentQuizIndex === index && 'bg-[#F4F4F4]',
                !quizChild.isCompleted && !quiz.children[index - 1]?.isCompleted
                  ? 'cursor-not-allowed'
                  : ''
              )}
            >
              <span>
                {`${quiz.title ? 'Quiz' : 'Quiz'} ${index + 1}/${
                  quiz.children.length
                }`}
              </span>
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
