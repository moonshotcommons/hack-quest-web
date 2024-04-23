import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import { logosData } from '../../../constants/data';
import Image from 'next/image';
import { GrDownload } from 'react-icons/gr';

interface LogosProp {
  lang: Lang;
}

const Logos: React.FC<LogosProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.PRESS_KIT);
  return (
    <div>
      <h1 className="text-h2 mb-[40px]">{t('logos')}</h1>
      <div className="flex flex-wrap gap-[20px]">
        {logosData.map((v) => (
          <div
            key={v.id}
            className="card-hover w-[calc((100%-40px)/3)] overflow-hidden  rounded-[16px] bg-neutral-white"
          >
            <div className="relative h-0 w-full bg-neutral-light-gray pt-[56.25%] ">
              {v.img && <Image src={v.img} alt={v.name} fill className="object-cover" />}
            </div>
            <div className="flex h-[122px] flex-col justify-between p-[16px]">
              <h2 className="body-m  line-clamp-2 text-neutral-off-black">{v.name}</h2>
              <div className="body-s flex items-center gap-[4px] text-neutral-black">
                <GrDownload size={14} />
                <span>{t('download')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logos;
