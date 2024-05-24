'use client';
import { LangContext } from '@/components/Provider/Lang';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Image, { StaticImageData } from 'next/image';
import React, { useContext } from 'react';

interface DeveloperTitleProp {
  lang: Lang;
  image: StaticImageData;
  title: string;
}

const DeveloperTitle: React.FC<DeveloperTitleProp> = ({ image, title }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <div className="flex gap-[16px]">
      <div className="relative h-[64px] w-[64px] overflow-hidden">
        <Image src={image} fill alt={title} className="object-contain" />
      </div>
      <div>
        <p className="text-h3 text-neutral-black">{t(`explore.${title}`)}</p>
        <p className="body-m text-neutral-medium-gray">{t(`explore.${title}Intro`)}</p>
      </div>
    </div>
  );
};

export default DeveloperTitle;
