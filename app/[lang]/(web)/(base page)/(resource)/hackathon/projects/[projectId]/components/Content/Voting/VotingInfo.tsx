import { LangContext } from '@/components/Provider/Lang';
import VoteTickIcon from '@/components/Web/Business/VoteTickIcon';
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
    <div className="flex flex-col gap-[10px]">
      <p className="body-s text-neutral-medium-gray">{t('hackathonVoting.votingInfo')}</p>
      <>
        {true ? (
          <>
            <div className="body-xs flex gap-[20px] text-neutral-rich-gray">
              <div className="flex items-center gap-[4px]">
                <VoteTickIcon />
                <span>No voted</span>
              </div>
              <div className="flex items-center gap-[4px]">
                <VoteTickIcon type="other" />
                <span>Already voted by another judge</span>
              </div>
              <div className="flex items-center gap-[4px]">
                <VoteTickIcon type="self" />
                <span>Voted by you</span>
              </div>
            </div>
            <div className="flex rounded-[8px] bg-neutral-white p-[8px] text-center shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
              <div className="flex-1 border-r border-neutral-medium-gray">
                <p className="body-s mb-[8px] text-neutral-off-black">{separationNumber(project.vote)}</p>
                <p className="caption-10pt text-neutral-rich-gray">{t('hackathonVoting.currentVotes')}</p>
              </div>
              <div className="flex-1">
                <div className="body-s mb-[8px] flex justify-center gap-[4px] text-neutral-off-black">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <VoteTickIcon key={v} type="other" />
                  ))}
                </div>
                <p className="caption-10pt text-neutral-rich-gray">{'Current Voted Judges'}</p>
              </div>
            </div>
          </>
        ) : (
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
        )}
      </>
    </div>
  );
};

export default VotingInfo;
