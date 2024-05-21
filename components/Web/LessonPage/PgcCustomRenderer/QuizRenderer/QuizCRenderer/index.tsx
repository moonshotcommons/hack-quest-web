'use client';
import { FC, useContext, useEffect, useState } from 'react';
import { cn } from '@/helper/utils';
import { FiCheck } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';

import { QuizContext } from '..';
import { childRenderCallback } from '@/components/ComponentRenderer';
import TextRenderer from '@/components/ComponentRenderer/NotionRender/TextRenderer';
import QuizFooter from '../QuizFooter';
import { PlaygroundContext } from '../../../Playground/type';
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
  const { lesson } = useContext(PlaygroundContext);

  const [answerState, setAnswerState] = useState<AnswerState>(AnswerState.Default);

  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const submit = () => {
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
    onPass();
  };

  useEffect(() => {
    if (quiz.isCompleted) {
      setAnswers(quiz.answers);
      setAnswerState(AnswerState.Correct);
    } else {
      setAnswers([]);
      setAnswerState(AnswerState.Default);
    }
  }, [quiz]);

  console.log(quiz?.options, quiz.answers);

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-[10px]">
      <div className="scroll-wrap-y flex-1 overflow-auto">
        <div className="mt-[32px] flex flex-col">
          <span className="[&>p]:body-l-bold inline-block">{quiz?.children?.map(childRenderCallback(quiz))}</span>
          <span className="body-l mt-2 inline-block whitespace-nowrap">
            {quiz.answers.length > 1 ? '[Multiple Choice]' : '[Single Choice]'}
          </span>
        </div>
        <div className="mt-[30px] flex w-full max-w-[808px] flex-col gap-y-[24px]">
          {quiz?.options?.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className={cn(
                  'flex cursor-pointer items-center gap-[20px] rounded-[10px] border border-neutral-light-gray px-6 py-5 transition-all duration-200',
                  !answers.includes(item.index) ? 'hover:bg-neutral-off-white' : '',
                  answers.includes(item.index) ? 'bg-[#FFF4CE]' : '',
                  answers.includes(item.index) && answerState === AnswerState.Wrong
                    ? 'border-status-error-dark bg-status-error-light'
                    : '',
                  answers.includes(item.index) && answerState === AnswerState.Correct
                    ? 'border-status-success-dark bg-status-success-light'
                    : '',
                  showAnswer && !!quiz.answers.includes(item.index)
                    ? 'border-neutral-medium-gray bg-neutral-off-white'
                    : ''
                )}
                onClick={() => {
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
                    'flex-center flex h-8 w-8 rounded-[4px] border-[1px] border-neutral-light-gray',
                    answers.includes(item.index) && answerState === AnswerState.Wrong ? 'border-status-error-dark' : '',
                    answers.includes(item.index) && answerState === AnswerState.Correct
                      ? 'border-status-success-dark'
                      : '',
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
                    <FiCheck color="#00C365" size={28} />
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
      <QuizFooter
        showAnswer={showAnswer}
        submitDisable={!answers.length}
        onSubmit={submit}
        setShowAnswer={(isShow) => {
          setShowAnswer(isShow);
        }}
        includeHint={!!quiz.hint}
        showHint={showHint}
        setShowHint={setShowHint}
        isCompleted={!!quiz.isCompleted}
        lessonId={lesson.id}
      ></QuizFooter>
    </div>
  );
};

export default QuizCRenderer;
