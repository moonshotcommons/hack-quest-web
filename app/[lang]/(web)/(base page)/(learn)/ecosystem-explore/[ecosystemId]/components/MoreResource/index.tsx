import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import Title from '../Title';
import Image from 'next/image';
import { GoArrowRight } from 'react-icons/go';
import Link from 'next/link';
import { resourceData } from '../../contants/data';

interface MoreResourceProp {
  lang: Lang;
}

const MoreResource: React.FC<MoreResourceProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LEARN);
  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={t('explore.moreResources')} description={t('explore.detailMoreResourcesIntro')} />
      <div className="flex gap-[20px]">
        {resourceData.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            className="card-hover flex flex-1 items-center justify-between rounded-[16px] bg-neutral-white p-[24px]"
          >
            <div className="flex items-center gap-[32px]">
              <div className="relative h-[64px] w-[64px] overflow-hidden">
                <Image src={item.image} alt={'hackathon-cover'} fill className="object-cover" />
              </div>
              <span className="body-xl-bold text-neutral-off-black">{t(item.title)}</span>
            </div>
            <GoArrowRight size={30} className="text-neutral-off-black" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreResource;
