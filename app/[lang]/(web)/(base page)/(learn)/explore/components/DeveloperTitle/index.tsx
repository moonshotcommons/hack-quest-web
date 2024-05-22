import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface DeveloperTitleProp {
  lang: Lang;
  image: StaticImageData;
  title: string;
}

const DeveloperTitle: React.FC<DeveloperTitleProp> = async ({ lang, image, title }) => {
  const { t } = await useTranslation(lang, TransNs.LEARN);
  return (
    <div className="flex gap-[16px]">
      <div className="relative h-[64px] w-[64px] overflow-hidden">
        <Image src={image} fill alt={title} className="object-contain" />
      </div>
      <div>
        <p className="text-h3 text-neutral-black">{t(`developer.${title}`)}</p>
        <p className="body-m text-neutral-medium-gray">{t(`developer.${title}Intro`)}</p>
      </div>
    </div>
  );
};

export default DeveloperTitle;
