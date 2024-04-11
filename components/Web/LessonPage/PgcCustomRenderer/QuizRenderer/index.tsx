import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { useClickAway } from 'ahooks';
import JSConfetti from 'js-confetti';
import { FC, createContext, useContext, useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { MdArrowDropDown } from 'react-icons/md';
import { PlaygroundContext } from '@/components/Web/LessonPage/Playground/type';
import QuizDropdown from './QuizDropdwon';
import QuizPassModal from './QuizPassModal';
import { QuizType } from '@/components/ComponentRenderer/type';
import { ComponentRenderer } from '@/components/ComponentRenderer';

interface QuizRendererProps {
  quiz: QuizType;
  parent: any;
}

export const QuizContext = createContext<{
  onPass: VoidFunction;
  currentQuizIndex: number;
  parentQuiz: any;
}>({
  onPass: () => {},
  currentQuizIndex: 0,
  parentQuiz: {}
});

const QuizRenderer: FC<QuizRendererProps> = (props) => {
  const { quiz: propsQuiz, parent } = props;
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizDropdownVisible, setQuizDropdownVisible] = useState(false);
  const [start, setStart] = useState(parent.right.length <= 1);
  const [passOpen, setPassOpen] = useState(false);
  const { onCompleted, lesson } = useContext(PlaygroundContext);

  const containerRef = useRef(null);

  const [quiz, setQuiz] = useState(propsQuiz);

  const onPass = () => {
    webApi.courseApi.completeQuiz(lesson.id, currentQuizIndex).then((res) => {
      quiz.children[currentQuizIndex].isCompleted = true;
      setQuiz({
        ...quiz,
        children: quiz.children.map((child) => ({ ...child }))
      });
    });

    const jsConfetti = new JSConfetti();

    jsConfetti.addConfetti({
      confettiColors: [
        '#ff0a54',
        '#ff477e',
        '#ff7096',
        '#ff85a1',
        '#fbb1bd',
        '#f9bec7',
        '#3b47af',
        '#28ca59',
        '#eb1c1c',
        '#15dffa',
        '#0452fa',
        '#cceb1c'
      ],
      confettiRadius: 6,
      confettiNumber: 500
    });

    BurialPoint.track('lesson-单个quiz提交通过', {
      lessonId: lesson.id,
      lessonName: lesson.name
    });

    setTimeout(() => {
      let nextQuizIndex = currentQuizIndex + 1;
      if (nextQuizIndex < quiz.children.length) {
        setCurrentQuizIndex(nextQuizIndex);
      } else {
        onCompleted();
      }
      setPassOpen(false);
    }, 500);
  };

  useEffect(() => {
    const notCompleted: number[] = [];
    propsQuiz.children.forEach((item, index) => {
      if (!lesson.completedQuiz && !Array.isArray(lesson.completedQuiz)) {
        item.isCompleted = false;
        return false;
      }
      if (!lesson.completedQuiz.includes(index)) {
        notCompleted.push(index);
        item.isCompleted = false;
      } else {
        item.isCompleted = true;
      }
    });
    if (notCompleted.length) {
      setCurrentQuizIndex(notCompleted[0]);
    }
    setQuiz({
      ...propsQuiz,
      children: propsQuiz.children.map((child) => ({ ...child }))
    });
  }, [lesson, propsQuiz]);

  useClickAway(() => {
    setQuizDropdownVisible(false);
  }, containerRef);

  const QuizHeader = (
    <div className={`flex h-fit w-full items-center justify-between`}>
      <div className={`text-h4 relative inline-flex items-center ${quizDropdownVisible && 'shadow-2xl'}`}>
        <div
          ref={containerRef as any}
          className={`box-content inline-flex min-h-fit cursor-pointer gap-2 border-b-2 p-[20px] ${
            quizDropdownVisible ? ' border-neutral-medium-gray' : ''
          }`}
          onClick={() => {
            BurialPoint.track('lesson-quiz dropdown点击');
            setQuizDropdownVisible(!quizDropdownVisible);
          }}
        >
          <span>{`${quiz.title ? quiz.title : 'Quest'} ${currentQuizIndex + 1}/${quiz.children.length}`}</span>

          <span className={`${quizDropdownVisible ? 'rotate-180' : ''} transition-transform`}>
            <MdArrowDropDown size={28} color=""></MdArrowDropDown>
          </span>
        </div>

        {quizDropdownVisible ? (
          <QuizDropdown
            quiz={quiz}
            onChange={(index) => {
              setCurrentQuizIndex(index);
            }}
            currentQuizIndex={currentQuizIndex}
          ></QuizDropdown>
        ) : null}
      </div>
      <div
        className={`p-[20px]`}
        onClick={() => {
          BurialPoint.track('lesson-quiz 收起');
          setStart(false);
        }}
      >
        <FiChevronDown size={28} color="" className={`rotate-180 cursor-pointer`}></FiChevronDown>
      </div>
    </div>
  );
  return (
    <>
      {start && (
        <div
          className={cn(
            `flex min-h-[50%] w-full flex-1 flex-col overflow-hidden rounded-[.625rem] bg-[#E6E6E6] pb-[20px]`
          )}
        >
          {QuizHeader}
          <QuizContext.Provider value={{ onPass, currentQuizIndex, parentQuiz: quiz }}>
            <div className={`h-full overflow-hidden px-[20px]`}>
              <ComponentRenderer
                parent={quiz}
                component={quiz.children[currentQuizIndex]}
                prevComponent={null}
                nextComponent={null}
                position={0}
              ></ComponentRenderer>
            </div>
          </QuizContext.Provider>
        </div>
      )}
      {!start && (
        <div className="inline-flex h-fit w-full items-center justify-between rounded-[.625rem]  bg-[#E6E6E6] px-[20px] py-[8px]">
          <h1 className="text-h4">Quest</h1>
          <Button
            type="primary"
            className="button-text-s px-[40px] py-[8px] uppercase text-neutral-black"
            onClick={() => {
              BurialPoint.track('lesson-start quiz按钮点击');
              setStart(true);
            }}
          >
            Start Quest
          </Button>
        </div>
      )}
      <QuizPassModal open={passOpen} onClose={() => setPassOpen(true)}></QuizPassModal>
    </>
  );
};

export default QuizRenderer;
