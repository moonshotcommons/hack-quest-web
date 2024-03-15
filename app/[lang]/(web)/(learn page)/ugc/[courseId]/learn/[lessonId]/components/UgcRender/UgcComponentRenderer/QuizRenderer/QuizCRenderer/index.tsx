'use client';
import { FC, useContext, useEffect, useRef, useState } from 'react';

import TextRenderer from '@/components/Web/Business/NotionRender/TextRenderer';
import { cn } from '@/helper/utils';
import { RendererContext } from '@/components/Web/Business/Renderer/context';
import ComponentRenderer from '@/components/Web/Business/Renderer/MiniElectiveRenderer';
import { FiCheck } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';
import {
  FooterButtonStatus,
  FooterButtonText,
  UgcContext
} from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
import { QuizContext } from '..';
import emitter from '@/store/emitter';
import { useGetQuizsCompleted } from '@/hooks/useCoursesHooks/useGetQuizsCompleted';
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
  const { setFooterBtn } = useContext(UgcContext);
  const initFooterBtn = useRef(true);
  const { getFooterBtnInfo } = useGetQuizsCompleted();
  const [answerState, setAnswerState] = useState<AnswerState>(
    AnswerState.Default
  );

  const submit = () => {
    let wrongAnswer = answers.find((answer) => !quiz.answers.includes(answer));
    if (wrongAnswer) {
      setAnswerState(AnswerState.Wrong);
      return;
    }

    let rightAnswer = quiz.answers.find(
      (answer: any) => !answers.includes(answer)
    );
    if (rightAnswer) {
      setAnswerState(AnswerState.Wrong);
      return;
    }
    setAnswerState(AnswerState.Correct);
    onPass();
  };

  if (emitter.all.get(FooterButtonStatus.SUBMIT)) {
    emitter.all.delete(FooterButtonStatus.SUBMIT);
    emitter.on(FooterButtonStatus.SUBMIT, submit);
  } else {
    emitter.on(FooterButtonStatus.SUBMIT, submit);
  }

  useEffect(() => {
    let { footerBtnText, footerBtnStatus, footerBtnDisable } =
      getFooterBtnInfo(parent);
    initFooterBtn.current = true;
    if (quiz.isCompleted) {
      setAnswers(quiz.answers);
    } else {
      initFooterBtn.current = false;
      footerBtnText = FooterButtonText.SUBMIT;
      footerBtnStatus = FooterButtonStatus.SUBMIT;
      footerBtnDisable = true;
      setAnswers([]);
      setAnswerState(AnswerState.Default);
    }

    setTimeout(() => {
      initFooterBtn.current = false;
      setFooterBtn({
        footerBtnText,
        footerBtnStatus,
        footerBtnDisable
      });
    }, 10);

    return () => {
      emitter.off(FooterButtonStatus.SUBMIT, submit);
    };
  }, [quiz]);

  useEffect(() => {
    if (initFooterBtn.current) return;
    setFooterBtn({
      footerBtnDisable: !answers.length,
      footerBtnStatus: FooterButtonStatus.SUBMIT
    });
  }, [answers]);

  return (
    <div className="flex w-full flex-col rounded-[10px] bg-neutral-off-white p-[10px]">
      <RendererContext.Provider
        value={{
          textRenderer: {
            fontSize: '18px'
          }
        }}
      >
        <div className="text-h4 mt-[32px]">
          {quiz?.children?.map((child: any, index: number) => {
            return (
              <ComponentRenderer
                key={index}
                parent={quiz}
                component={child}
              ></ComponentRenderer>
            );
          })}
        </div>
      </RendererContext.Provider>
      <div className="mt-[32px] flex flex-col gap-y-[24px]">
        {quiz?.options?.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className={cn(
                'flex cursor-pointer items-center gap-[20px] rounded-[10px] border border-neutral-light-gray px-6 py-5 transition-all duration-200 hover:scale-[1.01]',
                answers.includes(item.index) ? 'bg-[#FFF4CE]' : ''
              )}
              onClick={() => {
                if (answerState !== AnswerState.Default)
                  setAnswerState(AnswerState.Default);
                if (answers.includes(item.index)) {
                  setAnswers(answers.filter((answer) => answer !== item.index));
                } else {
                  setAnswers(answers.concat(item.index));
                }
              }}
            >
              <div className="flex-center flex h-8 w-8 rounded-[4px] border-[2px] border-neutral-light-gray">
                {item.index}
              </div>
              <div className="flex-1">
                <TextRenderer
                  richTextArr={item.option?.content?.rich_text}
                  fontSize="16px"
                ></TextRenderer>
              </div>

              <div>
                {answerState === AnswerState.Correct &&
                  answers.includes(item.index) && (
                    <FiCheck color="#00C365" size={28} />
                  )}
                {answerState === AnswerState.Wrong &&
                  answers.includes(item.index) && (
                    <FiX color="#C73333" size={28} />
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizCRenderer;
