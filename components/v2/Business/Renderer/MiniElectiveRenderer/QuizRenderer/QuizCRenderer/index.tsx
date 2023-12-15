'use client';
import { CustomType, NotionType } from '@/components/v2/Business/Renderer/type';
import { FC, useContext, useState } from 'react';
// import { QuizContext } from '..';

import TextRenderer from '@/components/v2/Business/NotionRender/TextRenderer';
import Button from '@/components/v2/Common/Button';
import { cn } from '@/helper/utils';
import { RendererContext } from '@/components/v2/Business/Renderer/context';
import ComponentRenderer from '@/components/v2/Business/Renderer/MiniElectiveRenderer';
import { FiCheck } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';
interface QuizCRendererProps {
  parent: CustomType | NotionType;
  quiz: any;
}

enum AnswerState {
  Default = 'default',
  Wrong = 'wrong',
  Correct = 'correct'
}

const QuizCRenderer: FC<QuizCRendererProps> = (props) => {
  const { quiz } = props;
  const { onCompleted, onQuizPass } =
    useContext(RendererContext).globalContext!;
  const [answers, setAnswers] = useState<number[]>([]);
  const [answerState, setAnswerState] = useState<AnswerState>(
    AnswerState.Default
  );

  const onSubmit = () => {
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
    onQuizPass?.();
  };

  const onTryAgain = () => {
    setAnswerState(AnswerState.Default);
    setAnswers([]);
  };

  return (
    <div className="flex flex-col">
      <RendererContext.Provider
        value={{
          textRenderer: {
            fontSize: '18px'
          }
        }}
      >
        <div className="font-next-book-bold leading-[125%] tracking-[0.36px] mt-[32px]">
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
      <div className="mt-[32px]">
        {answerState === AnswerState.Default && (
          <Button
            type="primary"
            className="w-[165px] p-0 py-[11px] font-next-book leading-[125%] tracking-[0.32px] text-[#0B0B0B]"
            onClick={onSubmit}
          >
            Submit
          </Button>
        )}
        {answerState === AnswerState.Wrong && (
          <Button
            type="primary"
            className="w-[165px] p-0 py-[11px] font-next-book leading-[125%] tracking-[0.32px] text-[#0B0B0B]"
            onClick={onTryAgain}
          >
            Try again
          </Button>
        )}
        {answerState === AnswerState.Correct && (
          <Button
            type="primary"
            className="w-[165px] p-0 py-[11px] font-next-book leading-[125%] tracking-[0.32px] text-[#0B0B0B]"
            onClick={() => {
              onCompleted?.();
            }}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizCRenderer;
