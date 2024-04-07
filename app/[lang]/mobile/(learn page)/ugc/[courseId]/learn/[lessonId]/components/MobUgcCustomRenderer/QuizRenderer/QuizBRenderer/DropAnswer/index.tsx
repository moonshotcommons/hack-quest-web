'use client';
import { motion } from 'framer-motion';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { MdCancel } from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import { QuizContext } from '../..';
import { AnswerType, QuizOptionType } from '../type';
import { useQuizBRendererContext } from '@/components/ComponentRenderer';
interface DropAnswerProps {
  answer: string;
}

const DropAnswer: FC<DropAnswerProps> = (props) => {
  const { answer } = props;
  const { onDrop, accept, changeOptionState, answers, showAnswer, setAnswers, quiz } = useQuizBRendererContext();
  const { currentQuizIndex } = useContext(QuizContext);
  const [clearVisible, setClearVisible] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<AnswerType>();

  const renderState = useRef(false);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: showAnswer ? [] : accept.map((option) => option.id),
    drop: (item: QuizOptionType) => {
      if (!currentAnswer) return;
      const curAnswer: AnswerType = {
        ...currentAnswer,
        option: item,
        status: 'default'
      };
      setCurrentAnswer(curAnswer);
      onDrop(curAnswer as AnswerType);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  useEffect(() => {
    if (!currentAnswer) {
      if (process.env.NODE_ENV === 'development' && renderState.current) return;
      const newAnswer: AnswerType = {
        id: uuid(),
        answer,
        option: null,
        status: 'default'
      };

      setAnswers({});
      setAnswers((state) => {
        const newAnswers: any = {
          ...state,
          [newAnswer.id]: newAnswer
        };
        return newAnswers;
      });
      setCurrentAnswer(newAnswer);
      renderState.current = true;
    }
  }, [quiz]);

  useEffect(() => {
    setClearVisible(false);
    if (currentAnswer) {
      const updateAnswer = answers[currentAnswer.id];
      setCurrentAnswer(updateAnswer);
    }
  }, [answers]);

  return (
    <div ref={drop} className="relative inline-block">
      {(!currentAnswer?.option || showAnswer) && (
        <motion.span
          animate={{
            rotate: [0, -0.2, 0.2, -0.2, 0.2, 0],
            x: [-2, 2, -2, 2, 0] // 定义水平偏移的关键帧
          }}
          transition={{
            duration: currentAnswer?.status === 'error' ? 0.5 : 0 // 动画持续时间
          }}
          className={`body-s relative mx-[10px] my-1 inline-flex h-[34px] min-w-[110px] items-center justify-center rounded-[3px] border-[0.5px] border-neutral-medium-gray bg-neutral-off-white ${
            currentAnswer?.status === 'error' ? 'border-[#C73333] bg-[#FFF7F5]' : ''
          }`}
        >
          <div className="relative inline-flex items-center px-5">
            &nbsp;{showAnswer && currentAnswer?.answer}&nbsp;
          </div>
        </motion.span>
      )}
      {!!currentAnswer?.option && !showAnswer && (
        <span
          className="body-s relative mx-[10px] my-1 inline-flex h-[34px] min-w-[110px] cursor-move rounded-[3px] border-[0.5px] border-neutral-medium-gray bg-[#FFF4CE] text-neutral-black"
          onMouseEnter={() => setClearVisible(true)}
          onMouseLeave={() => setClearVisible(false)}
        >
          <span className="relative inline-flex w-full items-center">
            <span className="px-[7px] leading-[125%]">
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H13" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M1 7H13" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="flex-1 overflow-hidden text-ellipsis px-5 text-center">
              {currentAnswer.option.content.rich_text.map((richText: any, index: number) => {
                return <span key={index}>{richText.plain_text}</span>;
              })}
            </span>
          </span>

          {clearVisible && (
            <span
              className={`absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white bg-opacity-90`}
              onClick={() => {
                const curAnswer: AnswerType = {
                  ...currentAnswer,
                  option: null,
                  status: 'default'
                };
                setCurrentAnswer(curAnswer);
                const newAnswers = { ...answers, [curAnswer.id]: curAnswer };
                setAnswers(newAnswers);
                answers[curAnswer.id] = curAnswer;
                const options = accept.map((item) => {
                  if (item.id === currentAnswer?.option?.id) return { ...item, isRender: true };
                  return item;
                });
                changeOptionState(options);
              }}
            >
              <MdCancel color="#3E3E3E" size={20} />
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default DropAnswer;
