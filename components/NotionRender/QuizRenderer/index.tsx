import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Renderer } from '..';
import Quest from '@/components/TempComponent/Quest';
import { CourseType } from '@/service/webApi/course/type';
import {
  AnswerState,
  useParseQuiz,
  WaitingRenderCodeType
} from '@/hooks/useParseQuiz';
import { message } from 'antd';
import Button from '@/components/Common/Button';
import webApi from '@/service';

interface QuizRendererProps {
  source: any;
  type: string;
  parent: any;
}

const TextCodeEdit = (props: {
  waitingRenderCodes: WaitingRenderCodeType[];
  answerState: AnswerState[];
}) => {
  const { waitingRenderCodes, answerState } = props;
  return waitingRenderCodes.map((line: any, lineIndex: number) => {
    return (
      <li
        className="list-decimal w-full text-text-default-color font-thin whitespace-nowrap flex items-center justify-start"
        key={lineIndex}
      >
        <span className="mr-[1.875rem]">{lineIndex + 1}</span>
        {Array.isArray(line) ? (
          line.map((item: any, index: number) => {
            return (
              <span
                key={index}
                className={`inline-block ${
                  item.type === 'input' ? 'flex-1' : ''
                }`}
              >
                {item.render(answerState)}
              </span>
            );
          })
        ) : (
          <span className="inline-block flex-1">
            {line.render(answerState)}
          </span>
        )}
      </li>
    );
  });
};

const QuizRenderer: FC<QuizRendererProps> = (props) => {
  const { source, parent } = props;
  const [answerWrong, setAnswerWrong] = useState(false);
  const [errorLines, setErrorLines] = useState([]);
  const {
    waitingRenderCodes,
    quiz,
    answerState,
    answerReg,
    waitingRenderCodesDispatch
  } = useParseQuiz({
    content: source
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const onCheckSubmit = () => {
    let isWrong = false;
    let tempAnswerReg = [...answerReg];
    const errorLines: any = [];
    answerState.forEach((line) => {
      const regIndex = tempAnswerReg.findIndex((reg) =>
        reg.test(line.value.trim())
      );
      if (regIndex === -1) {
        errorLines.push(line);
      } else {
        answerReg.splice(
          answerReg.findIndex((reg) => reg.test(line.value.trim())),
          1
        );
      }
    });

    if (answerReg.length) {
      isWrong = true;
      errorLines.forEach((line: any, index: number) => {
        const target = document.querySelector(
          `[data-uuid="${line.id}"]`
        ) as HTMLTextAreaElement;
        target.style.backgroundColor = '#FF4747';
        target.style.opacity = '0.6';
        // message.error('Input error, please check your answer!');
        if (index === 0) {
          containerRef.current?.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
          });
        }
      });
      setErrorLines(errorLines);
      setAnswerWrong(isWrong);
      console.log(parent);
      webApi.courseApi.markQuestState(parent.lesson.id, false);
    }

    if (!isWrong) {
      parent.onPass();
      setAnswerWrong(isWrong);
    }
  };

  const onTryAgain = () => {
    setAnswerWrong(false);
    errorLines.forEach((line: any) => {
      const target = document.querySelector(
        `[data-uuid="${line.id}"]`
      ) as HTMLTextAreaElement;
      target.style.backgroundColor = 'var(--lesson-code-editor-input-bg)';
      target.style.opacity = '1';
      const currentAnswerState = answerState.find(
        (state) => state.id === line.id
      );
      if (currentAnswerState) {
        target.value = currentAnswerState.inputValue;
      }
    });
    setErrorLines([]);
  };

  const showAnswer = () => {
    errorLines.forEach((line: any) => {
      const target = document.querySelector(
        `[data-uuid="${line.id}"]`
      ) as HTMLTextAreaElement;
      target.style.backgroundColor = '#9EFA13';
      target.style.opacity = '0.6';
      const currentAnswerState = answerState.find(
        (state) => state.id === line.id
      );
      if (currentAnswerState) {
        target.value = currentAnswerState.answer;
      }
    });
  };

  return (
    <div className="h-full w-full overflow-hidden flex flex-col">
      <div
        ref={containerRef}
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'
        }}
        className="overflow-hidden flex-1 h-full scroll-wrap-y no-scrollbar"
      >
        <div className="lesson-quiz-content w-full h-[100%] flex flex-col relative">
          <div className="">
            <div className="text-text-default-color font-next-book-bold text-[1rem]">
              Quest
            </div>
            <div className="py-[1.5rem] text-[.875rem]">
              {quiz?.children.map((child: any, index: number) => {
                return (
                  <Renderer
                    key={index}
                    type={child.type}
                    source={child}
                    parent={quiz}
                  ></Renderer>
                );
              })}
            </div>
          </div>
          <div className="w-full">
            <div className="text-text-default-color font-next-book-bold text-[1rem]">
              Try answers below
            </div>
            <ul className="mt-[1.5rem] w-full font-next-book overflow-scroll whitespace-pre-line no-scrollbar">
              <TextCodeEdit
                answerState={answerState}
                waitingRenderCodes={waitingRenderCodes}
              ></TextCodeEdit>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-[30px] flex items-center justify-end">
        {answerWrong && (
          <div className="flex gap-[1.25rem] justify-end z-[99999]">
            {/* {!toggleAnswer && (
                <Button
                  onClick={showAnswer}
                  className="bg-lesson-ghost-button-bg text-lesson-ghost-button-text-color border border-lesson-ghost-border-color px-[3rem] py-[1rem]"
                >
                  {toggleAnswer ? 'Hide the answer' : 'Show me the answer'}
                  {'Show me the answer'}
                </Button>
              )} */}
            <Button
              onClick={showAnswer}
              className="bg-lesson-ghost-button-bg text-lesson-ghost-button-text-color border border-lesson-ghost-border-color px-[3rem] py-[1rem]"
            >
              {/* {toggleAnswer ? 'Hide the answer' : 'Show me the answer'} */}
              {'Show me the answer'}
            </Button>
            <Button
              onClick={onTryAgain}
              className="bg-lesson-primary-button-bg text-lesson-primary-button-text-color border border-lesson-primary-button-border-color font-next-book px-[3rem] py-[1rem]"
            >
              Try Again
            </Button>
          </div>
        )}
        {!answerWrong && (
          <Button
            onClick={onCheckSubmit}
            className="bg-lesson-primary-button-bg text-lesson-primary-button-text-color border border-lesson-primary-button-border-color font-next-book px-[3rem] py-[1rem]"
          >
            Check Answer
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizRenderer;
