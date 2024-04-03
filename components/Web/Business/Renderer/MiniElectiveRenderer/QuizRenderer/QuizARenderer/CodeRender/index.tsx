import { WaitingRenderCodeType } from '@/hooks/courses/useParseQuiz';
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
    <div className="scroll-wrap-x scroll-wrap-y relative w-full overflow-auto rounded-[10px] bg-renderer-code-bg pr-[20px]">
      <ul className="max-w-full p-[15px]">
        {waitingRenderCodes.map((line, lineIndex) => (
          <li
            className="flex w-full list-decimal items-center justify-start whitespace-nowrap font-thin text-text-default-color"
            key={lineIndex}
          >
            <span className="code-l mr-[1.875rem] text-lesson-code-index">{fillStr(lineIndex + 1)}</span>
            <div className="flex flex-1 flex-shrink-0 items-center whitespace-pre-wrap break-all">
              {line.render(answers)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodeRender;
