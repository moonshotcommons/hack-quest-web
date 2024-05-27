'use client';
import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Title from '../components/Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
interface ThemeProp {
  hackathon: HackathonType;
}

const Theme: React.FC<ThemeProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  if (!hackathon.theme) return null;
  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={t('hackathonDetail.theme')} />
      <p className="body-m text-neutral-rich-gray">{hackathon.theme}</p>
    </div>
  );
};

export default Theme;
