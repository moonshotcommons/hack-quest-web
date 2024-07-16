import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import { logosData } from '@/app/[lang]/(web)/(base page)/(more)/press-kit/constants/data';
import Image from 'next/image';
import Download from '@/app/[lang]/(web)/(base page)/(more)/press-kit/components/PressKitRender/Logos/Download';

interface LogosProp {
  lang: Lang;
}

const Logos: React.FC<LogosProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.PRESS_KIT);
  return (
    <div>
      <h1 className="text-h2-mob mb-[1.25rem]">{t('logos')}</h1>
      <div className="flex flex-wrap gap-x-[.75rem] gap-y-[1rem]">
        {logosData.map((v, i) => (
          <div
            key={i}
            className="card-hover w-[calc((100%-0.75rem)/2)] overflow-hidden  rounded-[1rem] bg-neutral-white"
          >
            <div className="relative h-0 w-full bg-neutral-light-gray pt-[56.25%] ">
              {v.img && <Image src={v.img} alt={v.name} fill className="object-cover" />}
            </div>
            <div className="flex h-[4.625rem] flex-col justify-between p-[.5rem]">
              <h2 className="body-xs  line-clamp-2 text-neutral-off-black">{v.name}</h2>
              <Download fileName={v.fileName} className="caption-12pt gap-[.25rem]" size={10} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logos;
