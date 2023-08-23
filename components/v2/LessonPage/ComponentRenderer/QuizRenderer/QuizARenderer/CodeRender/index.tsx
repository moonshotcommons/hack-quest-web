import React, { useContext } from 'react';
import { WaitingRenderCodeType } from '@/hooks/useParseQuizA';
import { QuizAContext } from '../type';
interface CodeRenderType {
  waitingRenderCodes: WaitingRenderCodeType[];
}
const CodeRender: React.FC<CodeRenderType> = ({ waitingRenderCodes }) => {
  const { answers } = useContext(QuizAContext);
  const fillStr = (index: number) => {
    return index < 10 ? `0${index}` : index;
  };
  return (
    <div className="h-full w-full bg-renderer-code-bg relative rounded-[10px] pr-[20px]">
      <ul className="p-[15px]">
        {waitingRenderCodes.map((line, lineIndex) => (
          <li
            className="list-decimal w-full text-text-default-color font-thin whitespace-nowrap flex items-center justify-start"
            key={lineIndex}
          >
            <span className="mr-[1.875rem] text-lesson-code-index text-[12px] font-mono">
              {fillStr(lineIndex + 1)}
            </span>
            {Array.isArray(line) ? (
              line.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center ${
                      item.type === 'input' ? 'flex-1' : ''
                    }`}
                  >
                    {item.render(answers)}
                  </div>
                );
              })
            ) : (
              <div className="flex-1 flex items-center">
                {line.render(answers)}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodeRender;
