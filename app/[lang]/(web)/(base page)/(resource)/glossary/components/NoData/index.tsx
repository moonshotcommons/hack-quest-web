'use client';
import Button from '@/components/Common/Button';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import SubmitWordModal from '../SubmitWordModal';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface NoDataProp {
  href: string;
  keyword?: string;
}

const NoData: React.FC<NoDataProp> = ({ href, keyword }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const [submitVisible, setSubmitVisible] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center gap-[28px] pt-[40px]">
        <p className="body-l text-neutral-rich-gray">
          {keyword ? ` ${t('youCanSubmitWord')}, “${keyword}”, ${t('weWillWork')}` : t('noContent')}
          {}
        </p>
        <div className="flex justify-center gap-[10px]">
          <Button
            type="primary"
            className="button-text-l h-[60px] w-[270px] uppercase"
            onClick={() => setSubmitVisible(true)}
          >
            {t('submitTheWord')}
          </Button>
          <Link
            className="button-text-l flex h-[60px] w-[270px] items-center justify-center rounded-[2.5rem] border border-neutral-black uppercase text-neutral-black"
            href={href}
          >
            {t('cancel')}
          </Link>
        </div>
      </div>
      <SubmitWordModal open={submitVisible} keyword={keyword} onClose={() => setSubmitVisible(false)} />
    </>
  );
};

export default NoData;
