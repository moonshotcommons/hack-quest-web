import React from 'react';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import Link from 'next/link';

interface ResourceCardProp {
  type: string;
  lang: Lang;
  link: string;
}

const ResourceCard: React.FC<ResourceCardProp> = async ({ type, lang, link }) => {
  const { t } = await useTranslation(lang, TransNs.LEARN);
  return (
    <Link href={link} className="card-hover block w-[calc((100%-64px)/3)] rounded-[16px] bg-neutral-white p-[24px]">
      <h2 className="body-l-bold mb-[8px] text-neutral-off-black">{t(`explore.${type}`)}</h2>
      <p className="body-s text-neutral-medium-gray">{t(`explore.${type}Intro`)}</p>
    </Link>
  );
};

export default ResourceCard;
