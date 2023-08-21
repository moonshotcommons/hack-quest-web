import { FC, ReactNode, useState } from 'react';
import { QuizAType, QuizBType, QuizType } from '../../type';
import { FiChevronDown } from 'react-icons/fi';
import { PiCaretDownBold } from 'react-icons/pi';
import QuizDropdown from './QuizDropdwon';
import ComponentRenderer from '..';
import Button from '@/components/Common/Button';
interface QuizRendererProps {
  quiz: QuizType;
  parent: any;
}

const QuizRenderer: FC<QuizRendererProps> = (props) => {
  const { quiz, parent } = props;
  const [currentQuizIndex, setCurrentQuizIndex] = useState(1);
  const [quizDropdownVisible, setQuizDropdownVisible] = useState(false);
  const [start, setStart] = useState(parent.right.length <= 1);

  return (
    <>
      {start && (
        <div
          className={`rounded-[.625rem] pb-[20px] bg-[#E6E6E6] flex w-full h-full flex-col ${
            !quizDropdownVisible ? 'p-[20px]' : ''
          }`}
        >
          <div className={`flex justify-between h-fit w-full`}>
            <div
              className={`inline-flex font-next-poster-Bold items-center relative text-[18px] font-bold tracking-[1.08px] ${
                quizDropdownVisible && 'shadow-2xl'
              }
          `}
            >
              <div
                className={`inline-flex gap-2 box-content pb-[20px] ${
                  quizDropdownVisible
                    ? 'px-[20px] pt-[20px] border-b-2 border-[#8C8C8C]'
                    : ''
                }`}
                onClick={() => setQuizDropdownVisible(!quizDropdownVisible)}
              >
                <span>{`${quiz.title ? 'Quiz' : 'Quiz'} ${
                  currentQuizIndex + 1
                }/${quiz.children.length}`}</span>
                <FiChevronDown size={28} color=""></FiChevronDown>
              </div>
              <QuizDropdown
                quiz={quiz}
                onChange={(index) => setCurrentQuizIndex(index)}
                visible={quizDropdownVisible}
                currentQuizIndex={currentQuizIndex}
              ></QuizDropdown>
            </div>
            <div
              className={`${quizDropdownVisible ? 'p-[20px]' : ''}`}
              onClick={() => {
                setStart(false);
              }}
            >
              <PiCaretDownBold size={20}></PiCaretDownBold>
            </div>
          </div>
          <div className={`h-full ${quizDropdownVisible ? 'px-[20px]' : ''}`}>
            <ComponentRenderer
              parent={quiz}
              component={quiz.children[currentQuizIndex]}
            ></ComponentRenderer>
          </div>
        </div>
      )}
      {!start && (
        <div className="inline-flex h-fit justify-between items-center rounded-[.625rem] bg-[#E6E6E6]  w-full px-[20px] py-[8px]">
          <h1 className="font-next-poster-Bold text-[18px]">Quiz</h1>
          <Button
            className="bg-[#FFD850] py-[8px] px-[40px] font-next-book text-[#0B0B0B] text-[14px]"
            onClick={() => setStart(true)}
          >
            Start Quiz
          </Button>
        </div>
      )}
    </>
  );
};

export default QuizRenderer;
