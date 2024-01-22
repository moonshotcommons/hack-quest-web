import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { useClickAway } from 'ahooks';
import JSConfetti from 'js-confetti';
import {
  FC,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import ComponentRenderer from '../..';

import { QuizType } from '@/components/Web/Business/Renderer/type';
import QuizDropdown from './QuizDropdwon';
import QuizPassModal from './QuizPassModal';
import {
  FooterButtonStatus,
  FooterButtonText,
  UgcContext
} from '@/app/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
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
  const { quiz: propsQuiz } = props;
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizDropdownVisible, setQuizDropdownVisible] = useState(false);
  const [passOpen, setPassOpen] = useState(false);
  const { lesson, setFooterBtn } = useContext(UgcContext);

  const containerRef = useRef(null);

  const [quiz, setQuiz] = useState(propsQuiz);

  const onPass = () => {
    webApi.courseApi.completeQuiz(lesson.id, currentQuizIndex).then(() => {
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
        setFooterBtn({
          footerBtnText: FooterButtonText.NEXT,
          footerBtnStatus: FooterButtonStatus.NEXT
        });
      }
      setPassOpen(false);
    }, 500);
  };

  useEffect(() => {
    if (lesson) {
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
    }
  }, [lesson, propsQuiz]);

  useClickAway(() => {
    setQuizDropdownVisible(false);
  }, containerRef);

  const QuizHeader = (
    <div className={`flex justify-between h-fit w-full items-center`}>
      <div
        className={`inline-flex text-h4 items-center relative ${
          quizDropdownVisible && 'shadow-2xl'
        }`}
      >
        <div
          ref={containerRef as any}
          className={`inline-flex gap-2 box-content border-b-2 p-[20px] cursor-pointer min-h-fit ${
            quizDropdownVisible ? ' border-[#8C8C8C]' : ''
          }`}
          onClick={() => {
            BurialPoint.track('lesson-quiz dropdown点击');
            setQuizDropdownVisible(!quizDropdownVisible);
          }}
        >
          <span>{`${'Quiz'} ${currentQuizIndex + 1}/${
            quiz.children.length
          }`}</span>
          {/* <span>{`${quiz.title ? quiz.title : 'Quest'} ${
            currentQuizIndex + 1
          }/${quiz.children.length}`}</span> */}

          <span
            className={`text-neutral-medium-gray ${
              quizDropdownVisible ? 'rotate-180' : ''
            } transition-transform`}
          >
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
    </div>
  );
  return (
    <>
      <div
        className={cn(
          `rounded-[.625rem] pb-[20px] bg-[#E6E6E6] flex w-full flex-1 min-h-[50%] flex-col overflow-hidden mt-[30px]`
        )}
      >
        {QuizHeader}
        <QuizContext.Provider
          value={{ onPass, currentQuizIndex, parentQuiz: quiz }}
        >
          <div className={`h-full overflow-hidden px-[20px]`}>
            <ComponentRenderer
              parent={quiz}
              component={quiz.children[currentQuizIndex]}
            ></ComponentRenderer>
          </div>
        </QuizContext.Provider>
      </div>
      <QuizPassModal
        open={passOpen}
        onClose={() => setPassOpen(true)}
      ></QuizPassModal>
    </>
  );
};

export default QuizRenderer;
