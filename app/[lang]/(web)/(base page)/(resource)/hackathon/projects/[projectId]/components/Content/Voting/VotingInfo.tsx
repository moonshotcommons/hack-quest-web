import { LangContext } from '@/components/Provider/Lang';
import { separationNumber } from '@/helper/utils';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType, ProjectRankType, ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';

interface VotingInfoProp {
  project: ProjectType;
  rankInfo: ProjectRankType;
  hackathon: HackathonType;
}

const VotingInfo: React.FC<VotingInfoProp> = ({ project, rankInfo, hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="mb-[10px]">
      <p className="body-s mb-[4px] text-neutral-medium-gray">{t('hackathonVoting.votingInfo')}</p>
      <div className="flex rounded-[8px] bg-neutral-white p-[8px] text-center shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
        <div className="flex-1 border-r border-neutral-medium-gray">
          <p className="body-s mb-[8px] text-neutral-off-black">{separationNumber(project.vote)}</p>
          <p className="caption-10pt text-neutral-rich-gray">{t('hackathonVoting.currentVotes')}</p>
        </div>
        <div className="flex-1">
          <p className="body-s mb-[8px] text-neutral-off-black">{`${rankInfo?.rank ?? 'NaN'}/${rankInfo?.total ?? 'NaN'}`}</p>
          <p className="caption-10pt text-neutral-rich-gray">{t('hackathonVoting.currentRanking')}</p>
        </div>
      </div>
    </div>
  );
};

export default VotingInfo;
