import {
  CustomType,
  NotionType,
  QuizAType
} from '@/components/v2/LessonPage/type';
import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import ComponentRenderer from '../..';
import QuizFooter from '../QuizFooter';
import CodeRender from './CodeRender';
import { QuizAContext } from './type';
import { useParseQuizA, AnswerState } from '@/hooks/useParseQuizA';
import webApi from '@/service';
import { PlaygroundContext } from '@/components/v2/LessonPage/Playground/type';
import { QuizContext } from '..';
interface QuizARendererProps {
  parent: CustomType | NotionType;
  quiz: QuizAType;
}

const QuizARenderer: FC<QuizARendererProps> = (props) => {
  const { quiz } = props;
  const [showAnswer, setShowAnswer] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(true);
  const { lesson } = useContext(PlaygroundContext);
  const { onPass } = useContext(QuizContext);
  const { waitingRenderCodes, answerState, answerStateDispatch } =
    useParseQuizA(quiz.lines);
  const setAnswers = () => {
    const show = !showAnswer;
    let inputEle: HTMLTextAreaElement | HTMLInputElement;
    answerState.map((line) => {
      if (line.answers?.length) {
        line.answers.map((answer) => {
          inputEle = document.querySelector(
            `[data-uuid="${answer.id}"]`
          ) as HTMLInputElement;
          if (inputEle) {
            if (show) {
              inputEle.value = answer.answer;
            } else {
              inputEle.value = answer.value;
            }
            inputEle.disabled = show;
          }
        });
      } else {
        inputEle = document.querySelector(
          `[data-uuid="${line.id}"]`
        ) as HTMLTextAreaElement;
        if (inputEle) {
          if (show) {
            inputEle.value = line.answer;
          } else {
            inputEle.value = line.value;
          }
          inputEle.disabled = show;
        }
      }
    });
    setShowAnswer(show);
  };
  const onSubmit = async () => {
    const newAnswerState = [...answerState];

    let isCurrent = true;
    newAnswerState.map((line) => {
      if (line.answers?.length) {
        line.answers.map((answer) => {
          if (!new RegExp(answer.regex).test(answer.value.trim())) {
            isCurrent = false;
            answer.error = true;
          }
        });
      } else {
        if (!new RegExp(line.regex).test(line.value.trim())) {
          isCurrent = false;
          line.error = true;
        }
      }
    });
    if (!isCurrent) {
      answerStateDispatch([...newAnswerState]);
      await webApi.courseApi.markQuestState(lesson.id, false);
      return;
    }
    await webApi.courseApi.completeLesson(lesson.id);
    onPass();
  };
  useEffect(() => {
    setSubmitDisable(
      answerState.some((line) => {
        if (line.answers?.length) {
          return line.answers.some((answer) => !answer.value);
        } else {
          return !line.value;
        }
      })
    );
  }, [answerState]);

  useEffect(() => {
    if (showAnswer) setSubmitDisable(true);
  }, [showAnswer]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="pb-4 flex-1 flex flex-col">
        <div>
          {quiz.children.map((child) => {
            return (
              <ComponentRenderer
                key={child.id}
                parent={quiz}
                component={child}
              ></ComponentRenderer>
            );
          })}
        </div>
        {quiz.lines.length > 0 && (
          <div className="w-full flex-1">
            <QuizAContext.Provider
              value={{
                answers: answerState,
                showAnswer,
                setAnswers
              }}
            >
              <CodeRender waitingRenderCodes={waitingRenderCodes} />
            </QuizAContext.Provider>
          </div>
        )}
      </div>
      <QuizFooter
        showAnswer={showAnswer}
        submitDisable={submitDisable}
        setShowAnswer={setAnswers}
        onSubmit={onSubmit}
      ></QuizFooter>
    </div>
  );
};

export default QuizARenderer;
