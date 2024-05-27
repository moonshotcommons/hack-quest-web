'use client';
import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Title from '../components/Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
interface AboutProp {
  hackathon: HackathonType;
}

const About: React.FC<AboutProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  if (!hackathon.about) return null;
  return (
    <div className="flex flex-col">
      <Title title={t('hackathonDetail.about')} />
      <p className="body-s whitespace-pre-line text-neutral-rich-gray">{hackathon.about}</p>
    </div>
  );
};

export default About;
