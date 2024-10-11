import { cn } from '@/helper/utils';
import { useClickAway } from 'ahooks';
import JSConfetti from 'js-confetti';
import { FC, createContext, useEffect, useRef, useState } from 'react';
import { FooterButtonStatus } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
import { CustomComponent, CustomType, QUIZ_ITEM_TYPES, QuizType } from '@/components/ComponentRenderer/type';
import { ComponentRenderer } from '@/components/ComponentRenderer';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';
import { useDailyChallengeContext } from '../../DailyChallengeProvider';

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
  const { updateButtonState, onChallengePass } = useDailyChallengeContext();
  const containerRef = useRef(null);
  const { updateQuizNum } = useUpdateHelperParams();
  const jsConfetti = useRef<JSConfetti>();
  const [quiz, setQuiz] = useState<QuizType>();

  const onPass = () => {
    if (!quiz) return;
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

    onChallengePass();

    setTimeout(() => {
      let nextQuizIndex = currentQuizIndex + 1;
      if (nextQuizIndex < quiz.children.length) {
        setCurrentQuizIndex(nextQuizIndex);
      } else {
        updateButtonState({
          type: FooterButtonStatus.NEXT
        });
      }
    }, 500);
  };

  useEffect(() => {
    if (!propsQuiz) return;
    const notCompleted: number[] = [];
    propsQuiz.children = propsQuiz.children.filter((item) => {
      return QUIZ_ITEM_TYPES.includes(item.type as CustomType);
    });

    if (notCompleted.length) {
      setCurrentQuizIndex(notCompleted[0]);
    }
    setQuiz({
      ...propsQuiz,
      children: propsQuiz.children.map((child) => ({ ...child }))
    });
  }, [propsQuiz]);

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

  return (
    <>
      <div className={cn(`-mt-10 flex w-full flex-1 flex-col rounded-[.625rem] pb-[20px]`)}>
        <QuizContext.Provider value={{ onPass, currentQuizIndex, parentQuiz: quiz }}>
          <div className={`h-full`}>
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
    </>
  );
};

export default QuizRenderer;
