import MenuLink from '@/constants/MenuLink';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import { FaucetType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import React from 'react';
import { HiArrowLongLeft } from 'react-icons/hi2';
import FaucetInfo from './FaucetInfo';

interface FaucetDetailPageProp {
  faucet: FaucetType;
  lang: Lang;
}

const FaucetDetailPage: React.FC<FaucetDetailPageProp> = async ({ faucet, lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="container mx-auto pt-[20px]">
      <Link className="h-full" href={MenuLink.FAUCETS}>
        <div className="body-m flex h-full items-center gap-[7px] text-neutral-black ">
          <HiArrowLongLeft size={20}></HiArrowLongLeft>
          <span>{t('back')}</span>
        </div>
      </Link>
      <FaucetInfo faucet={faucet} />
      <div className="body-s pt-[20px] text-center leading-[160%] text-neutral-rich-gray">
        <p>{t('faucets.wantToDonate')}</p>
        <p>
          {t('faucets.donate', {
            symbol: faucet.symbol,
            address: faucet.owner
          })}
        </p>
      </div>
    </div>
  );
};

export default FaucetDetailPage;
