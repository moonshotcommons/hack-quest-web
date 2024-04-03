import React, { useContext } from 'react';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { titleTxtData } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/data';

interface TractionsProp {}

const Tractions: React.FC<TractionsProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="px-[1.25rem]">
      <p className="text-h3-mob text-neutral-off-black">{t(titleTxtData[6])}</p>
      <ul className="body-s w-full list-disc pl-[1.25rem] text-neutral-rich-gray [&>li]:mt-[1.25rem]">
        <li>{t('tractionsText1')}</li>
        <li>{t('tractionsText2')}</li>
        <li>{t('tractionsText3')}</li>
        <li>{t('tractionsText4')}</li>
      </ul>
    </div>
  );
};

export default Tractions;
