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
    <EditBox title={'hackathonDetail.rewards'} className="p-[32px]" type={HackathonEditModalType.REWARDS}>
      <div className="flex flex-col gap-[40px]">
        {hackathon.rewards?.map((v, i) => (
          <div className="flex items-stretch" key={i}>
            <div className="flex w-[250px] flex-col items-center justify-center gap-[12px]">
              <div className="text-h3 text-neutral-off-black">{`${separationNumber(v.totalRewards)} USD`}</div>
              <p>{v.name}</p>
            </div>
            <div className="flex-1 border-l border-neutral-light-gray pl-[20px]">
              {v.rewards?.length > 0 ? (
                <div className="body-m flex h-full flex-col justify-center gap-[4px] text-neutral-medium-gray">
                  {v.rewards.map((p, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <span>{`${p.label}`}</span>
                      <span className="body-l text-neutral-off-black">{`${p.value} USD`}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="body-m whitespace-pre-line text-neutral-rich-gray">{v.rule}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </EditBox>
  );
};

export default Rewards;
