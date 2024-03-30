import React, { useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';

interface TractionsProp {}

const Tractions: React.FC<TractionsProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div>
      <p className="text-h3 text-neutral-off-black">{t(titleTxtData[6])}</p>
      <ul className="body-xl w-full list-disc pl-[20px] text-neutral-off-black [&>li]:mt-[24px]">
        <li>{t('tractionsText1')}</li>
        <li>{t('tractionsText2')}</li>
        <li>{t('tractionsText3')}</li>
        <li>{t('tractionsText4')}</li>
      </ul>
    </div>
  );
};

export default Tractions;
