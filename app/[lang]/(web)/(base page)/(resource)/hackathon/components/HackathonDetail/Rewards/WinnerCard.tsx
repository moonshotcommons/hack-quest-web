import { HackathonDetailRewardType, HackathonJudgeType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import { separationNumber } from '@/helper/utils';
import SliderCard from '@/components/Web/Business/SliderCard';
import WinnerProjectCard from './WinnerProjectCard';

interface WinnerCardProp {
  reward: HackathonDetailRewardType;
  judge: HackathonJudgeType;
}

const WinnerCard: React.FC<WinnerCardProp> = ({ reward, judge }) => {
  if (!reward.projects?.length) return null;
  return (
    <div className="flex flex-col gap-5">
      <div className="body-m flex items-center gap-[8px] text-neutral-medium-gray">
        <div className="text-h4 text-neutral-black">{`${separationNumber(reward.reward?.totalRewards)} ${reward.reward?.currency}`}</div>
        <div className="border-l border-neutral-light-gray pl-[8px]">{reward.reward?.name}</div>
      </div>
      <div>
        <SliderCard
          className="py-0"
          renderItem={(contarinerWidth) => {
            return reward.projects?.map((p, i) => (
              <div
                key={p.id}
                style={{
                  width: `${contarinerWidth}px`
                }}
              >
                <WinnerProjectCard project={p} judge={judge} reward={reward} />
              </div>
            ));
          }}
        />
      </div>
    </div>
  );
};

export default WinnerCard;
