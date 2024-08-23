import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonTypeVotesRoleType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useMemo } from 'react';
import RoleUserIcon from '@/components/Common/Icon/RoleUser';
import RoleJugleIcon from '@/components/Common/Icon/RoleJugle';
import { decimalCountPercent } from '@/helper/utils';
import { ProjectDetailContext } from '../../../../../constants/type';

interface YourVoteRoleProp {}

const YourVoteRole: React.FC<YourVoteRoleProp> = ({}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { projectVote } = useContext(ProjectDetailContext);
  const votesPercent = useMemo(() => {
    const totalVotes =
      projectVote?.roleVoted?.[HackathonTypeVotesRoleType.USER] +
      projectVote?.roleVoted?.[HackathonTypeVotesRoleType.JUDGE];
    if (!totalVotes) {
      return {
        [HackathonTypeVotesRoleType.USER]: '0%',
        [HackathonTypeVotesRoleType.JUDGE]: '0%'
      };
    }
    return {
      [HackathonTypeVotesRoleType.USER]: decimalCountPercent(
        projectVote.roleVoted?.[HackathonTypeVotesRoleType.USER] / totalVotes,
        2
      ),
      [HackathonTypeVotesRoleType.JUDGE]: decimalCountPercent(
        projectVote.roleVoted?.[HackathonTypeVotesRoleType.JUDGE] / totalVotes,
        2
      )
    };
  }, [projectVote]);
  return (
    <div>
      <p className="body-s mb-[4px] text-neutral-medium-gray">{t('hackathonVoting.yourVotingRole')}</p>
      <div>
        <div className="flex gap-[12px]">
          <div
            className={`flex flex-1 flex-col items-center gap-[8px] rounded-[8px] border px-[8px] py-[6px] ${projectVote.voteRole === HackathonTypeVotesRoleType.USER ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
          >
            <div className="body-m flex items-center gap-[8px]">
              <RoleUserIcon
                color={projectVote.voteRole === HackathonTypeVotesRoleType.USER ? 'black' : 'var(--neutral-rich-gray)'}
              />
              {t('hackathonVoting.user')}
            </div>
            <div className={`caption-12pt text-neutral-rich-gray`}>
              {votesPercent[HackathonTypeVotesRoleType.USER]} {t('hackathonVoting.votes')}
            </div>
          </div>
          <div
            className={`flex flex-1 flex-col items-center gap-[8px] rounded-[8px] border px-[8px] py-[6px] ${projectVote.voteRole === HackathonTypeVotesRoleType.JUDGE ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
          >
            <div className="body-m flex items-center gap-[8px]">
              <RoleJugleIcon
                color={projectVote.voteRole === HackathonTypeVotesRoleType.JUDGE ? 'black' : 'var(--neutral-rich-gray)'}
              />
              {t('hackathonVoting.judge')}
            </div>
            <div className={`caption-12pt text-neutral-rich-gray`}>
              {votesPercent[HackathonTypeVotesRoleType.JUDGE]} {t('hackathonVoting.votes')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourVoteRole;
