import React from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { separationNumber } from '@/helper/utils';
import { HackathonEditModalType } from '../../../constants/type';

interface RewardsProp {
  hackathon: HackathonType;
}

const Rewards: React.FC<RewardsProp> = ({ hackathon }) => {
  return (
    <EditBox
      title={'hackathonDetail.rewards'}
      className="flex flex-col gap-[24px] rounded-[0] border-none bg-transparent p-0"
      type={HackathonEditModalType.REWARDS}
    >
      {hackathon.rewards?.map((v, i) => (
        <div
          className="flex items-stretch gap-[24px] overflow-hidden rounded-[24px] border border-neutral-light-gray bg-neutral-white p-[20px]"
          key={i}
        >
          <div className="flex w-[250px] flex-col items-center justify-center gap-[12px]">
            <div className="text-h3 text-neutral-off-black">{`${separationNumber(v.totalRewards)} ${v.currency || 'USD'}`}</div>
            <p>{v.name}</p>
          </div>
          <div className="flex-1 border-l border-neutral-light-gray pl-[20px]">
            {v.rewards?.length > 0 ? (
              <div className="body-m flex h-full flex-col justify-center gap-[4px] text-neutral-medium-gray">
                {v.rewards.map((p, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <span>{`${p.label}`}</span>
                    <span className="body-l text-neutral-off-black">{`${p.value} ${v.currency || 'USD'}`}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="body-m whitespace-pre-line text-center text-neutral-rich-gray">{v.rule}</div>
            )}
          </div>
        </div>
      ))}
    </EditBox>
  );
};

export default Rewards;
