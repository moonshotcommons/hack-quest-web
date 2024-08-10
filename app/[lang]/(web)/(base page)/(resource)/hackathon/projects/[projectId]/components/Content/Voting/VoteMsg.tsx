import { LangContext } from '@/components/Provider/Lang';
import { separationNumber } from '@/helper/utils';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import { ProjectDetailContext } from '../../../../../constants/type';

interface VoteMsgProp {}

const VoteMsg: React.FC<VoteMsgProp> = ({}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { project } = useContext(ProjectDetailContext);
  return (
    <div className="flex flex-col gap-[32px]">
      {project.rewards?.map((reward) => (
        <div key={reward.id} className="flex flex-col gap-[16px]">
          <div className="body-l-bold flex items-center gap-[8px]">
            <span>{reward.name}</span>
          </div>
          <div className="rounded-[8px] bg-neutral-white px-[40px] py-[28px] text-center shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
            <div key={reward.id} className="flex flex-col gap-[16px]">
              {/* <div className="body-s mb-[24px] flex items-center justify-center gap-[2px] rounded-[8px] bg-[rgba(244,244,244,1)] p-[16px] text-neutral-medium-gray">
                <RiErrorWarningLine />
                <span>{t('hackathonVoting.youCantVote')}</span>
              </div> */}
              <div className="flex">
                <div className="flex-1 border-r border-neutral-medium-gray">
                  <p className="body-xl mb-[8px] text-neutral-off-black">{separationNumber(reward.vote)}</p>
                  <p className="body-s text-neutral-medium-gray">{t('hackathonVoting.currentVotes')}</p>
                </div>
                <div className="flex-1">
                  <p className="body-xl mb-[8px] text-neutral-off-black">{`${reward.ranking?.rank ?? 'NaN'}/${reward.ranking?.total ?? 'NaN'}`}</p>
                  <p className="body-s text-neutral-medium-gray">{t('hackathonVoting.currentRanking')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoteMsg;
