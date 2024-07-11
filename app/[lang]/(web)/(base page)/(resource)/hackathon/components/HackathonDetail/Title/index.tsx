'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';

interface TitleProp {
  title: string;
  inter?: boolean;
}

const Title: React.FC<TitleProp> = ({ title, inter = true }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className={'text-h3 relative pl-[21px] leading-[34px] text-neutral-black'}>
      <span className=" ">{inter ? t(title) : title}</span>
      <span className="absolute left-0 top-0 h-full w-[5px] rounded-[100px] bg-yellow-dark"></span>
    </div>
  );
};

export default Title;
