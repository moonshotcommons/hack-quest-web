import BaseImage from '@/components/Common/BaseImage';
import React, { useMemo } from 'react';
import ChestCover from '@/public/images/mission-center/chest_cover.png';

interface LeaderCardProp {
  index: number;
}

const LeaderCard: React.FC<LeaderCardProp> = ({ index }) => {
  const indexStr = useMemo(() => {
    return index > 99 ? '99+' : index;
  }, [index]);
  return (
    <div className="flex items-center justify-between gap-[20px] px-[8px] py-[12px] text-neutral-off-black">
      <div className="flex flex-1 flex-shrink-0 items-center gap-[12px]">
        <div
          className={`flex-center body-xs-bold h-[24px] w-[24px]  rounded-[50%] border text-neutral-off-black ${index === 1 && 'border-yellow-dark bg-yellow-primary'} ${index === 2 && 'border-neutral-medium-gray bg-neutral-medium-gray'} ${index === 3 && 'border-[#C87120] bg-[#EACAAD]'} ${index > 3 && 'border-transparent'}`}
        >
          {indexStr}
        </div>
        <BaseImage src={ChestCover} alt={''} className="h-[24px] w-[24px] rounded-[50%]" />
        <span className="body-s w-[0] flex-1 truncate ">
          Prashant VishwakarmaPrashant VishwakarmaPrashant Vishwakarma
        </span>
      </div>
      <div className="caption-10pt flex-shrink-0">{200} exps</div>
    </div>
  );
};

export default LeaderCard;
