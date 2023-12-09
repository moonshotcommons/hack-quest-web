'use client';
import {
  CustomType,
  NotionComponent,
  NotionType,
  QuizBType
} from '@/components/v2/Business/Renderer/type';
import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import { QuizContext } from '..';

import TextRenderer from '@/components/v2/Business/NotionRender/TextRenderer';
import Button from '@/components/v2/Common/Button';
import { cn } from '@/helper/utils';
import { message } from 'antd';
import { RendererContext } from '@/components/v2/Business/Renderer/context';
import ComponentRenderer from '@/components/v2/Business/Renderer/MiniElectiveRenderer';

interface QuizCRendererProps {
  parent: CustomType | NotionType;
  quiz: any;
}

const QuizCRenderer: FC<QuizCRendererProps> = (props) => {
  const { quiz } = props;

  const [answers, setAnswers] = useState<number[]>([]);

  const onSubmit = () => {
    let wrongAnswer = answers.find((answer) => !quiz.answers.includes(answer));
    if (wrongAnswer) {
      message.error('答案错误');
      return;
    }

    let rightAnswer = quiz.answers.find(
      (answer: any) => !answers.includes(answer)
    );
    if (rightAnswer) {
      message.error('答案错误');
      return;
    }

    message.success('回答正确');
  };

  return (
    <div className="h-full flex flex-col">
      <RendererContext.Provider
        value={{
          textRenderer: {
            fontSize: '18px'
          }
        }}
      >
        <div className="font-next-book-bold leading-[125%] tracking-[0.36px] mt-[32px]">
          {quiz?.children?.map((child: any, index: number) => {
            return (
              <ComponentRenderer
                key={index}
                parent={quiz}
                component={child}
              ></ComponentRenderer>
            );
          })}
        </div>
      </RendererContext.Provider>
      <div className="mt-[32px] flex flex-col gap-y-[24px]">
        {quiz?.options?.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className={cn(
                'px-6 py-5 flex items-center border border-[#DADADA] rounded-[10px] cursor-pointer gap-[20px] hover:scale-[1.01] transition-all duration-200',
                answers.includes(item.index) ? 'bg-[#FFF4CE]' : ''
              )}
              onClick={() => {
                if (answers.includes(item.index)) {
                  setAnswers(answers.filter((answer) => answer !== item.index));
                } else {
                  setAnswers(answers.concat(item.index));
                }
              }}
            >
              <div className="w-8 h-8 flex flex-center border-[2px] border-[#DADADA] rounded-[4px]">
                {item.index}
              </div>
              <TextRenderer
                richTextArr={item.option?.content?.rich_text}
                fontSize="16px"
              ></TextRenderer>
            </div>
          );
        })}
      </div>
      <div className="mt-[32px]">
        <Button
          type="primary"
          className="w-[165px] p-0 py-[11px] font-next-book leading-[125%] tracking-[0.32px] text-[#0B0B0B]"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default QuizCRenderer;
