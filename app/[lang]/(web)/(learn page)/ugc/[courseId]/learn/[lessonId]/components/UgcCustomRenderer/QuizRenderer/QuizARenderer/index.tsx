import { BurialPoint } from '@/helper/burialPoint';
import { adaptWidth, changeTextareaHeight, elementVibration } from '@/helper/utils';
import { AnswerState, useParseQuiz } from '@/hooks/courses/useParseQuiz';
import webApi from '@/service';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { QuizContext } from '..';
import QuizFooter from '../QuizFooter';
import CodeRender from './CodeRender';
import { cloneDeep } from 'lodash-es';
import {
  FooterButtonStatus,
  FooterButtonText,
  UgcContext
} from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
import emitter from '@/store/emitter';
import { useGetQuizsCompleted } from '@/hooks/courses/useGetQuizsCompleted';
import { QuizAType } from '@/components/ComponentRenderer/type';
import { OverrideRendererConfig, childRenderCallback } from '@/components/ComponentRenderer';
interface QuizARendererProps {
  parent: any;
  quiz: QuizAType;
}

const QuizARenderer: FC<QuizARendererProps> = (props) => {
  const { quiz, parent } = props;
  const [showAnswer, setShowAnswer] = useState(false);
  const prevQuiz = useRef<any>({});
  const isCompleted = useRef(false);
  const { lesson, setFooterBtn } = useContext(UgcContext);
  const initFooterBtn = useRef(true);
  const { onPass } = useContext(QuizContext);
  const { getFooterBtnInfo } = useGetQuizsCompleted();
  const { waitingRenderCodes, answerState, answerStateDispatch } = useParseQuiz(quiz.lines);

  const [showHint, setShowHint] = useState<boolean>(false);

  const dealInputValue = (show: boolean) => {
    const newAnswerState = JSON.parse(JSON.stringify(answerState));
    newAnswerState.map((line: AnswerState) => {
      if (line.answers?.length) {
        line.answers.map((answer: AnswerState) => {
          let inputEle: HTMLTextAreaElement | HTMLInputElement;
          inputEle = document.querySelector(`[data-uuid="${answer.id}"]`) as HTMLInputElement;
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
        inputEle = document.querySelector(`[data-uuid="${line.id}"]`) as HTMLTextAreaElement;
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

  const submit = async () => {
    BurialPoint.track('lesson-单个quiz提交', { lessonId: lesson.id });
    const newAnswerState = [...answerState];
    let isCurrent = true;
    newAnswerState.map((line) => {
      if (line.answers?.length) {
        line.answers.map((answer) => {
          if (!new RegExp(answer.regex).test(answer.value.trim())) {
            isCurrent = false;
            answer.error = true;
            const inputEle = document.querySelector(`[data-uuid="${answer.id}"]`) as HTMLTextAreaElement;
            elementVibration(inputEle);
          }
        });
      } else {
        if (!new RegExp(line.regex).test(line.value.trim())) {
          isCurrent = false;
          line.error = true;
          const inputEle = document.querySelector(`[data-uuid="${line.id}"]`) as HTMLInputElement;
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
    const newAnswerState: AnswerState[] = cloneDeep(answerState);
    if (newAnswerState.length) {
      newAnswerState.map((line) => {
        if (line.answers?.length) {
          line.answers.map((l) => {
            const { answer } = l;
            l.inputValue = answer;
            l.value = answer;
            let inputEle: HTMLTextAreaElement | HTMLInputElement;
            inputEle = document.querySelector(`[data-uuid="${l.id}"]`) as HTMLInputElement;
            if (inputEle) {
              inputEle.value = answer;
              adaptWidth(inputEle);
            }
          });
        } else {
          const { answer } = line;
          line.inputValue = answer;
          line.value = answer;
          const inputEle = document.querySelector(`[data-uuid="${line.id}"]`) as HTMLTextAreaElement;
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

  const getSubmitDisable = () => {
    return !answerState.some((line) => {
      if (line.answers?.length) {
        return line.answers.some((answer) => answer.value);
      } else {
        return line.value;
      }
    });
  };

  if (emitter.all.get(FooterButtonStatus.SUBMIT)) {
    emitter.all.delete(FooterButtonStatus.SUBMIT);
    emitter.on(FooterButtonStatus.SUBMIT, submit);
  } else {
    emitter.on(FooterButtonStatus.SUBMIT, submit);
  }

  useEffect(() => {
    if (JSON.stringify(quiz) !== JSON.stringify(prevQuiz.current)) {
      prevQuiz.current = JSON.parse(JSON.stringify(quiz));
      isCompleted.current = quiz.isCompleted as boolean;
      setShowAnswer(false);
    }
    if (!initFooterBtn.current) {
      setFooterBtn({
        footerBtnDisable: getSubmitDisable(),
        footerBtnStatus: FooterButtonStatus.SUBMIT
      });
    }
    initCompleteInput();
    dealInputValue(false);
  }, [answerState]);

  useEffect(() => {
    if (showAnswer)
      setFooterBtn({
        footerBtnDisable: true
      });
    else
      setFooterBtn({
        footerBtnDisable: getSubmitDisable()
      });
    return () => {
      emitter.off(FooterButtonStatus.SUBMIT, submit);
    };
  }, [showAnswer]);

  useEffect(() => {
    let { footerBtnText, footerBtnStatus, footerBtnDisable } = getFooterBtnInfo(parent);
    initFooterBtn.current = true;
    if (!quiz.isCompleted) {
      initFooterBtn.current = false;
      footerBtnText = FooterButtonText.SUBMIT;
      footerBtnStatus = FooterButtonStatus.SUBMIT;
      footerBtnDisable = true;
    }
    setTimeout(() => {
      initFooterBtn.current = false;
      setFooterBtn({
        footerBtnText,
        footerBtnStatus,
        footerBtnDisable
      });
    }, 10);
  }, [quiz]);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="h-fit">{quiz.children.map(childRenderCallback(quiz))}</div>
        {quiz.lines?.length > 0 && (
          <div className="flex max-h-[100%] w-full flex-1 flex-col overflow-hidden py-4">
            <OverrideRendererConfig
              quizARendererContext={{
                answers: answerState,
                showAnswer,
                setAnswers
              }}
            >
              <CodeRender waitingRenderCodes={waitingRenderCodes} />
            </OverrideRendererConfig>
          </div>
        )}
        {showHint && quiz.hint && (
          <div className="mt-4">
            <p className="body-l-bold mb-2">Hint:</p>
            {quiz.hint.children.map(childRenderCallback(quiz.hint!))}
          </div>
        )}
      </div>
      <QuizFooter
        showAnswer={showAnswer}
        setShowAnswer={setAnswers}
        includeHint={!!quiz.hint}
        showHint={showHint}
        setShowHint={setShowHint}
        isCompleted={!!quiz.isCompleted}
        lessonId={lesson.id}
      ></QuizFooter>
    </div>
  );
};

export default QuizARenderer;
