import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { eventsExploreLinkData } from '../../constants/data';
import { BsArrowRightShort } from 'react-icons/bs';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
interface ExploreMoreProp {
  lang: Lang;
}

const ExploreMore: React.FC<ExploreMoreProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="container mx-auto mt-[100px]">
      <div className="mb-[60px] text-center">
        <p className="text-h2 mb-[12px] text-neutral-off-black">{t('events.exploreMore')}</p>
        <p className="body-m text-neutral-medium-gray">{t('events.exploreMoreDesc')}</p>
      </div>
      <div className="flex gap-[40px]">
        {eventsExploreLinkData.map((v) => (
          <Link key={v.id} href={v.path} className="flex-1 flex-shrink-0 ">
            <div className="flex w-full items-center justify-between rounded-[16px] bg-neutral-white p-[24px]">
              <div className="body-xl-bold flex items-center gap-[32px] text-neutral-off-black">
                <Image src={v.img} width={64} alt={v.label} />
                <span>{t(`events.${v.label}`)}</span>
              </div>
              <BsArrowRightShort size={32} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
