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

interface PastHackathonCardProps {
  hackathon: HackathonType;
}

const PastHackathonCard: FC<PastHackathonCardProps> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <Link href={`${MenuLink.HACKATHON}/${hackathon.alias}`} className="block w-full">
      <div className="card-hover flex h-[7.5rem] overflow-hidden rounded-[.75rem] bg-neutral-white ">
        <div className="relative h-full w-[7.5rem] bg-[#d9d9d9]/30">
          <Image src={hackathon.image} fill alt={hackathon.alias} className="object-cover"></Image>
        </div>
        <div className="flex h-full flex-1 flex-col justify-between p-[.75rem] text-neutral-off-black">
          <h2 className="body-s line-clamp-1 text-neutral-off-black">{hackathon.name}</h2>
          <div className="caption-10pt w-fit rounded-[.5rem] border-[.0625rem] border-neutral-medium-gray px-[.5rem] py-[.25rem] uppercase text-neutral-medium-gray">
            closed {moment(hackathon.endTime).format('ll')}
          </div>
          <div className="caption-10pt flex items-center justify-between text-neutral-medium-gray">
            <div>
              <p className="mb-[.25rem]">{t('participants')}</p>
              <p className=" text-neutral-off-black">{separationNumber(hackathon.totalPrice || 0)}</p>
            </div>
            <div>
              <p className="mb-[.25rem]">{t('totalPrize')}</p>
              <p className=" text-neutral-off-black">{separationNumber(hackathon.totalPrice || 0)}</p>
            </div>
            <div className="w-[33%]">
              <p className="mb-[.25rem]">{t('host')}</p>
              <p className=" truncate text-neutral-off-black underline">{hackathon.hosts[0]?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PastHackathonCard;
