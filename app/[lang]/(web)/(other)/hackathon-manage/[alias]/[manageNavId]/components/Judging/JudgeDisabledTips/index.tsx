import { HackathonJugingInfoRewardJudgeType } from '@/service/webApi/resourceStation/type';
import { CircleAlert } from 'lucide-react';
import React from 'react';

interface JudgeDisabledTipsProp {
  rewardJudgeInfo: HackathonJugingInfoRewardJudgeType;
}

const JudgeDisabledTips: React.FC<JudgeDisabledTipsProp> = ({ rewardJudgeInfo }) => {
  return rewardJudgeInfo?.disableJudge ? (
    <div className="body-m flex items-center justify-center gap-[8px] rounded-[16px] bg-neutral-off-white py-[16px] text-neutral-medium-gray">
      <CircleAlert />
      <span>HackQuest voting and judging system will not be applied to this track.</span>
    </div>
  ) : null;
};

export default JudgeDisabledTips;
