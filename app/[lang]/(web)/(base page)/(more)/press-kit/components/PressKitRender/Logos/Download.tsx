'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import React, { useContext } from 'react';
import { GrDownload } from 'react-icons/gr';
import { TransNs } from '@/i18n/config';
import { cn } from '@/helper/utils';

interface DownloadProp {
  fileName: string;
  className?: string;
  size?: number;
}

const Download: React.FC<DownloadProp> = ({ fileName, className, size = 14 }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.PRESS_KIT);
  const downloadFile = () => {
    const origin = window.location.origin;
    const url = `${origin}/images/press-kit/${fileName}`;
    window.location.href = url;
  };

  return (
    <div className={cn('body-s flex items-center gap-[4px] text-neutral-black', className)} onClick={downloadFile}>
      <GrDownload size={14} />
      <span>{t('download')}</span>
    </div>
  );
};

export default Download;
