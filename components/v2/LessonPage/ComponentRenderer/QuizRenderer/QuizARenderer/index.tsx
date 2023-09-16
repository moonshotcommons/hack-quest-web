import { PlaygroundContext } from '@/components/v2/LessonPage/Playground/type';
import {
  CustomType,
  NotionType,
  QuizAType
} from '@/components/v2/LessonPage/type';
import { BurialPoint } from '@/helper/burialPoint';
import { adaptWidth, changeTextareaHeight } from '@/helper/utils';
import { useParseQuizA, AnswerState } from '@/hooks/useParseQuizA';
import webApi from '@/service';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { QuizContext } from '..';
import ComponentRenderer from '../..';
import QuizFooter from '../QuizFooter';
import CodeRender from './CodeRender';
import { QuizAContext } from './type';
interface QuizARendererProps {
  parent: CustomType | NotionType;
  quiz: QuizAType;
}

const QuizARenderer: FC<QuizARendererProps> = (props) => {
  const { quiz } = props;
  const [showAnswer, setShowAnswer] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(true);
  const isCompleted = useRef(false);
  const { lesson } = useContext(PlaygroundContext);
  const { onPass } = useContext(QuizContext);
  const { waitingRenderCodes, answerState, answerStateDispatch } =
    useParseQuizA(quiz.lines);

  const dealInputValue = (show: boolean, isSet?: boolean) => {
    let inputEle: HTMLTextAreaElement | HTMLInputElement;
    const newAnswerState = JSON.parse(JSON.stringify(answerState));
    newAnswerState.map((line: AnswerState) => {
      if (line.answers?.length) {
        line.answers.map((answer: AnswerState) => {
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
            adaptWidth(inputEle);
            isSet && (answer.disable = show);
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
          isSet && (line.disable = show);
          changeTextareaHeight(inputEle);
        }
      }
    });
    // isSet && answerStateDispatch([...newAnswerState]);
  };
  const setAnswers = () => {
    const show = !showAnswer;
    if (show) {
      BurialPoint.track('lesson-show answer次数');
    }
    dealInputValue(show, true);
    setShowAnswer(show);
  };
  const onSubmit = async () => {
    BurialPoint.track('lesson-单个quiz提交', { lessonId: lesson.id });
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
      BurialPoint.track('lesson-单个quiz提交未通过', { lessonId: lesson.id });
      return;
    }
    onPass();
  };

  // 自动填充
  const initCompleteInput = () => {
    if (!isCompleted.current || !isInitAnswerState()) return;
    const newAnswerState = [...answerState];
    let inputEle: HTMLTextAreaElement | HTMLInputElement;
    if (answerState.length) {
      newAnswerState.map((line) => {
        if (line.answers?.length) {
          line.answers.map((l) => {
            const { answer } = l;
            l.inputValue = answer;
            l.value = answer;
            inputEle = document.querySelector(
              `[data-uuid="${l.id}"]`
            ) as HTMLInputElement;
            if (inputEle) {
              inputEle.value = answer;
              adaptWidth(inputEle);
            }
          });
        } else {
          const { answer } = line;
          line.inputValue = answer;
          line.value = answer;
          inputEle = document.querySelector(
            `[data-uuid="${line.id}"]`
          ) as HTMLTextAreaElement;
          if (inputEle) {
            inputEle.value = answer;
            changeTextareaHeight(inputEle);
          }
        }
      });
      isCompleted.current = false;
    }
  };
  //判断是否是初始化的answerState(初始化的value都为空)
  const isInitAnswerState = () => {
    return answerState.every((line) => {
      if (line.answers?.length) {
        return line.answers.every((answer) => !answer.value);
      } else {
        return !line.value;
      }
    });
  };
  //submit是否可以点击
  //!isCompleted.current || !isInitAnswerState()为true 意味这手动输入input 判断value值
  //否者标识初始化 quiz.isCompleted为true 方法 return false
  const getSubmitDisable = () => {
    if (!isCompleted.current || !isInitAnswerState()) {
      return answerState.some((line) => {
        if (line.answers?.length) {
          return line.answers.some((answer) => !answer.value);
        } else {
          return !line.value;
        }
      });
    } else {
      return false;
    }
  };
  useEffect(() => {
    setSubmitDisable(getSubmitDisable());
    dealInputValue(false);
    setShowAnswer(false);
    initCompleteInput();
  }, [answerState, quiz]);

  useEffect(() => {
    isCompleted.current = quiz.isCompleted as boolean;
  }, [quiz]);

  useEffect(() => {
    if (showAnswer) setSubmitDisable(true);
    else setSubmitDisable(getSubmitDisable());
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
        {quiz.lines?.length > 0 && (
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
