'use client';
import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Title from '../components/Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import HackathonRenderer from '../../../components/HackathonRenderer';
interface ThemeProp {
  hackathon: HackathonType;
}

const Theme: React.FC<ThemeProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  if (!hackathon.theme?.length) return null;
  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={t('hackathonDetail.theme')} />
      <HackathonRenderer content={hackathon.theme} />
    </div>
  );
};

export default Theme;
