import { WaitingRenderCodeType } from '@/hooks/useParseQuiz';
import React, { useContext } from 'react';
import { RendererContext } from '@/components/Web/Business/Renderer/context';

interface CodeRenderType {
  waitingRenderCodes: WaitingRenderCodeType[];
}
const CodeRender: React.FC<CodeRenderType> = ({ waitingRenderCodes }) => {
  const { answers } = useContext(RendererContext).quizARendererContext!;
  const fillStr = (index: number) => {
    return index < 10 ? `0${index}` : index;
  };
  return (
    <div className="h-full w-full bg-neutral-off-white relative rounded-[10px] pr-[20px] overflow-auto scroll-wrap-x scroll-wrap-y">
      <ul className="p-[15px] max-w-full">
        {waitingRenderCodes.map((line, lineIndex) => (
          <li
            className="list-decimal w-full text-text-default-color font-thin whitespace-nowrap flex items-center justify-start"
            key={lineIndex}
          >
            <span className="mr-[20px] text-neutral-medium-gray font-Space-Mono text-[10px]">
              {fillStr(lineIndex + 1)}
            </span>
            <div className="flex-1 flex flex-shrink-0 items-center break-all whitespace-pre-wrap code-l">
              {line.render(answers)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodeRender;
