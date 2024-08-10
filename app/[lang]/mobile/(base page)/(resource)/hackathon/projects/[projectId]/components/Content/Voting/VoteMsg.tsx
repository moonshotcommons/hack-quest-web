import { ProjectDetailContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import { LangContext } from '@/components/Provider/Lang';
import { separationNumber } from '@/helper/utils';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';

interface VoteMsgProp {}

const VoteMsg: React.FC<VoteMsgProp> = ({}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { project } = useContext(ProjectDetailContext);
  return (
    <div className="flex flex-col gap-[1rem]">
      {project.rewards?.map((reward) => (
        <div key={reward.id} className="flex flex-col gap-[1rem]">
          <div className="body-m-bold flex items-center gap-[.5rem]">
            <span>{reward.name}</span>
          </div>
          <div className="rounded-[.5rem] bg-neutral-white px-[.75rem] py-[1rem] text-center shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
            {/* <div className="body-s mb-[1rem] flex  justify-center gap-[.125rem] rounded-[.5rem] bg-[rgba(244,244,244,1)] p-[16px] text-neutral-medium-gray">
              <RiErrorWarningLine className="relative top-[.25rem] flex-shrink-0" />
              <span>{t('hackathonVoting.youCantVote')}</span>
            </div> */}
            <div className="flex">
              <div className="flex-1 border-r border-neutral-medium-gray">
                <p className="body-xl mb-[.5rem] text-neutral-off-black">{separationNumber(reward.vote)}</p>
                <p className="body-xs text-neutral-medium-gray">{t('hackathonVoting.currentVotes')}</p>
              </div>
              <div className="flex-1">
                <p className="body-xl mb-[.5rem] text-neutral-off-black">{`${reward.ranking?.rank ?? 'NaN'}/${reward.ranking?.total ?? 'NaN'}`}</p>
                <p className="body-xs text-neutral-medium-gray">{t('hackathonVoting.currentRanking')}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoteMsg;
