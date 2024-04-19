'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { BurialPoint } from '@/helper/burialPoint';
import { useRedirect } from '@/hooks/router/useRedirect';
import MenuLink from '@/constants/MenuLink';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import CountDown from './CountDown';
import { separationNumber } from '@/helper/utils';

interface OnGoingHackathonCardProp {
  hackathon: HackathonType;
}

const OnGoingHackathonCard: React.FC<OnGoingHackathonCardProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { redirectToUrl } = useRedirect();
  const goHackathonDetail = () => {
    BurialPoint.track(`hackathon onGoingCard 点击`);
    redirectToUrl(`${MenuLink.HACKATHON}/${hackathon.alias}`);
  };
  return (
    <div
      className="card-hover flex h-[322px] overflow-hidden rounded-[16px] bg-neutral-white "
      onClick={goHackathonDetail}
    >
      <div className="relative h-full w-[571px] bg-[#d9d9d9]/30">
        <Image src={hackathon.image} fill alt={hackathon.alias} className="object-cover"></Image>
      </div>
      <div className="flex h-full flex-1 flex-col justify-between px-[24px] py-[20px] text-neutral-off-black">
        <div className="flex">
          <h2 className="text-h3 line-clamp-1 ">{hackathon.name}</h2>
        </div>
        <div className="body-l-bold w-fit rounded-[8px] border-[2px] border-status-success px-[12px] py-[4px] uppercase text-status-success">
          {t('liveNow')}
        </div>
        <div className="body-m flex items-center justify-between text-neutral-medium-gray">
          <div>
            <p className="mb-[8px]">{t('submissionClosesIn')}</p>
            <CountDown hackathon={hackathon} />
          </div>
          <div>
            <p className="mb-[8px]">{t('participants')}</p>
            <p className="body-xl-bold text-neutral-off-black">{separationNumber(hackathon.totalPrice || 0)}</p>
          </div>
          <div>
            <p className="mb-[8px]">{t('totalPrize')}</p>
            <p className="body-xl-bold text-neutral-off-black">{separationNumber(hackathon.totalPrice || 0)}</p>
          </div>
          <div className="w-[33%]">
            <p className="mb-[8px]">{t('host')}</p>
            <p className="body-xl-bold truncate text-neutral-off-black underline">{hackathon.hosts[0]?.name}</p>
          </div>
        </div>
        <div className="flex gap-[16px]">
          <Button
            className="button-text-l h-[60px] flex-1 bg-yellow-primary uppercase"
            onClick={(e) => {
              e.stopPropagation();
              BurialPoint.track(`hackathon onGoingCard Submit Now 按钮点击`);
            }}
          >
            {t('submitNow')}
          </Button>
          <Button className="button-text-l h-[60px] flex-1 border border-neutral-black uppercase">
            {t('learnMore')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnGoingHackathonCard;
