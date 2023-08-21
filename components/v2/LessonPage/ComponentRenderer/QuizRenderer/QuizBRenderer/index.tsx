'use client';
import {
  FC,
  ReactNode,
  createContext,
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

interface QuizBRendererProps {
  parent: CustomType | NotionType;
  quiz: QuizBType;
}

const QuizBRenderer: FC<QuizBRendererProps> = (props) => {
  const { quiz } = props;

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

  return (
    <div className="h-full flex flex-col justify-between">
      <DndProvider backend={HTML5Backend}>
        <div className="rounded-lg">
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
        setShowAnswer={(isShow) => setShowAnswer(isShow)}
        onSubmit={() => {
          console.log(answers);
        }}
      ></QuizFooter>
    </div>
  );
};

export default QuizBRenderer;
