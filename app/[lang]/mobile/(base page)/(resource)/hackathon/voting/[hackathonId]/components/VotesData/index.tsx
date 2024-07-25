import { HackathonVoteContext, ViewValue } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';

interface VotesDataProp {
  hackathon: HackathonType;
}

const VotesData: React.FC<VotesDataProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { view, judgeInfo, totalLeftVotes } = useContext(HackathonVoteContext);
  if (!hackathon?.participation || view !== ViewValue.AGENDA) return null;
  return (
    <>
      <div className=" mt-[-2.5rem] flex items-center justify-between ">
        <div className="body-s text-neutral-medium-gray">{t('hackathonVoting.yourVotesToday')}</div>
      </div>
      <div className="sticky top-[4.375rem] z-[9] mt-[-3.375rem] rounded-[8px] bg-yellow-extra-light px-[1.5rem] py-[.5rem]">
        {judgeInfo?.judge?.voteMode === 'fixed' && (
          <div className="flex-1 border-r border-neutral-light-gray text-center">
            <p className="body-l-bold text-neutral-off-black">{totalLeftVotes}</p>
            <p className="caption-12pt text-neutral-medium-gray">{t('hackathonVoting.remainingVotes')}</p>
          </div>
        )}
        {judgeInfo?.judge?.judgeMode === 'judges' && judgeInfo?.judge?.voteMode === 'score' ? (
          <div className="flex-1 text-center">
            <p className="body-l-bold text-neutral-off-black">{judgeInfo?.judge?.judgeProjectVote}</p>
            <p className="caption-12pt text-neutral-medium-gray">{'MAX Votes Per Project'}</p>
          </div>
        ) : (
          <div className="flex-1 text-center">
            <p className="body-l-bold text-neutral-off-black">{judgeInfo.judge?.judgeTotalVote}</p>
            <p className="caption-12pt text-neutral-medium-gray">{t('hackathonVoting.totalVotes')}</p>
          </div>
        )}
      </div>
      <p className="body-xs mt-[-3.125rem] text-neutral-medium-gray">{t('hackathonVoting.voteTips')}</p>
    </>
  );
};

export default VotesData;
