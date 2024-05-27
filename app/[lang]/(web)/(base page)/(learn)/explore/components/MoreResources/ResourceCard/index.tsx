import React, { useContext } from 'react';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Link from 'next/link';
import { LangContext } from '@/components/Provider/Lang';
import { MoreReourceType } from '../../../constants/type';

interface ResourceCardProp {
  resource: MoreReourceType;
}

const ResourceCard: React.FC<ResourceCardProp> = ({ resource }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <Link href={resource.link} className="card-hover block h-full w-full rounded-[16px] bg-neutral-white p-[24px]">
      <h2 className="body-l-bold mb-[8px] text-neutral-off-black">{t(`explore.${resource.type}`)}</h2>
      <p className="body-s text-neutral-medium-gray">{t(`explore.${resource.type}Intro`)}</p>
    </Link>
  );
};

export default ResourceCard;
