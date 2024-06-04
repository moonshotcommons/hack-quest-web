'use client';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { StaticImageData } from 'next/image';
import React, { useContext } from 'react';

interface DeveloperTitleProp {
  image: StaticImageData;
  title: string;
}

const DeveloperTitle: React.FC<DeveloperTitleProp> = ({ image, title }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <div className="flex items-center gap-[1rem]">
      {/* <div className="relative h-[3rem] w-[3rem] overflow-hidden">
        <Image src={image} fill alt={title} className="object-contain" />
      </div> */}
      <div>
        <p className="text-h3-mob text-neutral-black">{t(`explore.${title}`)}</p>
        <p className="body-s mt-[.25rem] text-neutral-medium-gray">{t(`explore.${title}Intro`)}</p>
      </div>
    </div>
  );
};

export default DeveloperTitle;
