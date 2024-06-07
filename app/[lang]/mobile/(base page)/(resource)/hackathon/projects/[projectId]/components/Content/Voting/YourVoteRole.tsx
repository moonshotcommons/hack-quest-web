import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType, HackathonTypeVotesRoleType, ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useMemo } from 'react';
import RoleUserIcon from '@/components/Common/Icon/RoleUser';
import RoleAdvocateIcon from '@/components/Common/Icon/RoleAdvocate';
import RoleJugleIcon from '@/components/Common/Icon/RoleJugle';
import { decimalCountPercent } from '@/helper/utils';

interface YourVoteRoleProp {
  project: ProjectType;
  hackathon: HackathonType;
}

const YourVoteRole: React.FC<YourVoteRoleProp> = ({ project, hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const votesPercent = useMemo(() => {
    const vote = {
      [HackathonTypeVotesRoleType.USER]: hackathon?.votes?.[HackathonTypeVotesRoleType.USER] || 0,
      [HackathonTypeVotesRoleType.ADVOCATE]: hackathon?.votes?.[HackathonTypeVotesRoleType.ADVOCATE] || 0,
      [HackathonTypeVotesRoleType.JUDGE]: hackathon?.votes?.[HackathonTypeVotesRoleType.JUDGE] || 0
    };
    const total = Object.keys(vote).reduce((pre, key) => vote[key as HackathonTypeVotesRoleType] + pre, 0);
    return {
      [HackathonTypeVotesRoleType.USER]: decimalCountPercent(vote[HackathonTypeVotesRoleType.USER] / total, 2),
      [HackathonTypeVotesRoleType.ADVOCATE]: decimalCountPercent(vote[HackathonTypeVotesRoleType.ADVOCATE] / total, 2),
      [HackathonTypeVotesRoleType.JUDGE]: decimalCountPercent(vote[HackathonTypeVotesRoleType.JUDGE] / total, 2)
    };
  }, [hackathon]);
  return (
    <div>
      <p className="body-s mb-[4px] text-neutral-medium-gray">{t('hackathonVoting.yourVotingRole')}</p>
      <div className="flex gap-[.75rem]">
        <div
          className={`flex flex-1 flex-col items-center gap-[.25rem] rounded-[.5rem] border px-[.5rem] py-[.375rem] ${hackathon?.participation?.voteRole === HackathonTypeVotesRoleType.USER ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
        >
          <div className="body-s flex items-center">
            <RoleUserIcon
              color={
                hackathon?.participation?.voteRole === HackathonTypeVotesRoleType.USER
                  ? 'black'
                  : 'var(--neutral-rich-gray)'
              }
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
          className={`flex flex-1 flex-col items-center gap-[.25rem] rounded-[.5rem] border px-[.5rem] py-[.375rem] ${hackathon?.participation?.voteRole === HackathonTypeVotesRoleType.ADVOCATE ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
        >
          <div className="body-s flex items-center">
            <RoleAdvocateIcon
              color={
                hackathon?.participation?.voteRole === HackathonTypeVotesRoleType.ADVOCATE
                  ? 'black'
                  : 'var(--neutral-rich-gray)'
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <p>{t('hackathonVoting.advocate')}</p>
            <div className={`caption-10pt text-neutral-rich-gray`}>
              {votesPercent[HackathonTypeVotesRoleType.ADVOCATE]} {t('hackathonVoting.votes')}
            </div>
          </div>
        </div>
        <div
          className={`flex flex-1 flex-col items-center gap-[.25rem] rounded-[.5rem] border px-[.5rem] py-[.375rem] ${hackathon?.participation?.voteRole === HackathonTypeVotesRoleType.JUDGE ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
        >
          <div className="body-s flex items-center">
            <RoleJugleIcon
              color={
                hackathon?.participation?.voteRole === HackathonTypeVotesRoleType.JUDGE
                  ? 'black'
                  : 'var(--neutral-rich-gray)'
              }
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
