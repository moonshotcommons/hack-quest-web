'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';

interface TitleProp {
  title: string;
}

const Title: React.FC<TitleProp> = ({ title }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className={'text-h2-mob relative pl-[.8125rem] leading-[1.625rem] text-neutral-black'}>
      <span className=" ">{t(title)}</span>
      <span className="absolute left-0 top-0 h-full w-[.3125rem] rounded-[6.25rem] bg-yellow-dark"></span>
    </div>
  );
};

export default Title;
