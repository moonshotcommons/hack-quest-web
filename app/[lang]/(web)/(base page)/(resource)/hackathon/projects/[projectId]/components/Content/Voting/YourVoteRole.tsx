import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';
import RoleUserIcon from '@/components/Common/Icon/RoleUser';
import RoleAdvocateIcon from '@/components/Common/Icon/RoleAdvocate';
import RoleJugleIcon from '@/components/Common/Icon/RoleJugle';

interface YourVoteRoleProp {
  project: ProjectType;
}

const YourVoteRole: React.FC<YourVoteRoleProp> = ({ project }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const role = project.id;
  return (
    <div>
      <p className="body-s mb-[4px] text-neutral-medium-gray">{t('hackathonVoting.yourVotingRole')}</p>
      <div className="flex gap-[12px]">
        <div
          className={`flex flex-1 flex-col items-center gap-[8px] rounded-[8px] border px-[8px] py-[6px] ${role === 'user' ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
        >
          <div className="body-m flex items-center gap-[8px]">
            <RoleUserIcon color={role === 'user' ? 'black' : 'var(--neutral-rich-gray)'} />
            {t('hackathonVoting.user')}
          </div>
          <div className={`caption-12pt text-neutral-rich-gray`}>
            {`20%`} {t('hackathonVoting.votes')}
          </div>
        </div>
        <div
          className={`flex flex-1 flex-col items-center gap-[8px] rounded-[8px] border px-[8px] py-[6px] ${role === 'advocate' ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
        >
          <div className="body-m flex items-center gap-[8px]">
            <RoleAdvocateIcon color={role === 'advocate' ? 'black' : 'var(--neutral-rich-gray)'} />
            {t('hackathonVoting.advocate')}
          </div>
          <div className={`caption-12pt text-neutral-rich-gray`}>
            {`20%`} {t('hackathonVoting.votes')}
          </div>
        </div>
        <div
          className={`flex flex-1 flex-col items-center gap-[8px] rounded-[8px] border px-[8px] py-[6px] ${role === 'jugle' ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
        >
          <div className="body-m flex items-center gap-[8px]">
            <RoleJugleIcon color={role === 'jugle' ? 'black' : 'var(--neutral-rich-gray)'} />
            {t('hackathonVoting.judge')}
          </div>
          <div className={`caption-12pt text-neutral-rich-gray`}>
            {`20%`} {t('hackathonVoting.votes')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourVoteRole;
