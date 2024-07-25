import { LangContext } from '@/components/Provider/Lang';
import { separationNumber } from '@/helper/utils';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import { ProjectDetailContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface RewardsProp {}

const Rewards: React.FC<RewardsProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { project } = useContext(ProjectDetailContext);
  return (
    <div className="body-l flex flex-col gap-[1.5rem] text-neutral-off-black">
      {project.rewards?.map((reward) => (
        <div key={reward.id} className="flex flex-col gap-[.75rem]">
          <div className="body-m-bold flex items-center gap-[.5rem]">
            <span>{reward.name}</span>
            {reward.winner && (
              <div className="caption-12pt rounded-[1.25rem] bg-yellow-primary px-[.75rem] py-[.25rem] text-neutral-off-black">
                Winner
              </div>
            )}
          </div>
          <div className="flex items-center rounded-[.5rem] bg-neutral-white px-[.75rem] py-[1rem] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
            <div className="flex flex-1 flex-shrink-0 flex-col items-center gap-[.5rem]">
              <p>{reward.vote}</p>
              <p className="body-xs text-neutral-medium-gray">Votes</p>
            </div>
            <div className="flex flex-1 flex-shrink-0 flex-col items-center gap-[.5rem] border-l border-r border-neutral-medium-gray">
              <p>{`${reward.ranking?.rank ?? 'NaN'} / ${reward.ranking?.total ?? 'NaN'}`}</p>
              <p className="body-xs text-neutral-medium-gray">Ranking</p>
            </div>
            <div className="flex flex-1 flex-shrink-0 flex-col items-center gap-[.5rem]">
              <div>
                <span>{`${separationNumber(reward.prize)} `}</span>
                <span className="body-xs">{`${reward.currency}`}</span>
              </div>
              <p className="body-xs text-neutral-medium-gray">Rewards</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rewards;
