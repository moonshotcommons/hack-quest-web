'use client';
import { FC, useEffect, useState } from 'react';
// import { QuizContext } from '..';

import Button from '@/components/Common/Button';
import { cn } from '@/helper/utils';
import { FiCheck } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';
import { CompleteStateType } from '@/service/webApi/course/type';
import TextRenderer from '@/components/ComponentRenderer/NotionRender/TextRenderer';
import { OverrideRendererConfig, childRenderCallback, useGlobalRendererContext } from '@/components/ComponentRenderer';
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
  const { onCompleted, onQuizPass } = useGlobalRendererContext();
  const [answers, setAnswers] = useState<number[]>([]);
  const [answerState, setAnswerState] = useState<AnswerState>(AnswerState.Default);

  const onSubmit = () => {
    let wrongAnswer = answers.find((answer) => !quiz.answers.includes(answer));
    if (wrongAnswer) {
      setAnswerState(AnswerState.Wrong);
      return;
    }

    let rightAnswer = quiz.answers.find((answer: any) => !answers.includes(answer));
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

  useEffect(() => {
    if (parent?.state === CompleteStateType.COMPLETED) {
      setAnswers(quiz.answers);
    } else {
      setAnswers([]);
      setAnswerState(AnswerState.Default);
    }
  }, [parent, quiz]);

  return (
    <div className="flex flex-col">
      <OverrideRendererConfig
        textRenderer={{
          fontSize: '18px'
        }}
      >
        <div className="mt-[32px]">{quiz?.children?.map(childRenderCallback(quiz))}</div>
      </OverrideRendererConfig>
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
                if (answerState !== AnswerState.Default) setAnswerState(AnswerState.Default);
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
              <div className="flex-1 text-[16px]">
                <TextRenderer richTextArr={item.option?.content?.rich_text}></TextRenderer>
              </div>

              <div>
                {answerState === AnswerState.Correct && answers.includes(item.index) && (
                  <FiCheck color="#00C365" size={28} />
                )}
                {answerState === AnswerState.Wrong && answers.includes(item.index) && <FiX color="#C73333" size={28} />}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-[32px]">
        {answerState === AnswerState.Default && (
          <Button type="primary" className="body-m w-[165px] p-0 py-[11px] text-neutral-black" onClick={onSubmit}>
            Submit
          </Button>
        )}
        {answerState === AnswerState.Wrong && (
          <Button type="primary" className="body-m w-[165px] p-0 py-[11px] text-neutral-black" onClick={onTryAgain}>
            Try again
          </Button>
        )}
        {answerState === AnswerState.Correct && (
          <Button
            type="primary"
            className="body-m w-[165px] p-0 py-[11px] text-neutral-black"
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
