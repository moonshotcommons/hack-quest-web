import { useQuizARendererContext } from '@/components/ComponentRenderer';
import { WaitingRenderCodeType } from '@/hooks/courses/useParseQuiz';
import React from 'react';

interface CodeRenderType {
  waitingRenderCodes: WaitingRenderCodeType[];
}
const CodeRender: React.FC<CodeRenderType> = ({ waitingRenderCodes }) => {
  const { answers } = useQuizARendererContext();
  const fillStr = (index: number) => {
    return index < 10 ? `0${index}` : index;
  };
  return (
    <div className="scroll-wrap-x scroll-wrap-y relative h-full w-full overflow-auto rounded-[10px] bg-neutral-off-white pr-[20px]">
      <ul className="flex max-w-full flex-col gap-[5px] p-[15px]">
        {waitingRenderCodes.map((line, lineIndex) => (
          <li
            className="flex w-full list-decimal items-center justify-start whitespace-nowrap font-thin text-text-default-color"
            key={lineIndex}
          >
            <span className="code-s mr-5 text-neutral-medium-gray">{fillStr(lineIndex + 1)}</span>
            <div className="code-l flex flex-1 flex-shrink-0 items-center whitespace-pre-wrap break-all">
              {line.render(answers)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodeRender;
