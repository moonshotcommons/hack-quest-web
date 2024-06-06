import { LangContext } from '@/components/Provider/Lang';
import { separationNumber } from '@/helper/utils';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType, ProjectRankType, ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';

interface VoteMsgProp {
  project: ProjectType;
  rankInfo: ProjectRankType;
  hackathon: HackathonType;
  isJoin: boolean;
}

const VoteMsg: React.FC<VoteMsgProp> = ({ project, isJoin, rankInfo, hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="rounded-[8px] bg-neutral-white px-[40px] py-[28px] text-center shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
      {isJoin && (
        <div className="body-s mb-[24px] flex items-center justify-center gap-[2px] rounded-[8px] bg-[rgba(244,244,244,1)] p-[16px] text-neutral-medium-gray">
          <RiErrorWarningLine />
          <span>{t('hackathonVoting.youCantVote')}</span>
        </div>
      )}
      <div className="flex">
        <div className="flex-1 border-r border-neutral-medium-gray">
          <p className="body-xl mb-[8px] text-neutral-off-black">{separationNumber(project.vote)}</p>
          <p className="body-s text-neutral-medium-gray">{t('hackathonVoting.currentVotes')}</p>
        </div>
        <div className="flex-1">
          <p className="body-xl mb-[8px] text-neutral-off-black">{`${rankInfo?.rank ?? 'NaN'}/${rankInfo?.total ?? 'NaN'}`}</p>
          <p className="body-s text-neutral-medium-gray">{t('hackathonVoting.currentRanking')}</p>
        </div>
      </div>
    </div>
  );
};

export default VoteMsg;
