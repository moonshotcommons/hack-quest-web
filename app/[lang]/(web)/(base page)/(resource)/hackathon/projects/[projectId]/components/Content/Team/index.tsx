import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import Title from '../../Title';
import TeamCard from './TeamCard';
import { ProjectDetailContext } from '../../../../../constants/type';

interface TeamProp {}

const Team: React.FC<TeamProp> = ({}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { project, titleTxtData } = useContext(ProjectDetailContext);
  if (!titleTxtData.includes('projectsDetail.title.team')) return null;
  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={t('projectsDetail.title.team')} />
      <div className="w-full">
        <p className="body-l-bold">{project.team?.name}</p>
        <div className="mt-[12px] flex flex-wrap gap-[20px]">
          {project.members?.map((member) => (
            <div key={member.userId} className="w-[calc((100%-60px)/4)]">
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
