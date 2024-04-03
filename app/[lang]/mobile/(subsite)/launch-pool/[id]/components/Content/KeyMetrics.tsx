import React, { useContext } from 'react';
import { separationNumber } from '@/helper/utils';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { titleTxtData } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/data';

interface KeyMetricsProp {}

const KeyMetrics: React.FC<KeyMetricsProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="px-[1.25rem]">
      <p className="text-h3-mob text-neutral-off-black">{t(titleTxtData[5])}</p>
      <div className="body-m text-neutral-medium-gray [&>div]:flex [&>div]:justify-between [&>div]:border-b [&>div]:border-neutral-light-gray [&>div]:py-[1.25rem]">
        <div>
          <div>{t('blockchainNetwork')}</div>
          <div className="body-m-bold text-neutral-off-black">Ethereum</div>
        </div>
        <div>
          <div>{t('initialMarketCap')}</div>
          <div className="body-m-bold text-neutral-off-black">{`$${separationNumber(850000)}`}</div>
        </div>
        <div>
          <div>{t('totalTokenSupply')}</div>
          <div className="body-m-bold text-neutral-off-black">{`${separationNumber(999999999999)}`}</div>
        </div>
        <div>
          <div>{t('projectValuation')}</div>
          <div className="body-m-bold text-neutral-off-black">{`$${separationNumber(10000000)}`}</div>
        </div>
        <div>
          <div>{t('airdropShare')}</div>
          <div className="body-m-bold text-neutral-off-black">{`${1}% / ${separationNumber(100000)}`}</div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
