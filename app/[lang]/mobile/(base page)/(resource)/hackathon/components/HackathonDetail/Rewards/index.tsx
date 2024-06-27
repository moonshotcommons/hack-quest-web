import React from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { separationNumber } from '@/helper/utils';
import { HackathonEditModalType } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface RewardsProp {
  hackathon: HackathonType;
}

const Rewards: React.FC<RewardsProp> = ({ hackathon }) => {
  return (
    <EditBox title={'hackathonDetail.rewards'} type={HackathonEditModalType.REWARDS}>
      <div className="body-s flex flex-col gap-[3.75rem]">
        {hackathon.rewards?.map((v, i) => (
          <div className="" key={i}>
            <div className="flex flex-col items-center justify-center gap-[.25rem] pb-[.5rem]">
              <div className="text-h2-mob text-neutral-off-black">{`${separationNumber(v.totalRewards)} USD`}</div>
              <p className="text-neutral-medium-gray">{v.name}</p>
            </div>
            <div className="flex-1 border-t border-neutral-light-gray pt-[.5rem]">
              {v.rewards?.length > 0 ? (
                <div className="body-s flex h-full flex-col justify-center gap-[4px] text-neutral-medium-gray">
                  {v.rewards.map((p, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <span>{`${p.label}`}</span>
                      <span className="body-m text-neutral-off-black">{`${p.value} USD`}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="body-s whitespace-pre-line text-neutral-rich-gray">{v.rule}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </EditBox>
  );
};

export default Rewards;