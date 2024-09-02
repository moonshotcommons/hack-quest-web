import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import { ProjectDetailContext } from '../../../../../constants/type';

interface RewardsProp {}

const Rewards: React.FC<RewardsProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { project } = useContext(ProjectDetailContext);
  return (
    <div className="body-xl flex flex-col gap-[32px] text-neutral-off-black">
      {project.rewards?.map((reward) => (
        <div key={reward.id} className="flex flex-col gap-[16px]">
          <div className="body-l-bold flex items-center gap-[8px]">
            <span>{reward.name}</span>
            {reward.winner && (
              <div className="caption-12pt rounded-[20px] bg-yellow-primary px-[12px] py-[4px] text-neutral-off-black">
                Winner
              </div>
            )}
          </div>
          <div className="flex items-center rounded-[8px] bg-neutral-white px-[40px] py-[28px] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
            <div className="flex flex-1 flex-shrink-0 flex-col items-center gap-[8px]">
              <p>{reward.vote}</p>
              <p className="body-s text-neutral-medium-gray">Votes</p>
            </div>
            <div className="flex flex-1 flex-shrink-0 flex-col items-center gap-[8px] border-l border-neutral-medium-gray">
              <p>{`${reward.ranking?.rank ?? 'NaN'} / ${reward.ranking?.total ?? 'NaN'}`}</p>
              <p className="body-s text-neutral-medium-gray">Ranking</p>
            </div>
            {/* <div className="flex flex-1 flex-shrink-0 flex-col items-center gap-[8px]">
              <p>{`${separationNumber(reward.prize)} ${reward.currency}`}</p>
              <p className="body-s text-neutral-medium-gray">Rewards</p>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rewards;
