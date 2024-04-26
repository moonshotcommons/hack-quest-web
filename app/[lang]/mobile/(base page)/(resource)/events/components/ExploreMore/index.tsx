import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';
import { eventsExploreLinkData } from '@/app/[lang]/(web)/(base page)/(resource)/events/constants/data';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
interface ExploreMoreProp {
  lang: Lang;
}

const ExploreMore: React.FC<ExploreMoreProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="mt-[5rem] px-[1.25rem]">
      <div className="mb-[2.5rem] text-center">
        <p className="text-h2-mob mb-[1rem] text-neutral-off-black">{t('events.exploreMore')}</p>
        <p className="body-s text-neutral-medium-gray">{t('events.exploreMoreDesc')}</p>
      </div>
      <div className="flex flex-col gap-[1.25rem]">
        {eventsExploreLinkData.map((v) => (
          <Link key={v.id} href={v.path} className="w-full">
            <div className="flex w-full items-center justify-between rounded-[1rem] bg-neutral-white p-[1.5rem]">
              <div className="body-m-bold flex items-center gap-[1.5rem] text-neutral-off-black">
                <div className="relative h-[3rem] w-[3rem]">
                  <Image src={v.img} alt={t(`events.${v.label}`)} fill className="object-cover" />
                </div>
                <span>{t(`events.${v.label}`)}</span>
              </div>
              <BsArrowRightShort size={24} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
