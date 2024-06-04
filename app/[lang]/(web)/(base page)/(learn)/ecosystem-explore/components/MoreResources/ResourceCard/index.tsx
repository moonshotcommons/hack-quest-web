import React, { useContext } from 'react';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Link from 'next/link';
import { LangContext } from '@/components/Provider/Lang';
import { MoreReourceType } from '../../../constants/type';
import BaseImage from '@/components/Common/BaseImage';
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
      className="card-hover group  block h-full w-full rounded-[16px] bg-neutral-white p-[24px] hover:bg-yellow-hover"
    >
      <div className="relative">
        <BaseImage
          className="h-[64px] w-[64px] transition-all duration-300 group-hover:opacity-0"
          src={resource.icon}
          alt={resource.type}
          contain={true}
        />
        <div className="transition-all duration-300 group-hover:translate-y-[-70px]">
          <h2 className="body-l-bold mb-[8px] mt-[2rem] text-neutral-off-black">{t(`explore.${resource.type}`)}</h2>
          <p className="body-s mt-[.5rem] text-neutral-medium-gray">{t(`explore.${resource.type}Intro`)}</p>
        </div>
        <GoArrowRight
          size={24}
          className="absolute bottom-0 left-0 opacity-0 transition-all duration-300 group-hover:opacity-100"
        />
      </div>
    </Link>
  );
};

export default ResourceCard;
