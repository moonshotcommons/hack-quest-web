import { PlaygroundContext } from '@/components/v2/LessonPage/Playground/type';
import {
  CustomType,
  NotionType,
  QuizAType
} from '@/components/v2/LessonPage/type';
import { BurialPoint } from '@/helper/burialPoint';
import {
  adaptWidth,
  changeTextareaHeight,
  elementVibration
} from '@/helper/utils';
import { AnswerState, useParseQuizA } from '@/hooks/useParseQuizA';
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
  const prevQuiz = useRef<any>({});
  const isCompleted = useRef(false);
  const { lesson } = useContext(PlaygroundContext);
  const { onPass } = useContext(QuizContext);
  const { waitingRenderCodes, answerState, answerStateDispatch } =
    useParseQuizA(quiz.lines);

  const dealInputValue = (show: boolean) => {
    const newAnswerState = JSON.parse(JSON.stringify(answerState));
    newAnswerState.map((line: AnswerState) => {
      if (line.answers?.length) {
        line.answers.map((answer: AnswerState) => {
          let inputEle: HTMLTextAreaElement | HTMLInputElement;
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
          }
        });
      } else {
        let inputEle: HTMLTextAreaElement | HTMLInputElement;
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
          changeTextareaHeight(inputEle);
        }
      }
    });
  };
  const setAnswers = () => {
    const show = !showAnswer;
    if (show) {
      BurialPoint.track('lesson-show answer次数');
    }
    setShowAnswer(show);
    dealInputValue(show);
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
            const inputEle = document.querySelector(
              `[data-uuid="${line.id}"]`
            ) as HTMLTextAreaElement;
            elementVibration(inputEle);
          }
        });
      } else {
        if (!new RegExp(line.regex).test(line.value.trim())) {
          isCurrent = false;
          line.error = true;
          const inputEle = document.querySelector(
            `[data-uuid="${line.id}"]`
          ) as HTMLInputElement;
          elementVibration(inputEle);
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
    if (!isCompleted.current) return;
    const newAnswerState: AnswerState[] = JSON.parse(
      JSON.stringify(answerState)
    );
    if (newAnswerState.length) {
      newAnswerState.map((line) => {
        if (line.answers?.length) {
          line.answers.map((l) => {
            const { answer } = l;
            l.inputValue = answer;
            l.value = answer;
            let inputEle: HTMLTextAreaElement | HTMLInputElement;
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
          const inputEle = document.querySelector(
            `[data-uuid="${line.id}"]`
          ) as HTMLTextAreaElement;
          if (inputEle) {
            inputEle.value = answer;
            changeTextareaHeight(inputEle);
          }
        }
      });
      answerStateDispatch(newAnswerState);
      isCompleted.current = false;
    }
  };

  //submit是否可以点击
  //!isCompleted.current || !isInitAnswerState()为true 意味这手动输入input 判断value值
  //否者标识初始化 quiz.isCompleted为true 方法 return false
  const getSubmitDisable = () => {
    return !answerState.some((line) => {
      if (line.answers?.length) {
        return line.answers.some((answer) => answer.value);
      } else {
        return line.value;
      }
    });
  };

  useEffect(() => {
    if (JSON.stringify(quiz) !== JSON.stringify(prevQuiz.current)) {
      prevQuiz.current = JSON.parse(JSON.stringify(quiz));
      isCompleted.current = quiz.isCompleted as boolean;
      setShowAnswer(false);
    }
    setSubmitDisable(getSubmitDisable());
    initCompleteInput();
    dealInputValue(false);
  }, [answerState]);

  useEffect(() => {
    if (showAnswer) setSubmitDisable(true);
    else setSubmitDisable(getSubmitDisable());
  }, [showAnswer]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-fit">
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
          <div className="max-h-[100%] py-4 flex-1 w-full overflow-hidden flex flex-col">
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
