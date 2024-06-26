'use client';
import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Title from '../components/Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import HackathonRenderer from '../../../components/HackathonRenderer';
interface AboutProp {
  hackathon: HackathonType;
}

const About: React.FC<AboutProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  if (!hackathon.about?.length) return null;
  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={t('hackathonDetail.about')} />
      <HackathonRenderer content={hackathon.about} />
    </div>
  );
};

export default About;
