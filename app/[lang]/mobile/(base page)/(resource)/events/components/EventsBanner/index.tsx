import Button from '@/components/Common/Button';
import React from 'react';
import EventsCover from '@/public/images/resource/events_cover.png';
import Image from 'next/image';
import { eventsBannerData } from '@/app/[lang]/(web)/(base page)/(resource)/events/constants/data';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import CountUp from '@/components/Common/CountUp';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';

interface EventsBannerProp {
  lang: Lang;
}

const EventsBanner: React.FC<EventsBannerProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="flex flex-col items-center">
      <div className="mb-[2.5rem] flex w-full flex-col items-center overflow-hidden bg-neutral-off-black pb-[4rem] pt-[80px]">
        <h1 className="text-h1-mob mb-[4rem] px-[3.125rem] text-center text-neutral-white">{t('events.title')}</h1>
        <div className="mb-[5rem]">
          <Link href={`${MenuLink.EVENTS}#events-upcoming`}>
            <Button type="primary" className="button-text-m h-[3rem] w-[10.3125rem] p-0 uppercase text-neutral-black">
              {t('events.upcomingEvents')}
            </Button>
          </Link>
          {/* <Link href={`${MenuLink.PARTNERS}`}> */}
          <Button className="button-text-m mt-[2rem] h-[3rem] w-[10.3125rem] border border-neutral-white p-0 uppercase text-neutral-white">
            {t('events.partnerWithUs')}
          </Button>
          {/* </Link> */}
        </div>
        <Image
          src={EventsCover}
          alt="events-cover"
          priority
          className="relative left-[-0.625rem] top-0 w-[calc(100%+1.25rem)]"
        />
      </div>
      <div className="w-full px-[1.25rem]">
        <div className="relative w-full">
          <div className="relative z-[2] flex flex-col gap-[32px] border border-neutral-black bg-neutral-white py-[2.5rem]">
            {eventsBannerData.map((v) => (
              <div key={v.id} className="text-center">
                <p className="text-h2-mob mb-[1rem] text-neutral-off-black">
                  <CountUp start={0} end={v.number} duration={3} />+
                </p>
                <p className="body-s text-neutral-medium-gray">{t(`events.${v.label}`)}</p>
              </div>
            ))}
          </div>
          <div className="absolute left-[0.1875rem] top-[0.1875rem] z-[1]  h-full w-full   border-[1px] border-dashed border-neutral-black bg-[#ededed]"></div>
        </div>
      </div>
    </div>
  );
};

export default EventsBanner;
