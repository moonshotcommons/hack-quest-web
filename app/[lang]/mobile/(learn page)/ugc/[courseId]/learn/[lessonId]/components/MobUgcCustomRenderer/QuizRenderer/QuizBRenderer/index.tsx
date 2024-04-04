'use client';

import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QuizContext } from '..';

import QuizFooter from '../QuizFooter';
import DragAnswer from './DragAnswer';
import { AnswerType, QuizOptionType } from './type';
import {
  FooterButtonStatus,
  FooterButtonText,
  UgcContext
} from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
import emitter from '@/store/emitter';
import { useGetQuizsCompleted } from '@/hooks/courses/useGetQuizsCompleted';
import { NotionComponent, NotionComponentType, QuizBType } from '@/components/ComponentRenderer/type';
import { ComponentRenderer, OverrideRendererConfig } from '@/components/ComponentRenderer';
import DropAnswer from './DropAnswer';
interface QuizBRendererProps {
  parent: any;
  quiz: QuizBType;
}

const QuizBRenderer: FC<QuizBRendererProps> = (props) => {
  const { quiz, parent } = props;
  const { onPass } = useContext(QuizContext);
  const [options, setOptions] = useState<QuizOptionType[]>(() =>
    quiz.options.map((option) => ({ ...option, isRender: true }))
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const { lesson, setFooterBtn } = useContext(UgcContext);
  const [answers, setAnswers] = useState<Record<string, AnswerType>>({});
  const mountAnswers = useRef(0);
  const initFooterBtn = useRef(true);
  const [mountOptionIds, setMountOptionIds] = useState<string[]>([]);
  const { getFooterBtnInfo } = useGetQuizsCompleted();
  const onDrop = (dropAnswer: AnswerType, replaceOption?: QuizOptionType | null) => {
    const newAnswers = { ...answers, [dropAnswer.id]: dropAnswer };
    setAnswers(newAnswers);
    setOptions(
      options.map((option) => {
        if (answers[dropAnswer.id].option?.id === option.id || (replaceOption && replaceOption.id === option.id)) {
          option = { ...option, isRender: true };
        }

        if (option.id === dropAnswer.option?.id) {
          return { ...option, isRender: false };
        }

        return option;
      })
    );
  };

  const onSubmit = () => {
    BurialPoint.track('lesson-单个quiz提交', { lessonId: lesson.id });
    const newAnswers = { ...answers };
    let wrongAnswers = [];
    for (const key in newAnswers) {
      let answerItem = answers[key];
      let inputAnswer = answerItem.option!.content.rich_text.map((text: any) => text.plain_text.trim()).join('');

      if (answerItem.answer !== inputAnswer) {
        answerItem.status = 'error';

        wrongAnswers.push(answerItem);
      }
    }

    if (!wrongAnswers.length) {
      onPass();
      return;
    }
    BurialPoint.track('lesson-单个quiz提交未通过', { lessonId: lesson.id });
    const wrongOptionIds = wrongAnswers.map((item) => item.option!.id);
    setOptions((prevOptions) => {
      const newOptions = prevOptions.map((option) => {
        if (wrongOptionIds.includes(option.id)) {
          return { ...option, isRender: true };
        }
        return option;
      });
      return newOptions;
    });

    wrongAnswers.map((item) => {
      item.option = null;
      return item;
    });

    setAnswers(newAnswers);

    webApi.courseApi.markQuestState(lesson.id, false);
  };

  if (emitter.all.get(FooterButtonStatus.SUBMIT)) {
    emitter.all.delete(FooterButtonStatus.SUBMIT);
    emitter.on(FooterButtonStatus.SUBMIT, onSubmit);
  } else {
    emitter.on(FooterButtonStatus.SUBMIT, onSubmit);
  }

  useEffect(() => {
    const answerOptions = Object.keys(answers)
      .map((key) => answers[key].option?.id)
      .filter((id) => !!id);
    setOptions(
      quiz.options.map((option) => {
        if (answerOptions.includes(option.id)) {
          return { ...option, isRender: false };
        }
        return { ...option, isRender: true };
      })
    );
    let { footerBtnText, footerBtnStatus, footerBtnDisable } = getFooterBtnInfo(parent);
    initFooterBtn.current = true;
    if (!quiz?.isCompleted) {
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
    setMountOptionIds([]);
  }, [quiz]);

  useEffect(() => {
    if (quiz?.isCompleted && mountOptionIds.length !== Object.keys(answers).length) {
      const newAnswers = { ...answers };
      const mountOptionIds: string[] = [];
      for (const key in newAnswers) {
        let answerItem = answers[key];
        const findOption = options.find(
          (option) => option.content.rich_text.map((text: any) => text.plain_text.trim()).join('') === answerItem.answer
        ) as QuizOptionType;
        if (findOption) {
          answerItem.option = findOption;
          mountOptionIds.push(findOption.id);
          setMountOptionIds(mountOptionIds);
        }
      }
      setAnswers(newAnswers);
      setOptions((prevOptions) => {
        const newOptions = prevOptions.map((option) => {
          if (mountOptionIds.includes(option.id)) {
            return { ...option, isRender: false };
          }
          return option;
        });
        return newOptions;
      });
      mountAnswers.current += 1;
    }
    if (!initFooterBtn.current) {
      const footerBtnDisable = !Object.keys(answers).find((key) => answers[key].option) || showAnswer;
      setFooterBtn({
        footerBtnDisable,
        footerBtnStatus: FooterButtonStatus.SUBMIT
      });
    }

    return () => {
      emitter.off(FooterButtonStatus.SUBMIT, onSubmit);
    };
  }, [answers]);

  const { quizChildren, parseComponent } = useMemo(() => {
    let parseComponent: NotionComponent | null = null;
    for (let i = quiz.children.length - 1; i >= 0; i--) {
      let child = quiz.children[i];
      if (child.type === NotionComponentType.TOGGLE) {
        parseComponent = child;
      }
    }

    return {
      parseComponent,
      quizChildren: !!parseComponent ? quiz.children.filter((item) => item.id !== parseComponent!.id) : quiz.children
    };
  }, [quiz]);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="scroll-wrap-y flex-1 overflow-auto">
        <DndProvider backend={HTML5Backend}>
          <div className="rounded-lg">
            <OverrideRendererConfig
              quizBRendererContext={{
                onDrop,
                accept: options,
                changeOptionState: (options) => setOptions(options),
                answers,
                showAnswer,
                setAnswers,
                quiz,
                DropAnswerComponent: DropAnswer
              }}
            >
              <div className="items-center py-4">
                {quizChildren.map((child) => {
                  return <ComponentRenderer key={child.id} parent={quiz} component={child}></ComponentRenderer>;
                })}
              </div>
            </OverrideRendererConfig>

            <div className=" flex flex-row flex-wrap gap-[30px] pb-4 pt-[52px]">
              {options.map((option) => {
                if (!option.isRender) return null;
                return (
                  <DragAnswer
                    option={option}
                    key={option.id}
                    onClick={() => {
                      if (showAnswer) return;
                      const emptyAnswerKey = Object.keys(answers).find((key) => !answers[key].option);
                      let replaceAnswerKey = emptyAnswerKey;
                      let replaceOption = null;
                      if (!emptyAnswerKey) {
                        replaceAnswerKey = Object.keys(answers)[0];
                      }
                      const dropAnswer = answers[replaceAnswerKey!];
                      if (dropAnswer.option) replaceOption = dropAnswer.option;
                      dropAnswer.option = option;
                      onDrop(dropAnswer, replaceOption);
                    }}
                  >
                    {option.content.rich_text.map((richText: any, index: number) => {
                      return <span key={index}>{richText.plain_text}</span>;
                    })}
                  </DragAnswer>
                );
              })}
            </div>
          </div>
        </DndProvider>
        {!!parseComponent && (
          <div className="mt-5">
            <ComponentRenderer key={parseComponent.id} parent={quiz} component={parseComponent}></ComponentRenderer>
          </div>
        )}
      </div>
      <QuizFooter
        showAnswer={showAnswer}
        submitDisable={!Object.keys(answers).find((key) => answers[key].option) || showAnswer}
        setShowAnswer={(isShow) => {
          if (isShow) BurialPoint.track('lesson-show answer次数');
          setShowAnswer(isShow);
        }}
      ></QuizFooter>
    </div>
  );
};

export default QuizBRenderer;
