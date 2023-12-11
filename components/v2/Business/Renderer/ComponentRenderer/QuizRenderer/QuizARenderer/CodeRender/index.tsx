import { WaitingRenderCodeType } from '@/hooks/useParseQuizA';
import React, { useContext } from 'react';
import { RendererContext } from '@/components/v2/Business/Renderer/context';

interface CodeRenderType {
  waitingRenderCodes: WaitingRenderCodeType[];
}
const CodeRender: React.FC<CodeRenderType> = ({ waitingRenderCodes }) => {
  const { answers } = useContext(RendererContext).quizARendererContext!;
  const fillStr = (index: number) => {
    return index < 10 ? `0${index}` : index;
  };
  return (
    <div className="h-full w-full bg-renderer-code-bg relative rounded-[10px] pr-[20px] overflow-auto scroll-wrap-x scroll-wrap-y">
      <ul className="p-[15px] max-w-full">
        {waitingRenderCodes.map((line, lineIndex) => (
          <li
            className="list-decimal w-full text-text-default-color font-thin whitespace-nowrap flex items-center justify-start"
            key={lineIndex}
          >
            <span className="mr-[1.875rem] text-lesson-code-index text-[12px] font-mono">
              {fillStr(lineIndex + 1)}
            </span>
            <div className="flex-1 flex flex-shrink-0 items-center break-all whitespace-pre-wrap">
              {line.render(answers)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodeRender;
