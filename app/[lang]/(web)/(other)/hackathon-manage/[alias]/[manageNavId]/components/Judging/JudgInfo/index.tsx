import { separationNumber } from '@/helper/utils';
import { createEditor } from '@wangeditor/editor';
import Image from 'next/image';
import React from 'react';

interface JudgInfoProp {
  show: boolean;
  handleShowJudges: VoidFunction;
}

const JudgInfo: React.FC<JudgInfoProp> = ({ show, handleShowJudges }) => {
  const judges = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className={`grid overflow-hidden transition-all ${show ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
      <div className="body-m flex gap-[40px]  overflow-hidden text-neutral-off-black [&>div]:flex-1 [&>div]:flex-shrink-0">
        <div>
          <p>Judging Criteria</p>
          {/* criteria?.type === TEXT_EDITOR_TYPE */}
          {true ? (
            <div
              className="reset-editor-style mt-[4px] whitespace-pre-line text-neutral-rich-gray"
              dangerouslySetInnerHTML={{
                __html: createEditor({ content: [] }).getHtml()
                // __html: createEditor({ content: criteria?.content ||[] }).getHtml()
              }}
            ></div>
          ) : (
            <div className="mt-[4px] whitespace-pre-line text-neutral-rich-gray">{''.replaceAll('\\n', '\n')}</div>
          )}
        </div>
        <div className="flex flex-wrap gap-[8px_40px]">
          <div>
            <p className="text-neutral-medium-gray">Judging Mode</p>
            {/* <p>{judgeInfo?.judge?.judgeMode === 'judges' ? 'Judges Only' : 'Users + Judges'}</p> */}
            <p>{'1111'}</p>
          </div>
          <div>
            <p className="text-neutral-medium-gray">Voting Mode</p>
            {/* <p>{judgeInfo?.judge?.voteMode === 'fixed' ? 'Fixed Votes' : 'Project Scoring'}</p> */}
            <p>{'111'}</p>
          </div>
          <div>
            <p className="text-neutral-medium-gray">Total User Votes</p>
            <p>{separationNumber(99999)}</p>
          </div>
          <div>
            <p className="text-neutral-medium-gray">Total Judge Votes</p>
            <p>{separationNumber(99999)}</p>
          </div>

          <div>
            <p className="text-neutral-medium-gray">Votes for Each Judge</p>
            <p>{separationNumber(99999)}</p>
          </div>
          <div className="cursor-pointer" onClick={handleShowJudges}>
            <p className="text-neutral-medium-gray">{`Judges (${judges.length ?? 0})`}</p>
            <div className="flex pl-[10px]">
              {judges.slice(0, 3).map((v, i) => (
                <div key={i} className="relative ml-[-10px] h-[26px] w-[26px] overflow-hidden rounded-[50%]">
                  <Image src={'/images/learn/hack_logo.png'} alt={'111'} fill className="object-contain"></Image>
                </div>
              ))}
              {judges.length > 3 && (
                <div className="flex-center body-xs relative ml-[-10px] h-[26px] w-[26px]  rounded-[50%] border border-yellow-dark bg-yellow-light text-neutral-off-black">
                  {`+${judges.length - 3}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgInfo;
