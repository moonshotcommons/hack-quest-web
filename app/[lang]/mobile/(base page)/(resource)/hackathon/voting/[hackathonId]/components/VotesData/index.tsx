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
  const { view } = useContext(HackathonVoteContext);
  if (!hackathon?.participation || view !== ViewValue.AGENDA) return null;
  return (
    <>
      <div className=" mt-[-2.5rem] flex items-center justify-between ">
        <div className="body-s text-neutral-medium-gray">{t('hackathonVoting.yourVotesToday')}</div>
        <div className="caption-10pt text-neutral-medium-gray">{t('hackathonVoting.refreshEveryday')}</div>
      </div>
      <div className="sticky top-[4.375rem] z-[9] mt-[-3.375rem]">
        <div className={` my-[.25rem] flex rounded-[8px] bg-yellow-extra-light px-[1.5rem] py-[.5rem]`}>
          <div className="flex-1 border-r border-neutral-light-gray text-center">
            <p className="body-l-bold text-neutral-off-black">{hackathon?.participation?.remainingVote}</p>
            <p className="caption-12pt text-neutral-medium-gray">{t('hackathonVoting.remainingVotes')}</p>
          </div>
          <div className="flex-1 text-center">
            <p className="body-l-bold text-neutral-off-black">{hackathon?.participation?.totalVote}</p>
            <p className="caption-12pt text-neutral-medium-gray">{t('hackathonVoting.totalVotes')}</p>
          </div>
        </div>
      </div>
      <p className="body-xs mt-[-3.125rem] text-neutral-medium-gray">{t('hackathonVoting.voteTips')}</p>
    </>
  );
};

export default VotesData;
