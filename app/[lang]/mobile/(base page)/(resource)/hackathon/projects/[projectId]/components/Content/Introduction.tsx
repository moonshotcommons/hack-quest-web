import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';
import Title from '../Title';
import { ProjectDetailContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface IntroductionProp {
  project: ProjectType;
}

const Introduction: React.FC<IntroductionProp> = ({ project }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { titleTxtData } = useContext(ProjectDetailContext);
  if (!project.detail.oneLineIntro) return;
  return (
    <div className="flex flex-col gap-[1rem]">
      <Title title={t('projectsDetail.title.introduction')} />
      <p className="body-s text-neutral-rich-gray">{project.detail.oneLineIntro}</p>
    </div>
  );
};

export default Introduction;
