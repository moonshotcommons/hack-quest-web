import { useQuizARendererContext } from '@/components/ComponentRenderer';
import { WaitingRenderCodeType } from '@/hooks/courses/useParseQuiz';
import React from 'react';
import message from 'antd/es/message';
import { CopyIcon } from '@/components/Common/Icon/CopyV2';
import { BurialPoint } from '@/helper/burialPoint';

interface CodeRenderType {
  waitingRenderCodes: WaitingRenderCodeType[];
}
const CodeRender: React.FC<CodeRenderType> = ({ waitingRenderCodes }) => {
  const { answers } = useQuizARendererContext();
  const fillStr = (index: number) => {
    return index < 10 ? `0${index}` : index;
  };
  return (
    <div className="scroll-wrap-x scroll-wrap-y relative h-full w-full overflow-auto rounded-[10px] bg-renderer-code-bg pr-[20px]">
      <div
        className="absolute right-[9px] top-[9px] z-[10] cursor-pointer rounded-[0.5rem] text-[#E3E3E3]"
        onClick={async (e) => {
          try {
            await navigator.clipboard.writeText(
              waitingRenderCodes.map((line) => line.content.getRichText()).join('\r\n')
            );
            BurialPoint.track('lesson-code复制');
            message.success('Copy success!');
          } catch (e) {
            message.warning('The browser version is too low or incompatible！');
          }
        }}
      >
        <CopyIcon className="h-3 w-[10px] text-neutral-medium-gray" />
      </div>
      <ul className="flex max-w-full flex-col gap-[5px] p-[15px]">
        {waitingRenderCodes.map((line, lineIndex) => (
          <li
            className="flex w-full list-decimal items-center justify-start whitespace-nowrap font-thin text-text-default-color"
            key={lineIndex}
          >
            <span className="code-s mr-5 text-lesson-code-index">{fillStr(lineIndex + 1)}</span>
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
