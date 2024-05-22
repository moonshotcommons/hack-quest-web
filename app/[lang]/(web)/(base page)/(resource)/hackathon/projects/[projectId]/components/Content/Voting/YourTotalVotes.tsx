import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';

interface YourTotalVotesProp {
  project: ProjectType;
  hackathon: HackathonType;
}

const YourTotalVotes: React.FC<YourTotalVotesProp> = ({ project, hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="mt-[20px] flex flex-1 flex-col">
      <p className="body-s mb-[4px] text-neutral-medium-gray">{t('hackathonVoting.yourTotalVotes')}</p>
      <div className="my-[4px] flex flex-1 rounded-[8px] bg-yellow-extra-light px-[24px] py-[16px]">
        <div className="flex flex-1 flex-col justify-center border-r border-neutral-light-gray text-center">
          <p className="body-xl-bold text-neutral-off-black">{hackathon?.participation?.remainingVote ?? 'NaN'}</p>
          <p className="caption-12pt text-neutral-medium-gray">{t('hackathonVoting.remainingVotes')}</p>
        </div>
        <div className="flex flex-1 flex-col justify-center text-center">
          <p className="body-xl-bold text-neutral-off-black">{hackathon?.participation?.totalVote ?? 'NaN'}</p>
          <p className="caption-12pt text-neutral-medium-gray">{t('hackathonVoting.totalVotes')}</p>
        </div>
      </div>
      <p className="body-xs pt-[10px] text-neutral-medium-gray">{t('hackathonVoting.voteTips')}</p>
    </div>
  );
};

export default YourTotalVotes;
