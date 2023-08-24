import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState
} from 'react';
import { QuizAType, QuizBType, QuizType } from '../../type';
import { FiChevronDown } from 'react-icons/fi';
import { MdArrowDropDown } from 'react-icons/md';
import QuizDropdown from './QuizDropdwon';
import ComponentRenderer from '..';
import Button from '@/components/Common/Button';
import { message } from 'antd';
import QuizPassModal from './QuizPassModal';
import { useClickAway } from 'ahooks';
import { PlaygroundContext } from '../../Playground/type';
interface QuizRendererProps {
  quiz: QuizType;
  parent: any;
}

export const QuizContext = createContext<{ onPass: VoidFunction }>({
  onPass: () => {}
});

const QuizRenderer: FC<QuizRendererProps> = (props) => {
  const { quiz, parent } = props;
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizDropdownVisible, setQuizDropdownVisible] = useState(false);
  const [start, setStart] = useState(parent.right.length <= 1);
  const [passOpen, setPassOpen] = useState(false);
  const { onCompleted } = useContext(PlaygroundContext);
  const containerRef = useRef(null);

  const onPass = () => {
    setPassOpen(true);
    setTimeout(() => {
      // setCurrentQuizIndex(currentQuizIndex + 1);
      setPassOpen(false);
    }, 3000);
    if (currentQuizIndex !== quiz.children.length - 1) {
      return;
    }

    onCompleted();
  };

  useClickAway(() => {
    setQuizDropdownVisible(false);
  }, containerRef);

  const QuizHeader = (
    <div className={`flex justify-between h-fit w-full`}>
      <div
        className={`inline-flex font-next-poster-Bold items-center relative text-[18px] font-bold tracking-[1.08px] ${
          quizDropdownVisible && 'shadow-2xl'
        }`}
      >
        <div
          ref={containerRef as any}
          className={`inline-flex gap-2 box-content border-b-2 pb-[20px] cursor-pointer min-h-fit ${
            quizDropdownVisible ? 'px-[20px] pt-[20px] border-[#8C8C8C]' : ''
          }`}
          onClick={() => {
            setQuizDropdownVisible(!quizDropdownVisible);
          }}
        >
          <span>{`${quiz.title ? quiz.title : 'Quiz'} ${currentQuizIndex + 1}/${
            quiz.children.length
          }`}</span>

          <span
            className={`${
              quizDropdownVisible ? 'rotate-180' : ''
            } transition-transform`}
          >
            <MdArrowDropDown size={28} color=""></MdArrowDropDown>
          </span>
        </div>

        {quizDropdownVisible ? (
          <QuizDropdown
            quiz={quiz}
            onChange={(index) => setCurrentQuizIndex(index)}
            currentQuizIndex={currentQuizIndex}
          ></QuizDropdown>
        ) : null}
      </div>
      <div
        className={`${quizDropdownVisible ? 'p-[20px]' : ''}`}
        onClick={() => {
          setStart(false);
        }}
      >
        <FiChevronDown
          size={28}
          color=""
          className={`rotate-180`}
        ></FiChevronDown>
      </div>
    </div>
  );

  return (
    <>
      {start && (
        <div
          className={`rounded-[.625rem] pb-[20px] bg-[#E6E6E6] flex w-full min-h-fit flex-1 flex-col ${
            !quizDropdownVisible ? 'p-[20px]' : ''
          }`}
        >
          {QuizHeader}
          <QuizContext.Provider value={{ onPass }}>
            <div className={`h-full ${quizDropdownVisible ? 'px-[20px]' : ''}`}>
              <ComponentRenderer
                parent={quiz}
                component={quiz.children[currentQuizIndex]}
              ></ComponentRenderer>
            </div>
          </QuizContext.Provider>
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
      <QuizPassModal
        open={passOpen}
        onClose={() => setPassOpen(true)}
      ></QuizPassModal>
    </>
  );
};

export default QuizRenderer;
