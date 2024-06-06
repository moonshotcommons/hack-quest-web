import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import React from 'react';
import Title from '../Title';
import Image from 'next/image';
import { GoArrowRight } from 'react-icons/go';
import Link from 'next/link';
import { resourceData } from '@/app/[lang]/(web)/(base page)/(learn)/ecosystem-explore/[ecosystemId]/contants/data';

interface MoreResourceProp {
  lang: Lang;
}

const MoreResource: React.FC<MoreResourceProp> = ({ lang }) => {
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <div className="flex flex-col gap-[1.25rem]">
      <Title title={t('explore.moreResources')} description={t('explore.detailMoreResourcesIntro')} />
      <div className="flex flex-col gap-[1.25rem]">
        {resourceData.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            className="card-hover flex w-full items-center justify-between rounded-[1rem] bg-neutral-white p-[1rem]"
          >
            <div className="flex items-center gap-[1rem]">
              <div className="relative h-[3rem] w-[3rem] overflow-hidden">
                <Image src={item.image} alt={'hackathon-cover'} fill className="object-cover" />
              </div>
              <span className="body-l-bold text-neutral-off-black">{t(item.title)}</span>
            </div>
            <GoArrowRight size={24} className="text-neutral-off-black" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreResource;
