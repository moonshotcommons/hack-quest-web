'use client';
import Image from 'next/image';
import { FC } from 'react';
import moment from 'moment';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { separationNumber } from '@/helper/utils';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';

interface PastHackathonCardProps {
  hackathon: HackathonType;
}

const PastHackathonCard: FC<PastHackathonCardProps> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getTotalPrize } = useDealHackathonData();
  const totalPrize = getTotalPrize(hackathon.rewards);
  return (
    <Link href={`${MenuLink.HACKATHON}/${hackathon.alias}`}>
      <div className="card-hover flex  w-full flex-col overflow-hidden rounded-[16px] bg-neutral-white ">
        <div className="relative h-0 w-full rounded-t-[10px] bg-[#D9D9D9] pt-[43%]">
          {hackathon.image && <Image src={hackathon.image} fill alt={hackathon.alias} className="object-cover"></Image>}
        </div>
        <div className="flex h-[206px] flex-col justify-between px-[20px] py-[20px]">
          <h2 className="text-h3-mob line-clamp-1 text-neutral-off-black">{hackathon.name}</h2>
          <div className="body-s-bold w-fit rounded-[8px] border-[2px] border-neutral-medium-gray px-[12px] py-[4px] uppercase text-neutral-medium-gray">
            closed {moment(hackathon.rewardTime).format('ll')}
          </div>
          <div className="body-s flex flex-col gap-[4px] text-neutral-medium-gray [&>div]:flex [&>div]:items-center [&>div]:justify-between">
            <div>
              <span className="">{t('participants')}</span>
              <span className="body-m-bold text-neutral-off-black">
                {separationNumber(hackathon.members?.length || 0)}
              </span>
            </div>
            <div>
              <span className="">{t('totalPrize')}</span>
              <span className="body-m-bold text-neutral-off-black">${separationNumber(totalPrize || 0)}</span>
            </div>
            <div>
              <span className="">{t('host')}</span>
              <span className="body-m-bold text-neutral-off-black underline">{hackathon.hosts?.[0]?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PastHackathonCard;
