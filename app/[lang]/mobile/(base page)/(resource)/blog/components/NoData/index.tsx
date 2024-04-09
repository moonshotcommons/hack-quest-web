'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Link from 'next/link';
import React, { useContext } from 'react';

interface NoDataProp {
  href: string;
}

const NoData: React.FC<NoDataProp> = ({ href }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="flex flex-col items-center gap-[1.25rem]">
      <p className="body-m text-neutral-medium-gray">{t('noContent')}</p>
      <Link
        className="button-text-m flex h-[3rem] w-[13rem] items-center justify-center rounded-[2.5rem] border border-neutral-black uppercase text-neutral-black"
        href={href}
      >
        {t('backAllBlogs')}
      </Link>
    </div>
  );
};

export default NoData;
