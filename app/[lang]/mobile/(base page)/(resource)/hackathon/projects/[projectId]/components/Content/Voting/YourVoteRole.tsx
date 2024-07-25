import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonTypeVotesRoleType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useMemo } from 'react';
import RoleUserIcon from '@/components/Common/Icon/RoleUser';
import RoleJugleIcon from '@/components/Common/Icon/RoleJugle';
import { decimalCountPercent } from '@/helper/utils';
import { ProjectDetailContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface YourVoteRoleProp {}

const YourVoteRole: React.FC<YourVoteRoleProp> = ({}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { projectVote } = useContext(ProjectDetailContext);
  const votesPercent = useMemo(() => {
    return {
      [HackathonTypeVotesRoleType.USER]: decimalCountPercent(
        projectVote.roleVoted?.[HackathonTypeVotesRoleType.USER] / projectVote.totalVotes,
        2
      ),
      [HackathonTypeVotesRoleType.JUDGE]: decimalCountPercent(
        projectVote.roleVoted?.[HackathonTypeVotesRoleType.JUDGE] / projectVote.totalVotes,
        2
      )
    };
  }, [projectVote]);
  return (
    <div>
      <p className="body-s mb-[4px] text-neutral-medium-gray">{t('hackathonVoting.yourVotingRole')}</p>
      <div className="flex gap-[.75rem]">
        <div
          className={`flex flex-1 flex-col items-center gap-[.25rem] rounded-[.5rem] border px-[.5rem] py-[.375rem] ${projectVote.voteRole === HackathonTypeVotesRoleType.USER ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
        >
          <div className="body-s flex items-center">
            <RoleUserIcon
              color={projectVote.voteRole === HackathonTypeVotesRoleType.USER ? 'black' : 'var(--neutral-rich-gray)'}
            />
          </div>
          <div className="flex flex-col items-center">
            <p>{t('hackathonVoting.user')}</p>
            <div className={`caption-10pt text-neutral-rich-gray`}>
              {votesPercent[HackathonTypeVotesRoleType.USER]} {t('hackathonVoting.votes')}
            </div>
          </div>
        </div>
        <div
          className={`flex flex-1 flex-col items-center gap-[.25rem] rounded-[.5rem] border px-[.5rem] py-[.375rem] ${projectVote.voteRole === HackathonTypeVotesRoleType.JUDGE ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
        >
          <div className="body-s flex items-center">
            <RoleJugleIcon
              color={projectVote.voteRole === HackathonTypeVotesRoleType.JUDGE ? 'black' : 'var(--neutral-rich-gray)'}
            />
          </div>
          <div className="flex flex-col items-center">
            <p>{t('hackathonVoting.judge')}</p>
            <div className={`caption-10pt text-neutral-rich-gray`}>
              {votesPercent[HackathonTypeVotesRoleType.JUDGE]} {t('hackathonVoting.votes')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourVoteRole;
