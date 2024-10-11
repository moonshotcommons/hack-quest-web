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
import { CustomType, QUIZ_ITEM_TYPES, QuizType } from '@/components/ComponentRenderer/type';
import { ComponentRenderer } from '@/components/ComponentRenderer';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';
import AITriggerButton from '@/components/Web/AI/AITriggerButton';
import { HelperType } from '@/service/webApi/helper/type';
import Button from '@/components/Common/Button';

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
  const { onCompleted, lesson, setExampleExpand } = useContext(PlaygroundContext);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizDropdownVisible, setQuizDropdownVisible] = useState(false);
  const [start, setStart] = useState(parent.right.length <= 1);
  const [passOpen, setPassOpen] = useState(false);
  const { updateQuizNum } = useUpdateHelperParams();
  const jsConfetti = useRef<JSConfetti>();
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

    if (jsConfetti.current) {
      jsConfetti.current.addConfetti({
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
    }

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
    propsQuiz.children = propsQuiz.children.filter((item) => {
      return QUIZ_ITEM_TYPES.includes(item.type as CustomType);
    });
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

  useEffect(() => {
    updateQuizNum(currentQuizIndex);
  }, [currentQuizIndex]);

  useEffect(() => {
    jsConfetti.current = new JSConfetti();
  }, []);

  const QuizHeader = (
    <div className={`flex h-fit w-full  items-center justify-between`}>
      <div className="flex w-fit gap-2">
        <div className={`text-h4 relative inline-flex items-center ${quizDropdownVisible && 'shadow-2xl'}`}>
          <div className=" flex items-center">
            <div
              ref={containerRef as any}
              className={cn(
                'box-content inline-flex min-h-fit cursor-pointer gap-2 px-[0px]',
                quizDropdownVisible ? ' border-neutral-medium-gray' : '',
                !start ? '!cursor-not-allowed' : ''
              )}
              onClick={() => {
                BurialPoint.track('lesson-quiz dropdown点击');
                if (!start) return;
                setQuizDropdownVisible(!quizDropdownVisible);
              }}
            >
              <span>{`${'Quiz'} ${currentQuizIndex + 1}/${quiz.children.length}`}</span>
              {/* <span>{`${quiz.title ? quiz.title : 'Quest'} ${
            currentQuizIndex + 1
          }/${quiz.children.length}`}</span> */}

              <span
                className={`text-neutral-medium-gray ${quizDropdownVisible ? 'rotate-180' : ''} transition-transform`}
              >
                <MdArrowDropDown size={24} color=""></MdArrowDropDown>
              </span>
            </div>
            <AITriggerButton triggerType={HelperType.ExplainQuiz} onlyIcon>
              Explain quiz
            </AITriggerButton>
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
      </div>
      <div
        className={cn(`flex flex-1 justify-end py-[0px]`, !start ? 'rotate-180 justify-start' : '')}
        onClick={() => {
          BurialPoint.track('lesson-quiz 收起');
          if (!start) {
            setExampleExpand(false);
          }
          setStart(!start);
        }}
      >
        <FiChevronDown size={28} color="" className={`rotate-180 cursor-pointer`}></FiChevronDown>
      </div>
    </div>
  );

  // const QuizHeader = (
  //   <div className={`flex h-fit w-full items-center justify-between`}>
  //     <div className="flex items-center gap-4">
  //       <div className={`text-h4 relative inline-flex items-center ${quizDropdownVisible && 'shadow-2xl'}`}>
  //         <div className="flex items-center gap-0">
  //           <div
  //             ref={containerRef as any}
  //             className={`box-content inline-flex min-h-fit cursor-pointer gap-2 border-b-2 p-[20px] ${
  //               quizDropdownVisible ? ' border-neutral-medium-gray' : ''
  //             }`}
  //             onClick={() => {
  //               BurialPoint.track('lesson-quiz dropdown点击');
  //               setQuizDropdownVisible(!quizDropdownVisible);
  //             }}
  //           >
  //             <span>{`${quiz.title ? quiz.title : 'Quest'} ${currentQuizIndex + 1}/${quiz.children.length}`}</span>

  //             <span className={`${quizDropdownVisible ? 'rotate-180' : ''} transition-transform`}>
  //               <MdArrowDropDown size={28} color=""></MdArrowDropDown>
  //             </span>
  //           </div>
  //         </div>

  //         {quizDropdownVisible ? (
  //           <QuizDropdown
  //             quiz={quiz}
  //             onChange={(index) => {
  //               setCurrentQuizIndex(index);
  //             }}
  //             currentQuizIndex={currentQuizIndex}
  //           ></QuizDropdown>
  //         ) : null}
  //       </div>
  //       <AITriggerButton triggerType={HelperType.ExplainQuiz}>Explain Quiz</AITriggerButton>
  //     </div>
  //     <div
  //       className={`p-[20px]`}
  //       onClick={() => {
  //         BurialPoint.track('lesson-quiz 收起');
  //         setStart(false);
  //       }}
  //     >
  //       <FiChevronDown size={28} color="" className={`rotate-180 cursor-pointer`}></FiChevronDown>
  //     </div>
  //   </div>
  // );

  return (
    <>
      <div
        className={cn(
          `  w-full flex-col rounded-[.625rem] bg-neutral-white pb-[20px]`,
          start ? 'flex min-h-[calc(50%-20px)] flex-1' : 'hidden min-h-fit'
        )}
      >
        {QuizHeader}
        <QuizContext.Provider value={{ onPass, currentQuizIndex, parentQuiz: quiz }}>
          <div className={`h-full overflow-hidden px-[0px]`}>
            {quiz.children.map((item, index) => {
              if (currentQuizIndex !== index) return null;
              return (
                <ComponentRenderer
                  parent={quiz}
                  key={item.id}
                  component={item}
                  prevComponent={null}
                  nextComponent={null}
                  position={0}
                ></ComponentRenderer>
              );
            })}
          </div>
        </QuizContext.Provider>
      </div>
      {!start && (
        <div className="inline-flex h-fit w-full items-center justify-between rounded-[.625rem]  py-[8px]">
          <h1 className="text-h4">Quest</h1>
          <Button
            type="primary"
            className="button-text-s px-[40px] py-3 uppercase text-neutral-black"
            onClick={() => {
              BurialPoint.track('lesson-start quiz按钮点击');
              if (!start) {
                setExampleExpand(false);
              }
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
