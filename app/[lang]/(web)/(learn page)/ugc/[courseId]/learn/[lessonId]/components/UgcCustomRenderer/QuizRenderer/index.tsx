import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { useClickAway } from 'ahooks';
import JSConfetti from 'js-confetti';
import { FC, createContext, useContext, useEffect, useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import QuizDropdown from './QuizDropdwon';
import QuizPassModal from './QuizPassModal';
import {
  FooterButtonStatus,
  FooterButtonText,
  UgcContext
} from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
import { CustomComponent, CustomType, QUIZ_ITEM_TYPES, QuizType } from '@/components/ComponentRenderer/type';
import { ComponentRenderer } from '@/components/ComponentRenderer';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';
import AITriggerButton from '@/components/Web/AI/AITriggerButton';
import { HelperType } from '@/service/webApi/helper/type';

interface QuizRendererProps {
  quiz: QuizType;
  parent: CustomComponent;
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
  const { quiz: propsQuiz } = props;
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizDropdownVisible, setQuizDropdownVisible] = useState(false);
  const [passOpen, setPassOpen] = useState(false);
  const { lesson, setFooterBtn } = useContext(UgcContext);
  const containerRef = useRef(null);
  const { updateQuizNum } = useUpdateHelperParams();
  const jsConfetti = useRef<JSConfetti>();
  const [quiz, setQuiz] = useState<QuizType>();

  const onPass = () => {
    if (!quiz) return;
    webApi.courseApi.completeQuiz(lesson.id, currentQuizIndex).then(() => {
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
        setFooterBtn({
          footerBtnText: FooterButtonText.NEXT,
          footerBtnStatus: FooterButtonStatus.NEXT
        });
      }
      setPassOpen(false);
    }, 500);
  };

  useEffect(() => {
    if (!lesson || !propsQuiz) return;
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

  if (!quiz) return null;

  const QuizHeader = (
    <div className={`flex h-fit w-full items-center justify-between px-1`}>
      <div className={`text-h4 relative inline-flex items-center ${quizDropdownVisible && 'shadow-2xl'}`}>
        <div className=" flex items-center">
          <div
            ref={containerRef as any}
            className={`box-content inline-flex min-h-fit cursor-pointer gap-2 px-[0px] ${
              quizDropdownVisible ? ' border-neutral-medium-gray' : ''
            }`}
            onClick={() => {
              BurialPoint.track('lesson-quiz dropdown点击');
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
  );
  return (
    <>
      <div className={cn(`mt-[30px] flex min-h-[50%] w-full flex-1 flex-col rounded-[.625rem] pb-[20px]`)}>
        {QuizHeader}
        <QuizContext.Provider value={{ onPass, currentQuizIndex, parentQuiz: quiz }}>
          <div className={`h-full overflow-hidden px-1`}>
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
      <QuizPassModal open={passOpen} onClose={() => setPassOpen(true)}></QuizPassModal>
    </>
  );
};

export default QuizRenderer;
