import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import { ProjectDetailContext } from '../../../../../constants/type';
import { separationNumber } from '@/helper/utils';

interface YourTotalVotesProp {}

const YourTotalVotes: React.FC<YourTotalVotesProp> = ({}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { projectVote } = useContext(ProjectDetailContext);
  return (
    <div className="flex flex-1 flex-col">
      <p className="body-s mb-[4px] text-neutral-medium-gray">{t('hackathonVoting.yourTotalVotes')}</p>
      <div className="my-[4px] flex flex-1 rounded-[8px] bg-yellow-extra-light px-[24px] py-[16px]">
        {projectVote?.judge?.voteMode === 'fixed' && (
          <div className="flex-1 border-r border-neutral-light-gray text-center">
            <p className="body-xl-bold text-neutral-off-black">{separationNumber(projectVote.remainingVotes)}</p>
            <p className="caption-12pt text-neutral-medium-gray">{t('hackathonVoting.remainingVotes')}</p>
          </div>
        )}
        {projectVote?.judge?.judgeMode === 'judges' && projectVote?.judge?.voteMode === 'score' ? (
          <div className="flex-1 text-center">
            <p className="body-xl-bold text-neutral-off-black">
              {separationNumber(projectVote?.judge?.judgeProjectVote)}
            </p>
            <p className="caption-12pt text-neutral-medium-gray">{'MAX Votes Per Project'}</p>
          </div>
        ) : (
          <div className="flex-1 text-center">
            <p className="body-xl-bold text-neutral-off-black">{separationNumber(projectVote.totalVotes)}</p>
            <p className="caption-12pt text-neutral-medium-gray">{t('hackathonVoting.totalVotes')}</p>
          </div>
        )}
      </div>
      <p className="body-xs pt-[10px] text-neutral-medium-gray">{t('hackathonVoting.voteTips')}</p>
    </div>
  );
};

export default YourTotalVotes;
