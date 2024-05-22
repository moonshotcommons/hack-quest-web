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
    <div className="rounded-[.5rem] bg-neutral-white px-[.75rem] py-[1rem] text-center shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
      {isJoin && (
        <div className="body-s mb-[1rem] flex  justify-center gap-[.125rem] rounded-[.5rem] bg-[rgba(244,244,244,1)] p-[16px] text-neutral-medium-gray">
          <RiErrorWarningLine className="relative top-[.25rem] flex-shrink-0" />
          <span>{t('hackathonVoting.youCantVote')}</span>
        </div>
      )}
      <div className="flex">
        <div className="flex-1 border-r border-neutral-medium-gray">
          <p className="body-xl mb-[.5rem] text-neutral-off-black">{separationNumber(project.vote)}</p>
          <p className="body-xs text-neutral-medium-gray">{t('hackathonVoting.currentVotes')}</p>
        </div>
        <div className="flex-1">
          <p className="body-xl mb-[.5rem] text-neutral-off-black">{`${rankInfo?.rank ?? 'NaN'}/${rankInfo?.total ?? 'NaN'}`}</p>
          <p className="body-xs text-neutral-medium-gray">{t('hackathonVoting.currentRanking')}</p>
        </div>
      </div>
    </div>
  );
};

export default VoteMsg;
