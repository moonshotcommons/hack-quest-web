'use client';
import { FC, useContext, useEffect, useState } from 'react';

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
} from '../../../../../constants/type';
import { QuizContext } from '..';
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
  const { emitter, footerBtn, setFooterBtn } = useContext(UgcContext);
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

  emitter.on(FooterButtonStatus.SUBMIT, submit);

  useEffect(() => {
    let footerBtnText = FooterButtonText.NEXT;
    if (quiz.isCompleted) {
      setAnswers(quiz.answers);
    } else {
      footerBtnText = FooterButtonText.SUBMIT;
      setAnswers([]);
      setAnswerState(AnswerState.Default);
    }
    setFooterBtn({
      footerBtnText
    });
  }, [quiz]);

  useEffect(() => {
    setFooterBtn({
      footerBtnDisable: !answers.length,
      footerBtnStatus: FooterButtonStatus.SUBMIT
    });
    return () => {
      emitter.off(FooterButtonStatus.SUBMIT, submit);
    };
  }, [answers]);

  return (
    <div className="flex flex-col w-full bg-neutral-off-white rounded-[10px] p-[10px]">
      <RendererContext.Provider
        value={{
          textRenderer: {
            fontSize: '18px'
          }
        }}
      >
        <div className="text-h4 leading-[125%] tracking-[0.36px] mt-[32px]">
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
                'px-6 py-5 flex items-center border border-[#DADADA] rounded-[10px] cursor-pointer gap-[20px] hover:scale-[1.01] transition-all duration-200',
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
              <div className="w-8 h-8 flex flex-center border-[2px] border-[#DADADA] rounded-[4px]">
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
