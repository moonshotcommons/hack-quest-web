import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import Title from '../Title';
import HackathonIcon from '@/public/images/learn/icon_hackathon.png';
import BountyIcon from '@/public/images/learn/icon_bounty.png';
import Image from 'next/image';
import { HiArrowLongRight } from 'react-icons/hi2';

interface MoreResourceProp {
  lang: Lang;
}

const MoreResource: React.FC<MoreResourceProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LEARN);
  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={t('explore.moreResources')} description={t('explore.detailMoreResourcesIntro')} />
      <div className="flex gap-[20px]">
        <div className="flex flex-1 items-center justify-between rounded-[16px] bg-neutral-white p-[24px]">
          <div className="flex items-center gap-[32px]">
            <div className="relative h-[64px] w-[64px] overflow-hidden">
              <Image src={HackathonIcon} alt={'hackathon-cover'} fill className="object-cover" />
            </div>
            <span className="body-xl-bold text-neutral-off-black">{t('explore.hackathon')}</span>
          </div>
          <HiArrowLongRight size={30} className="text-neutral-off-black" />
        </div>
        <div className="flex flex-1 items-center justify-between rounded-[16px] bg-neutral-white p-[24px]">
          <div className="flex items-center gap-[32px]">
            <div className="relative h-[64px] w-[64px] overflow-hidden">
              <Image src={BountyIcon} alt={'bounty-cover'} fill className="object-cover" />
            </div>
            <span className="body-xl-bold text-neutral-off-black">{t('explore.bounty')}</span>
          </div>
          <HiArrowLongRight size={30} className="text-neutral-off-black" />
        </div>
      </div>
    </div>
  );
};

export default MoreResource;
