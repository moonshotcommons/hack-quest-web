'use client';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { cn } from '@/helper/utils';
import { FiCheck } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';
import { FooterButtonStatus } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
import { QuizContext } from '..';
import emitter from '@/store/emitter';
import { useGetQuizsCompleted } from '@/hooks/courses/useGetQuizsCompleted';
import { childRenderCallback } from '@/components/ComponentRenderer';
import TextRenderer from '@/components/ComponentRenderer/NotionRender/TextRenderer';
import { useDailyChallengeContext } from '../../../DailyChallengeProvider';
interface QuizCRendererProps {
  parent: any;
  quiz: any;
}

enum AnswerState {
  Default = 'default',
  Wrong = 'wrong',
  Correct = 'correct'
}

const QuizCRenderer: FC<QuizCRendererProps> = (props) => {
  const { quiz, parent } = props;
  const [answers, setAnswers] = useState<number[]>([]);
  const { onPass } = useContext(QuizContext);
  const { updateButtonState, end } = useDailyChallengeContext();
  const initFooterBtn = useRef(true);
  const { getFooterBtnInfo } = useGetQuizsCompleted();
  const [answerState, setAnswerState] = useState<AnswerState>(AnswerState.Default);

  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const submit = () => {
    let wrongAnswer = answers.find((answer) => !quiz.answers.includes(answer));
    if (wrongAnswer) {
      setAnswerState(AnswerState.Wrong);
      return false;
    }

    let rightAnswer = quiz.answers.find((answer: any) => !answers.includes(answer));
    if (rightAnswer) {
      setAnswerState(AnswerState.Wrong);
      return false;
    }
    setAnswerState(AnswerState.Correct);
    onPass();
    return true;
  };

  if (emitter.all.get(FooterButtonStatus.SUBMIT)) {
    emitter.all.delete(FooterButtonStatus.SUBMIT);
    emitter.on(FooterButtonStatus.SUBMIT, submit);
  } else {
    emitter.on(FooterButtonStatus.SUBMIT, submit);
  }

  useEffect(() => {
    let { footerBtnStatus: type, footerBtnDisable: disable } = getFooterBtnInfo(parent);
    initFooterBtn.current = true;
    if (end) {
      setAnswers(quiz.answers);
      setAnswerState(AnswerState.Correct);
      type = FooterButtonStatus.NEXT;
    } else {
      initFooterBtn.current = false;
      disable = true;
      // setAnswers([]);
      // type = FooterButtonStatus.SUBMIT;
      // setAnswerState(AnswerState.Default);
    }

    setTimeout(() => {
      initFooterBtn.current = false;
      updateButtonState({
        type,
        disable
      });
    }, 10);

    return () => {
      emitter.off(FooterButtonStatus.SUBMIT, submit);
    };
  }, [quiz, end]);

  useEffect(() => {
    if (initFooterBtn.current) return;
    updateButtonState({ disable: !answers.length, type: 'submit' });
  }, [answers]);

  return (
    <div className="flex w-full flex-col rounded-[10px]">
      <div className="flex flex-col">
        <span className="[&_p]:body-l-bold inline-block text-center [&_p]:text-[28px]">
          {quiz?.children?.map(childRenderCallback(quiz))}
        </span>
        <span className="body-l mt-2 inline-block whitespace-nowrap text-center">
          {quiz.answers.length > 1 ? '[Multiple Choice]' : '[Single Choice]'}
        </span>
      </div>
      <div className="mt-[64px] flex flex-col gap-y-[24px]">
        {quiz?.options?.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className={cn(
                'flex cursor-pointer items-center gap-[20px] rounded-[10px] border-2 border-neutral-light-gray px-6 py-5 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-[1.01]',
                {
                  'border-yellow-dark bg-yellow-extra-light shadow-[0px_4px_0px_0px_#F9D81C]': answers.includes(
                    item.index
                  ),
                  'hover:bg-neutral-off-white': !answers.includes(item.index),
                  'border-status-error-dark bg-status-error-light shadow-[0px_4px_0px_0px_#C73333]':
                    answers.includes(item.index) && answerState === AnswerState.Wrong,
                  'border-status-success-dark bg-status-success-light shadow-[0px_4px_0px_0px_#06884A]':
                    answers.includes(item.index) && answerState === AnswerState.Correct,
                  'border-neutral-medium-gray bg-neutral-off-white shadow-[0px_4px_0px_0px_#06884A]':
                    showAnswer && !!quiz.answers.includes(item.index),
                  'cursor-not-allowed': end
                }
              )}
              onClick={() => {
                if (end) return;
                if (answerState !== AnswerState.Default) setAnswerState(AnswerState.Default);
                if (quiz.answers.length > 1) {
                  if (answers.includes(item.index)) {
                    setAnswers(answers.filter((answer) => answer !== item.index));
                  } else {
                    setAnswers(answers.concat(item.index));
                  }
                } else {
                  setAnswers([item.index]);
                }
              }}
            >
              <div
                className={cn(
                  'flex-center flex h-8 w-8 rounded-[8px] border-[1px] border-neutral-light-gray',
                  {
                    'border-yellow-dark': answers.includes(item.index),
                    'border-status-error-dark': answers.includes(item.index) && answerState === AnswerState.Wrong,
                    'border-status-success-dark': answers.includes(item.index) && answerState === AnswerState.Correct
                  },

                  showAnswer && !!quiz.answers.includes(item.index) ? 'border-neutral-medium-gray' : ''
                )}
              >
                {item.index}
              </div>
              <div className="flex-1 text-[16px]">
                <TextRenderer richTextArr={item.option?.content?.rich_text}></TextRenderer>
              </div>

              <div>
                {!showAnswer && answerState === AnswerState.Correct && answers.includes(item.index) && (
                  <FiCheck color="#06884A" size={28} />
                )}
                {!showAnswer && answerState === AnswerState.Wrong && answers.includes(item.index) && (
                  <FiX color="#C73333" size={28} />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {showHint && quiz.hint && (
        <div className="mt-4">
          <p className="body-l-bold mb-2">Hint:</p>
          {quiz.hint.children.map(childRenderCallback(quiz.hint!))}
        </div>
      )}
    </div>
  );
};

export default QuizCRenderer;
