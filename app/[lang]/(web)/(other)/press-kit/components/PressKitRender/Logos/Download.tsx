'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import React, { useContext } from 'react';
import { GrDownload } from 'react-icons/gr';
import { TransNs } from '@/i18n/config';

interface DownloadProp {
  fileUrl: string;
  fileName: string;
}

const Download: React.FC<DownloadProp> = ({ fileUrl, fileName }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.PRESS_KIT);

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    console.info(fileName);
    link.download = `${fileName}.png`; // 下载文件的文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="body-s flex items-center gap-[4px] text-neutral-black" onClick={downloadFile}>
      <GrDownload size={14} />
      <span>{t('download')}</span>
    </div>
  );
};

export default Download;
