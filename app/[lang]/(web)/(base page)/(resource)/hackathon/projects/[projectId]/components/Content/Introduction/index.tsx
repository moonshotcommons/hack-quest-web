import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import Title from '../../Title';
import { ProjectDetailContext } from '../../../../../constants/type';

interface IntroductionProp {}

const Introduction: React.FC<IntroductionProp> = ({}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { project, titleTxtData } = useContext(ProjectDetailContext);
  if (!titleTxtData.includes('projectsDetail.title.introduction')) return null;
  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={t('projectsDetail.title.introduction')} />
      <p className="body-l whitespace-pre-line text-neutral-rich-gray">{project.detail?.detailedIntro}</p>
    </div>
  );
};

export default Introduction;
