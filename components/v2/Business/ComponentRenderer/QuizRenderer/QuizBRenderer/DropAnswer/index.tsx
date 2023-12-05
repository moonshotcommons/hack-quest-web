'use client';
import { motion } from 'framer-motion';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { MdCancel } from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import { QuizContext } from '../..';
import { AnswerType, QuizBContext, QuizOptionType } from '../type';
interface DropAnswerProps {
  answer: string;
}

const DropAnswer: FC<DropAnswerProps> = (props) => {
  const { answer } = props;
  const {
    onDrop,
    accept,
    changeOptionState,
    answers,
    showAnswer,
    setAnswers,
    quiz
  } = useContext(QuizBContext);

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
    <div ref={drop} className="inline-block relative">
      {(!currentAnswer?.option || showAnswer) && (
        <motion.span
          animate={{
            rotate: [0, -0.2, 0.2, -0.2, 0.2, 0],
            x: [-2, 2, -2, 2, 0] // 定义水平偏移的关键帧
          }}
          transition={{
            duration: currentAnswer?.status === 'error' ? 0.5 : 0 // 动画持续时间
          }}
          className={`inline-flex relative min-w-[110px] mx-[10px] h-[34px] rounded-[3px] border-[0.5px] my-1 border-[#8C8C8C] bg-[#F4F4F4] justify-center items-center font-next-book text-[14px] leading-[125%] ${
            currentAnswer?.status === 'error'
              ? 'bg-[#FFF7F5] border-[#C73333]'
              : ''
          }`}
        >
          <div className="inline-flex relative items-center px-5">
            &nbsp;{showAnswer && currentAnswer?.answer}&nbsp;
          </div>
        </motion.span>
      )}
      {!!currentAnswer?.option && !showAnswer && (
        <span
          className="inline-flex relative min-w-[110px] mx-[10px] h-[34px] my-1 bg-[#FFF4CE] cursor-move border-[0.5px] border-[#8C8C8C] rounded-[3px] text-[#000] font-next-book text-[14px] tracking-[0.28px] leading-[125%]"
          onMouseEnter={() => setClearVisible(true)}
          onMouseLeave={() => setClearVisible(false)}
        >
          <span className="inline-flex items-center relative w-full">
            <span className="leading-[125%] px-[7px]">
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1H13"
                  stroke="#8C8C8C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M1 7H13"
                  stroke="#8C8C8C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-center flex-1 overflow-hidden text-ellipsis px-5">
              {currentAnswer.option.content.rich_text.map(
                (richText: any, index: number) => {
                  return <span key={index}>{richText.plain_text}</span>;
                }
              )}
            </span>
          </span>

          {clearVisible && (
            <span
              className={`absolute w-full h-full top-0 left-0 bg-white flex items-center justify-center bg-opacity-90`}
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
                  if (item.id === currentAnswer?.option?.id)
                    return { ...item, isRender: true };
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
