'use client';
import { FC, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { AnswerType, QuizBContext, QuizOptionType } from '../type';
import { MdOutlineDragHandle } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import { motion } from 'framer-motion';
interface DropAnswerProps {
  answer: string;
}

const DropAnswer: FC<DropAnswerProps> = (props) => {
  const { answer } = props;
  const { onDrop, accept, changeOptionState, answers, showAnswer, setAnswers } =
    useContext(QuizBContext);
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

      setAnswers((state) => {
        const newAnswers = {
          ...state,
          [newAnswer.id]: newAnswer
        };
        return newAnswers;
      });
      setCurrentAnswer(newAnswer);
      renderState.current = true;
    }
  }, []);

  useEffect(() => {
    if (currentAnswer) {
      const updateAnswer = answers[currentAnswer.id];
      setCurrentAnswer(updateAnswer);
    }
  }, [answers]);

  return (
    <div ref={drop} className="inline-block">
      {(!currentAnswer?.option || showAnswer) && (
        <motion.span
          animate={{
            rotate: [0, -0.2, 0.2, -0.2, 0.2, 0],
            x: [-2, 2, -2, 2, 0] // 定义水平偏移的关键帧
          }}
          transition={{
            duration: currentAnswer?.status === 'error' ? 0.5 : 0 // 动画持续时间
          }}
          className={`inline-flex w-[100px] px-[10px] mx-[10px] h-[34px] rounded-[3px] border-[0.5px] my-1 border-[#8C8C8C] bg-[#F4F4F4] justify-center items-center font-next-book text-[14px] ${
            currentAnswer?.status === 'error'
              ? 'bg-[#FFF7F5] border-[#C73333]'
              : ''
          }`}
        >
          &nbsp;{showAnswer && currentAnswer?.answer}&nbsp;
        </motion.span>
      )}
      {!!currentAnswer?.option && !showAnswer && (
        <div
          className="inline-flex relative gap-[28px] pl-[8px] py-[7px] bg-[#FFF4CE] cursor-move border-[0.5px] border-[#8C8C8C] rounded-[3px] text-[#000] font-next-book text-[14px] leading-[125%] tracking-[0.28px]"
          onMouseEnter={() => setClearVisible(true)}
          onMouseLeave={() => setClearVisible(false)}
        >
          <div className="inline-flex gap-[28px] items-center">
            <span>
              <MdOutlineDragHandle
                size={28}
                color="#8C8C8C"
              ></MdOutlineDragHandle>
            </span>
            <span className="pr-[28px]">
              {currentAnswer.option.content.rich_text.map(
                (richText: any, index: number) => {
                  return <span key={index}>{richText.plain_text}</span>;
                }
              )}
            </span>
          </div>

          {clearVisible && (
            <div
              className={`absolute w-full h-full top-0 left-0 bg-white flex items-center justify-center bg-opacity-90`}
              onClick={() => {
                const curAnswer = { ...currentAnswer, option: null };
                setCurrentAnswer(curAnswer);
                const newAnswers = { ...answers, [curAnswer.id]: curAnswer };
                setAnswers(newAnswers);
                answers[curAnswer.id] = curAnswer;
                const options = accept.map((item) => {
                  if (item.id === currentAnswer?.option?.id)
                    return { ...item, isRender: true };
                  return item;
                });
                changeOptionState(options);
              }}
            >
              <MdCancel color="#3E3E3E" size={20} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropAnswer;
