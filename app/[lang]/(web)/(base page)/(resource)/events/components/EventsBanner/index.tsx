import Button from '@/components/Common/Button';
import React from 'react';
import EventsCover from '@/public/images/resource/events_cover.png';
import Image from 'next/image';
import { eventsBannerData } from '../../constants/data';
import CountUp from '@/components/Common/CountUp';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import UpcomingButton from './UpcomingButton';

interface EventsBannerProp {
  lang: Lang;
}

const EventsBanner: React.FC<EventsBannerProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-col items-center bg-neutral-off-black pb-[57px] pt-[124px]">
        <h1 className="text-h2 mb-[60px] text-neutral-white">{t('events.title')}</h1>
        <div className="mb-[46px] flex gap-[32px]">
          <UpcomingButton lang={lang} />
          {/* <Link href={`${MenuLink.PARTNERS}`}> */}
          <Button className="button-text-l h-[60px] w-[270px] border border-neutral-white uppercase text-neutral-white">
            {t('events.partnerWithUs')}
          </Button>
          {/* </Link> */}
        </div>
        <Image src={EventsCover} width={1037} alt="events-cover" priority />
      </div>
      <div className="container  mt-[-40px] ">
        <div className="relative">
          <div className="relative z-[2] flex  h-[220px] border border-neutral-black bg-neutral-white px-[32px] pt-[58px]">
            {eventsBannerData.map((v) => (
              <div key={v.id} className="flex-1 text-center">
                <p className="text-h2 mb-[16px] text-neutral-off-black">
                  <CountUp start={0} end={v.number} duration={3} />+
                </p>
                <p className="body-l text-neutral-medium-gray">{t(`events.${v.label}`)}</p>
              </div>
            ))}
          </div>
          <div className="absolute left-[10px] top-[10px] z-[1]  h-full w-full border-[1px] border-dashed border-neutral-black bg-[#ededed]"></div>
        </div>
      </div>
    </div>
  );
};

export default EventsBanner;
