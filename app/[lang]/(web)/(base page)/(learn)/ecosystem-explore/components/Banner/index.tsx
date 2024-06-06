'use client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useRef } from 'react';
import { useTranslation } from '@/i18n/client';
import DeveloperCover from '@/public/images/learn/develpoer_cover.png';
import { BiSearch } from 'react-icons/bi';
import { LangContext } from '@/components/Provider/Lang';

interface IndexProp {
  keyword?: string;
  searchKeyword: (key: string) => void;
}

const Index: React.FC<IndexProp> = ({ keyword, searchKeyword }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const search = (val: string) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      searchKeyword(val);
    }, 1000);
  };
  return (
    <div
      className="flex-center h-[360px] bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${DeveloperCover.src})`,
        backgroundSize: '100% auto',
        backgroundPosition: 'center'
      }}
    >
      <div className="flex flex-col items-center gap-[40px]">
        <h1 className="text-h2 text-neutral-black">{t('explore.title')}</h1>
        <div className="flex h-[61px] w-[800px] items-center gap-[20px] rounded-[56px] border border-neutral-light-gray bg-neutral-white px-[20px]">
          <BiSearch size={32} className="flex-shrink-0" />
          <input
            className="body-l boder-none flex-1 outline-none"
            placeholder={t('searchPlaceholder')}
            onChange={(e) => {
              const value = e.target.value;
              search(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
