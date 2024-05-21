'use client';
import { Lang, TransNs } from '@/i18n/config';
import React from 'react';
import { useTranslation } from '@/i18n/client';
import DeveloperCover from '@/public/images/learn/develpoer_cover.png';
import { BiSearch } from 'react-icons/bi';

interface IndexProp {
  lang: Lang;
}

const Index: React.FC<IndexProp> = ({ lang }) => {
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <div
      className="flex-center h-[360px] bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${DeveloperCover.src})`,
        backgroundSize: 'auto 100%'
      }}
    >
      <div className="flex flex-col items-center gap-[40px]">
        <h1 className="text-h1 text-neutral-black">{t('developer.title')}</h1>
        <div className="flex h-[61px] w-[800px] items-center gap-[20px] rounded-[56px] border border-neutral-light-gray bg-neutral-white px-[20px]">
          <BiSearch size={32} className="flex-shrink-0" />
          <input
            className="body-l boder-none flex-1 outline-none"
            placeholder={t('searchPlaceholder')}
            onChange={(e) => {
              const value = e.target.value;
              console.info(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
