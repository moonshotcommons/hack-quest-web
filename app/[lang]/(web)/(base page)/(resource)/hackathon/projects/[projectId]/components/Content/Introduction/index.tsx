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
    <div className="flex w-full flex-col gap-[32px]">
      <Title title={t('projectsDetail.title.introduction')} />
      <div
        className="body-l reset-editor-style w-full whitespace-pre-line text-neutral-rich-gray"
        dangerouslySetInnerHTML={{
          __html: (project.detail.detailedIntro || '').replace(/&nbsp;/g, '\n')
        }}
      ></div>
    </div>
  );
};

export default Introduction;
