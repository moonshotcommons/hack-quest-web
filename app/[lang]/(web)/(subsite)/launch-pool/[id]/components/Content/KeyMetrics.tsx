import React, { useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import { separationNumber } from '@/helper/utils';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';

interface KeyMetricsProp {}

const KeyMetrics: React.FC<KeyMetricsProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div>
      <p className="text-h3 text-neutral-off-black">{t(titleTxtData[5])}</p>
      <div className="body-xl text-neutral-medium-gray [&>div]:flex [&>div]:justify-between [&>div]:border-b [&>div]:border-neutral-light-gray [&>div]:py-[24px]">
        <div>
          <div>{t('blockchainNetwork')}</div>
          <div className="text-body-xl-bold text-neutral-off-black">Ethereum</div>
        </div>
        <div>
          <div>{t('initialMarketCap')}</div>
          <div className="text-body-xl-bold text-neutral-off-black">{`$${separationNumber(850000)}`}</div>
        </div>
        <div>
          <div>{t('totalTokenSupply')}</div>
          <div className="text-body-xl-bold text-neutral-off-black">{`${separationNumber(999999999999)}`}</div>
        </div>
        <div>
          <div>{t('projectValuation')}</div>
          <div className="text-body-xl-bold text-neutral-off-black">{`$${separationNumber(10000000)}`}</div>
        </div>
        <div>
          <div>{t('airdropShare')}</div>
          <div className="text-body-xl-bold text-neutral-off-black">{`${1}% / ${separationNumber(100000)}`}</div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
