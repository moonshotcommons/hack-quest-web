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
import { separationNumber } from '@/helper/utils';
import CountDown from '@/components/Web/Business/CountDown';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import Link from 'next/link';

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
  const { getTotalPrize } = useDealHackathonData();
  const totalPrize = getTotalPrize(hackathon.rewards);

  return (
    <div
      className="card-hover flex h-[322px] overflow-hidden rounded-[16px] bg-neutral-white "
      onClick={goHackathonDetail}
    >
      <div className="relative h-full w-[571px] flex-shrink-0 bg-[#d9d9d9]/30">
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
            <CountDown time={hackathon.reviewTime} />
          </div>
          <div>
            <p className="mb-[8px]">{t('participants')}</p>
            <p className="body-xl-bold text-neutral-off-black">
              {separationNumber(hackathon.participants?.length || 0)}
            </p>
          </div>
          <div>
            <p className="mb-[8px]">{t('totalPrize')}</p>
            <p className="body-xl-bold text-neutral-off-black">${separationNumber(totalPrize || 0)}</p>
          </div>
          <div className="w-[25%]">
            <p className="mb-[8px]">{t('host')}</p>
            <p className="body-xl-bold  relative h-[36px] text-neutral-off-black underline">
              <p className="absolute left-0 top-0 w-full truncate">{hackathon.hosts[0]?.name}</p>
            </p>
          </div>
        </div>
        <div className="flex gap-[16px]">
          <Link href={`/form${MenuLink.HACKATHON}/${hackathon.id}/register`} className="w-[calc((100%-16px)/2)] ">
            <Button
              className="button-text-l h-[60px] w-full bg-yellow-primary uppercase"
              onClick={(e) => {
                e.stopPropagation();
                BurialPoint.track(`hackathon onGoingCard Submit Now 按钮点击`);
              }}
            >
              {t('submitNow')}
            </Button>
          </Link>
          <Button className="button-text-l h-[60px] w-[calc((100%-16px)/2)]  border border-neutral-black uppercase">
            {t('learnMore')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnGoingHackathonCard;
