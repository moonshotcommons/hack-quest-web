import React from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { separationNumber } from '@/helper/utils';
import { HackathonEditModalType } from '../../../constants/type';

interface DetailRewardsProp {
  hackathon: HackathonType;
}

const DetailRewards: React.FC<DetailRewardsProp> = ({ hackathon }) => {
  return (
    <EditBox
      title={'hackathonDetail.rewards'}
      type={HackathonEditModalType.REWARDS}
      className="flex flex-col gap-[32px] rounded-[0] border-none bg-transparent p-0"
    >
      {hackathon.rewards?.map((v, i) => (
        <div
          className="flex items-stretch overflow-hidden rounded-[24px] border border-neutral-light-gray bg-neutral-white p-[32px]"
          key={i}
        >
          <div className="flex w-[300px] flex-col items-center justify-center gap-[12px]">
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
    </EditBox>
  );
};

export default DetailRewards;
