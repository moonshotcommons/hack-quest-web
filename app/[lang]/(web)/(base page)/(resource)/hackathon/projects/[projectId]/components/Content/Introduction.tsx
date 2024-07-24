import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';
import Title from '../Title';
import { ProjectDetailContext } from '../../../../constants/type';

interface IntroductionProp {
  project: ProjectType;
}

const Introduction: React.FC<IntroductionProp> = ({ project }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  if (!project.detail?.oneLineIntro) return null;

  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={t('projectsDetail.title.introduction')} />
      <p className="body-l text-neutral-rich-gray">{project.detail?.oneLineIntro}</p>
    </div>
  );
};

export default Introduction;
