'use client';

import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { QuizContext } from '..';

import DragAnswer from './DragAnswer';

import { FooterButtonStatus } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';

import emitter from '@/store/emitter';
import { useGetQuizsCompleted } from '@/hooks/courses/useGetQuizsCompleted';
import { ComponentRenderer, OverrideRendererConfig, childRenderCallback } from '@/components/ComponentRenderer';
import DropAnswer from './DropAnswer';
import { NotionComponent, NotionComponentType, QuizBType } from '@/components/ComponentRenderer/type';
import { AnswerType, QuizOptionType } from '@/components/ComponentRenderer/context';
import { useDailyChallengeContext } from '../../../DailyChallengeProvider';

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
  const { updateButtonState, end } = useDailyChallengeContext();
  const [answers, setAnswers] = useState<Record<string, AnswerType>>({});
  const mountAnswers = useRef(0);
  const initFooterBtn = useRef(true);
  const [mountOptionIds, setMountOptionIds] = useState<string[]>([]);
  const { getFooterBtnInfo } = useGetQuizsCompleted();

  const [showHint, setShowHint] = useState(false);

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
    const newAnswers = { ...answers };
    let wrongAnswers = [];
    for (const key in newAnswers) {
      let answerItem = answers[key];
      let inputAnswer = answerItem.option!.content.rich_text.map((text: any) => text.plain_text.trim()).join('');

      if (answerItem.answer !== inputAnswer) {
        answerItem.status = 'error';

        wrongAnswers.push(answerItem);
      } else {
        answerItem.status = 'success';
      }
    }

    if (!wrongAnswers.length) {
      onPass();
      return true;
    }
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
    return false;
  };

  if (emitter.all.get('submit')) {
    emitter.all.delete('submit');
    emitter.on('submit', onSubmit);
  } else {
    emitter.on('submit', onSubmit);
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
    let { footerBtnStatus: type, footerBtnDisable: disable } = getFooterBtnInfo(parent);
    initFooterBtn.current = false;
    // if (!quiz?.isCompleted) {
    //   initFooterBtn.current = false;
    //   type = FooterButtonStatus.SUBMIT;
    //   disable = true;
    // }
    // setTimeout(() => {
    //   initFooterBtn.current = false;
    //   updateButtonState({ type, disable });
    // }, 10);
    setMountOptionIds([]);
    return () => {
      emitter.off(FooterButtonStatus.SUBMIT, onSubmit);
    };
  }, [quiz]);

  useEffect(() => {
    if (end && mountOptionIds.length !== Object.keys(answers).length) {
      const newAnswers = { ...answers };
      const mountOptionIds: string[] = [];
      for (const key in newAnswers) {
        let answerItem = answers[key];
        const findOption = options.find(
          (option) => option.content.rich_text.map((text: any) => text.plain_text.trim()).join('') === answerItem.answer
        ) as QuizOptionType;
        if (findOption) {
          answerItem.option = findOption;
          answerItem.status = 'success';
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
      updateButtonState({
        disable: false,
        type: FooterButtonStatus.NEXT
      });
    }
    if (!initFooterBtn.current && !end) {
      const disable = !Object.keys(answers).find((key) => answers[key].option) || showAnswer;
      updateButtonState({
        disable,
        type: FooterButtonStatus.SUBMIT
      });
    }
  }, [answers, end]);

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
              {quizChildren.map(
                childRenderCallback(
                  (function (quiz) {
                    quiz.children = quizChildren;
                    return quiz;
                  })(quiz)
                )
              )}
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

        {!!parseComponent && (
          <div className="mt-5">
            <ComponentRenderer
              key={parseComponent.id}
              parent={quiz}
              component={parseComponent}
              prevComponent={null}
              nextComponent={null}
              position={0}
            ></ComponentRenderer>
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

export default QuizBRenderer;
