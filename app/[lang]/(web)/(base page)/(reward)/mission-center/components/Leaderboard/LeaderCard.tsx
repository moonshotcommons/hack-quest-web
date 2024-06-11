import BaseImage from '@/components/Common/BaseImage';
import React, { useMemo } from 'react';
import { UserLevelRankType } from '@/service/webApi/missionCenter/type';

interface LeaderCardProp {
  rankInfo: UserLevelRankType;
}

const LeaderCard: React.FC<LeaderCardProp> = ({ rankInfo }) => {
  const indexStr = useMemo(() => {
    if (isNaN(rankInfo.rank)) return '0';
    return rankInfo.rank > 99 ? '99+' : rankInfo.rank;
  }, [rankInfo]);
  return (
    <div className="flex items-center justify-between gap-[20px] px-[8px] py-[12px] text-neutral-off-black">
      <div className="flex flex-1 flex-shrink-0 items-center gap-[12px]">
        <div
          className={`flex-center body-xs-bold h-[24px] w-[24px]  rounded-[50%] border text-neutral-off-black ${rankInfo.rank === 1 && 'border-yellow-dark bg-yellow-primary'} ${rankInfo.rank === 2 && 'border-neutral-medium-gray bg-neutral-medium-gray'} ${rankInfo.rank === 3 && 'border-[#C87120] bg-[#EACAAD]'} ${rankInfo.rank > 3 && 'border-transparent'}`}
        >
          {indexStr}
        </div>
        <BaseImage src={rankInfo.avatar} alt={''} className="h-[24px] w-[24px] rounded-[50%]" />
        <span className="body-s w-[0] flex-1 truncate ">{rankInfo.nickname}</span>
      </div>
      <div className="caption-10pt flex-shrink-0">{rankInfo.exp ?? 0} exp</div>
    </div>
  );
};

export default LeaderCard;
