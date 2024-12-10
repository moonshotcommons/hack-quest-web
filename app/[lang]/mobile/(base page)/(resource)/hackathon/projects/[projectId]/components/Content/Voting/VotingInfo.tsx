import { ProjectDetailContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import { LangContext } from '@/components/Provider/Lang';
import VoteTickIcon from '@/components/Web/Business/VoteTickIcon';
import { separationNumber } from '@/helper/utils';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useMemo } from 'react';

interface VotingInfoProp {}

const VotingInfo: React.FC<VotingInfoProp> = ({}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { projectVote } = useContext(ProjectDetailContext);
  const isShowTick = useMemo(() => {
    return projectVote?.judge?.judgeMode === 'judges' && projectVote?.judge?.voteMode === 'score';
  }, [projectVote]);
  return (
    <div className="flex flex-col gap-[.75rem]">
      <p className="body-s mb-[.25rem] text-neutral-medium-gray">{t('hackathonVoting.votingInfo')}</p>
      {isShowTick ? (
        <>
          <div className="body-xs flex gap-[.75rem] text-neutral-rich-gray">
            <div className="flex items-center gap-[.25rem]">
              <VoteTickIcon />
              <span>No voted</span>
            </div>
            <div className="flex items-center gap-[.25rem]">
              <VoteTickIcon type="other" />
              <span>Vote by another judge</span>
            </div>
            <div className="flex items-center gap-[.25rem]">
              <VoteTickIcon type="self" />
              <span>Voted by you</span>
            </div>
          </div>
          <div className="flex rounded-[.5rem] bg-neutral-white p-[.5rem] text-center shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
            <div className="flex-1 border-r border-neutral-medium-gray">
              <p className="body-s mb-[.5rem] text-neutral-off-black">
                {separationNumber(Object.values(projectVote?.roleVoted || {}).reduce((a, b) => a + b, 0)) ?? 0}
              </p>
              <p className="caption-10pt text-neutral-rich-gray">{t('hackathonVoting.currentVotes')}</p>
            </div>
            <div className="flex-1">
              <div className="body-s mb-[.5rem] flex justify-center gap-[.25rem] text-neutral-off-black">
                {projectVote.judgesVoteStats?.map((v) => (
                  <VoteTickIcon key={v.userId} type={v.vote === 0 ? 'notVoted' : v.isMe ? 'self' : 'other'} />
                ))}
              </div>
              <p className="caption-10pt text-neutral-rich-gray">{'Current Voted Judges'}</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex rounded-[.5rem] bg-neutral-white p-[.5rem] text-center shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
          <div className="flex-1 border-r border-neutral-medium-gray">
            <p className="body-s mb-[.5rem] text-neutral-off-black">
              {separationNumber(Object.values(projectVote?.roleVoted || {}).reduce((a, b) => a + b, 0)) ?? 0}
            </p>
            <p className="caption-10pt text-neutral-rich-gray">{t('hackathonVoting.currentVotes')}</p>
          </div>
          <div className="flex-1">
            <p className="body-s mb-[.5rem] text-neutral-off-black">{`${projectVote.ranking?.rank ?? 'NaN'}/${projectVote.ranking?.total ?? 'NaN'}`}</p>
            <p className="caption-10pt text-neutral-rich-gray">{t('hackathonVoting.currentRanking')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingInfo;
