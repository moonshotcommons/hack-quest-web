import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';
import Title from '../../Title';
import TeamCard from './TeamCard';
import { titleTxtData } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/data';

interface TeamProp {
  project: ProjectType;
}

const Team: React.FC<TeamProp> = ({ project }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <Title title={t(titleTxtData[3])} />
      <div className="w-full">
        <p className="body-m-bold">11111</p>
        <div className="mt-[.75rem] flex flex-col gap-[.75rem]">
          {project.members?.map((member) => (
            <div key={member.userId} className="w-full">
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
