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
    <div className="px-[1.25rem] pt-[1.25rem]">
      <Link href={MenuLink.FAUCETS}>
        <div className="body-s flex  items-center gap-[.4375rem] text-neutral-black ">
          <HiArrowLongLeft size={16}></HiArrowLongLeft>
          <span>{t('back')}</span>
        </div>
      </Link>
      <FaucetInfo faucet={faucet} />
      <div className="body-xs pt-[.75rem] leading-[160%] text-neutral-rich-gray">
        <p>{t('faucets.wantToDonate')}</p>
        <p className="mt-[0.5rem]">
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
