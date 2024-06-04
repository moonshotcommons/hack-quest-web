import React, { useContext } from 'react';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Link from 'next/link';
import { LangContext } from '@/components/Provider/Lang';
import { MoreReourceType } from '@/app/[lang]/(web)/(base page)/(learn)/ecosystem-explore/constants/type';
import Image from 'next/image';
import { GoArrowRight } from 'react-icons/go';

interface ResourceCardProp {
  resource: MoreReourceType;
}

const ResourceCard: React.FC<ResourceCardProp> = ({ resource }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <Link
      href={resource.link}
      className="card-hover flex w-full flex-col gap-[16px] rounded-[1rem] bg-neutral-white p-[1rem]"
    >
      <div className="relative h-[3rem] w-[3rem] overflow-hidden">
        <Image src={resource.icon} fill alt={resource.type} className="object-contain" />
      </div>
      <div>
        <h2 className="body-l-bold  text-neutral-off-black">{t(`explore.${resource.type}`)}</h2>
        <p className="body-s mt-[.5rem] text-neutral-medium-gray">{t(`explore.${resource.type}Intro`)}</p>
      </div>
      <GoArrowRight size={18} />
    </Link>
  );
};

export default ResourceCard;
