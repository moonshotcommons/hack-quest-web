import { TEXT_EDITOR_TYPE } from '@/components/Common/TextEditor';
import { separationNumber } from '@/helper/utils';
import { HackathonJugingInfoRewardJudgeType } from '@/service/webApi/resourceStation/type';
import { createEditor } from '@wangeditor/editor';
import { CircleAlert } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface JudgInfoProp {
  show: boolean;
  handleShowJudges: VoidFunction;
  rewardJudgeInfo: HackathonJugingInfoRewardJudgeType;
}

const JudgInfo: React.FC<JudgInfoProp> = ({ show, handleShowJudges, rewardJudgeInfo }) => {
  const judges = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div
      className={`grid overflow-hidden transition-all ${show ? 'mt-0 grid-rows-[1fr]' : 'mt-[-28px] grid-rows-[0fr]'}`}
    >
      <div className="body-m flex flex-col gap-[40px]  overflow-hidden text-neutral-off-black ">
        {rewardJudgeInfo?.disableJudge && (
          <div className="body-m flex items-center justify-center gap-[8px] rounded-[16px] bg-neutral-off-white py-[16px] text-neutral-medium-gray">
            <CircleAlert />
            <span>HackQuest voting and judging system will not be applied to this track.</span>
          </div>
        )}
        <div className="flex gap-[40px] [&>div]:flex-1 [&>div]:flex-shrink-0">
          <div className="">
            <p className="text-neutral-medium-gray">Judging Criteria</p>
            {rewardJudgeInfo?.criteria?.type === TEXT_EDITOR_TYPE ? (
              <div
                className="reset-editor-style mt-[8px] whitespace-pre-line text-neutral-rich-gray"
                dangerouslySetInnerHTML={{
                  __html: createEditor({ content: rewardJudgeInfo?.criteria?.content || [] }).getHtml()
                }}
              ></div>
            ) : (
              <div className="mt-[8px] whitespace-pre-line text-neutral-rich-gray">{''.replaceAll('\\n', '\n')}</div>
            )}
          </div>
          <div className="flex flex-wrap gap-[8px_40px]">
            <div>
              <p className="text-neutral-medium-gray">Judging Mode</p>
              <p>{rewardJudgeInfo?.judgeMode === 'judges' ? 'Judges Only' : 'Users + Judges'}</p>
            </div>
            <div>
              <p className="text-neutral-medium-gray">Voting Mode</p>
              <p>{rewardJudgeInfo?.voteMode === 'fixed' ? 'Fixed Votes' : 'Project Scoring'}</p>
            </div>
            {rewardJudgeInfo?.judgeMode === 'all' && (
              <div>
                <p className="text-neutral-medium-gray">Total User Votes</p>
                <p>{separationNumber(rewardJudgeInfo?.votes?.userVotes)}</p>
              </div>
            )}
            <div>
              <p className="text-neutral-medium-gray">Total Judge Votes</p>
              <p>{separationNumber(rewardJudgeInfo?.votes?.userVotes)}</p>
            </div>

            <div>
              <p className="text-neutral-medium-gray">Votes for Each Judge</p>
              <p>{separationNumber(rewardJudgeInfo?.projectJudgeCount)}</p>
            </div>
            <div className="cursor-pointer" onClick={handleShowJudges}>
              <p className="text-neutral-medium-gray">{`Judges (${judges.length ?? 0})`}</p>
              <div className="flex pl-[10px]">
                {rewardJudgeInfo?.judgeAccounts?.slice(0, 3).map((v, i) => (
                  <div key={i} className="relative ml-[-10px] h-[26px] w-[26px] overflow-hidden rounded-[50%]">
                    <Image src={'/images/learn/hack_logo.png'} alt={'111'} fill className="object-contain"></Image>
                  </div>
                ))}
                {rewardJudgeInfo?.judgeAccounts?.length > 3 && (
                  <div className="flex-center body-xs relative ml-[-10px] h-[26px] w-[26px]  rounded-[50%] border border-yellow-dark bg-yellow-light text-neutral-off-black">
                    {`+${rewardJudgeInfo?.judgeAccounts?.length - 3}`}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgInfo;
