'use client';
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'framer-motion';
import {
  CustomType,
  NotionType,
  QuizBType
} from '@/components/v2/LessonPage/type';
import ComponentRenderer from '../..';
import DragAnswer from './DragAnswer';
import { AnswerType, QuizBContext, QuizOptionType } from './type';
import Button from '@/components/Common/Button';
import QuizFooter from '../QuizFooter';
import { message } from 'antd';
import { QuizContext } from '..';

interface QuizBRendererProps {
  parent: CustomType | NotionType;
  quiz: QuizBType;
}

const QuizBRenderer: FC<QuizBRendererProps> = (props) => {
  const { quiz } = props;
  const { onPass } = useContext(QuizContext);
  const [options, setOptions] = useState<QuizOptionType[]>(() =>
    quiz.options.map((option) => ({ ...option, isRender: true }))
  );
  const [showAnswer, setShowAnswer] = useState(false);

  const [answers, setAnswers] = useState<Record<string, AnswerType>>({});

  const onDrop = (item: AnswerType) => {
    const newAnswers = { ...answers, [item.id]: item };
    setAnswers(newAnswers);
    setOptions(
      options.map((option) => {
        if (answers[item.id].option?.id === option.id) {
          option = { ...option, isRender: true };
        }

        if (option.id === item.option?.id) {
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
      let inputAnswer = answerItem
        .option!.content.rich_text.map((text: any) => text.plain_text.trim())
        .join('');

      if (answerItem.answer !== inputAnswer) {
        answerItem.status = 'error';
        wrongAnswers.push(answerItem);
      }
    }

    if (!wrongAnswers.length) {
      onPass();
      return;
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
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <DndProvider backend={HTML5Backend}>
        <div className="rounded-lg pb-20">
          <QuizBContext.Provider
            value={{
              onDrop,
              accept: options,
              changeOptionState: (options) => setOptions(options),
              answers,
              showAnswer,
              setAnswers
            }}
          >
            <div className="py-4 flex items-center">
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
          </QuizBContext.Provider>

          <div className="mt-[52px] flex flex-row gap-[30px] flex-wrap">
            {options.map((option) => {
              if (!option.isRender) return null;
              return (
                // <motion.div
                //   key={option.id}
                //   initial={{ translateY: 50, opacity: 0 }}
                //   animate={{ opacity: 1, translateY: 0 }}
                //   transition={{ duration: 0.5 }}
                // >
                <DragAnswer option={option} key={option.id}>
                  {option.content.rich_text.map(
                    (richText: any, index: number) => {
                      return <span key={index}>{richText.plain_text}</span>;
                    }
                  )}
                </DragAnswer>
                // </motion.div>
              );
            })}
          </div>
        </div>
      </DndProvider>
      <QuizFooter
        showAnswer={showAnswer}
        submitDisable={
          !!Object.keys(answers).find((key) => !answers[key].option)
        }
        setShowAnswer={(isShow) => setShowAnswer(isShow)}
        onSubmit={onSubmit}
      ></QuizFooter>
    </div>
  );
};

export default QuizBRenderer;
