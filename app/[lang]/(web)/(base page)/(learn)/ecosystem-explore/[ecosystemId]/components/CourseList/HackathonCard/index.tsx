'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { BurialPoint } from '@/helper/burialPoint';
import { useRedirect } from '@/hooks/router/useRedirect';
import MenuLink from '@/constants/MenuLink';
import { separationNumber } from '@/helper/utils';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import CountDown from '@/components/Web/Business/CountDown';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';

interface OnGoingHackathonCardProp {
  hackathon: HackathonType;
}

const OnGoingHackathonCard: React.FC<OnGoingHackathonCardProp> = ({ hackathon }) => {
  const { redirectToUrl } = useRedirect();
  const goHackathonDetail = () => {
    BurialPoint.track(`hackathon onGoingCard 点击`);
    redirectToUrl(`${MenuLink.EXPLORE_HACKATHON}/${hackathon?.alias}`);
  };
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getTotalPrize } = useDealHackathonData();
  const totalPrize = getTotalPrize(hackathon.rewards);
  return (
    <div
      className="card-hover flex  w-full flex-col overflow-hidden rounded-[.75rem] bg-neutral-white "
      onClick={goHackathonDetail}
    >
      <div className="relative h-0 w-full rounded-t-[10px] bg-[#D9D9D9] pt-[43%]">
        {<Image src={hackathon?.info?.image || ''} fill alt={hackathon?.alias} className="object-cover"></Image>}
      </div>
      <div className="flex flex-col justify-between gap-[1rem] px-[1.5rem] py-[1.25rem]">
        <h2 className="text-h3-mob line-clamp-1 text-neutral-off-black">{hackathon?.name}</h2>
        <div className="body-s-bold w-fit rounded-[.5rem] border-[.125rem] border-status-success px-[.75rem] py-[.25rem] uppercase text-status-success">
          {t('liveNow')}
        </div>
        <div>
          <p className="body-s mb-[.25rem] text-neutral-medium-gray">{t('submissionClosesIn')}</p>
          <CountDown time={hackathon?.timeline?.submissionClose} isMobile={true} />
        </div>
        <div className="body-s flex flex-col gap-[4px] text-neutral-medium-gray [&>div]:flex [&>div]:items-center [&>div]:justify-between">
          <div>
            <span className="">{t('participants')}</span>
            <span className="body-m-bold text-neutral-off-black">{separationNumber(hackathon?.memberCount || 0)}</span>
          </div>
          <div>
            <span className="">{t('totalPrize')}</span>
            <span className="body-m-bold text-neutral-off-black">{`${separationNumber(totalPrize || 0)} ${hackathon.rewards?.[0]?.currency || 'USD'}`}</span>
          </div>
          <div>
            <span className="">{t('host')}</span>
            <span className="body-m-bold text-neutral-off-black underline">{hackathon?.info?.host}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnGoingHackathonCard;
