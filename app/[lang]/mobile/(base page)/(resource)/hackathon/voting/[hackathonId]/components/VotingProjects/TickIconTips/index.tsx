import { HackathonVoteContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import VoteTickIcon from '@/components/Web/Business/VoteTickIcon';
import React, { useContext } from 'react';

interface TickIconTipsProp {}

const TickIconTips: React.FC<TickIconTipsProp> = () => {
  const { judgeInfo } = useContext(HackathonVoteContext);
  if (!(judgeInfo.judge.judgeMode === 'judges' && judgeInfo.judge.voteMode === 'score')) return null;
  return (
    <div className="body-xs flex justify-between text-neutral-rich-gray">
      <div className="flex items-center gap-[4px]">
        <VoteTickIcon />
        <span>No votes yet</span>
      </div>
      <div className="flex items-center gap-[4px]">
        <VoteTickIcon type="other" />
        <span>Vote by another judge</span>
      </div>
      <div className="flex items-center gap-[4px]">
        <VoteTickIcon type="self" />
        <span>Your vote</span>
      </div>
    </div>
  );
};

export default TickIconTips;
