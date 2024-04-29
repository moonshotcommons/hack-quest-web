import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import { logosData } from '../../../constants/data';
import Image from 'next/image';
import Download from './Download';

interface LogosProp {
  lang: Lang;
}

const Logos: React.FC<LogosProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.PRESS_KIT);
  return (
    <div>
      <h1 className="text-h2 mb-[40px]">{t('logos')}</h1>
      <div className="flex flex-wrap gap-[20px]">
        {logosData.map((v, i) => (
          <div key={i} className="card-hover w-[calc((100%-40px)/3)] overflow-hidden  rounded-[16px] bg-neutral-white">
            <div className="relative h-0 w-full bg-neutral-light-gray pt-[56.25%] ">
              {v.img && <Image src={v.img} alt={v.name} fill className="object-cover" />}
            </div>
            <div className="flex h-[122px] flex-col justify-between p-[16px]">
              <h2 className="body-m  line-clamp-2 text-neutral-off-black">{v.name}</h2>
              <Download fileName={v.fileName} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logos;
