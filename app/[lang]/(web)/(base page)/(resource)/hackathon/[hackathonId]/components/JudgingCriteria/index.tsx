'use client';
import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Title from '../components/Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import HackathonRenderer from '../../../components/HackathonRenderer';
interface JudgingCriteriaProp {
  hackathon: HackathonType;
}

const JudgingCriteria: React.FC<JudgingCriteriaProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  if (!hackathon.voteRules?.length) return null;
  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={t('hackathonDetail.judgingCriteria')} />
      <HackathonRenderer content={hackathon.voteRules} />
    </div>
  );
};

export default JudgingCriteria;
