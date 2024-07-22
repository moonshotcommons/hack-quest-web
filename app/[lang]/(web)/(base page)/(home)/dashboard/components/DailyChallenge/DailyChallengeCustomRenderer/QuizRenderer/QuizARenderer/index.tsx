import { BurialPoint } from '@/helper/burialPoint';
import { adaptWidth, changeTextareaHeight, elementVibration } from '@/helper/utils';
import { AnswerState, useParseQuiz } from '@/hooks/courses/useParseQuiz';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { QuizContext } from '..';
import CodeRender from './CodeRender';
import { cloneDeep } from 'lodash-es';
import { FooterButtonStatus } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
import emitter from '@/store/emitter';
import { useGetQuizsCompleted } from '@/hooks/courses/useGetQuizsCompleted';
import { QuizAType } from '@/components/ComponentRenderer/type';
import { OverrideRendererConfig, childRenderCallback } from '@/components/ComponentRenderer';
import { useDailyChallengeContext } from '../../../DailyChallengeProvider';
interface QuizARendererProps {
  parent: any;
  quiz: QuizAType;
}

const QuizARenderer: FC<QuizARendererProps> = (props) => {
  const { quiz, parent } = props;
  const [showAnswer, setShowAnswer] = useState(false);
  const prevQuiz = useRef<any>({});
  const isCompleted = useRef(false);
  const { updateButtonState, end } = useDailyChallengeContext();
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
      return false;
    }
    onPass();
    return true;
  };

  // 自动填充
  const initCompleteInput = () => {
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
      setShowAnswer(false);
    }

    if (end) {
      initCompleteInput();
      updateButtonState({
        disable: false,
        type: 'next'
      });
    }

    if (!initFooterBtn.current && !end) {
      updateButtonState({
        disable: getSubmitDisable(),
        type: 'submit'
      });
    }

    dealInputValue(false);
  }, [answerState, end]);

  // useEffect(() => {
  //   if (showAnswer)
  //     // setFooterBtn({
  //     //   footerBtnDisable: true
  //     // });
  //     updateButtonState({ disable: true });
  //   else
  //     updateButtonState({
  //       disable: getSubmitDisable()
  //     });
  //   return () => {
  //     emitter.off(FooterButtonStatus.SUBMIT, submit);
  //   };
  // }, [showAnswer]);

  useEffect(() => {
    let { footerBtnStatus: type, footerBtnDisable: disable } = getFooterBtnInfo(parent);
    initFooterBtn.current = false;
    // if (!quiz.isCompleted) {
    //   initFooterBtn.current = false;
    //   type = FooterButtonStatus.SUBMIT;
    //   disable = true;
    // }
    // setTimeout(() => {
    //   initFooterBtn.current = false;
    //   updateButtonState({
    //     type,
    //     disable
    //   });
    // }, 10);

    return () => {
      emitter.off(FooterButtonStatus.SUBMIT, submit);
    };
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
    </div>
  );
};

export default QuizARenderer;
