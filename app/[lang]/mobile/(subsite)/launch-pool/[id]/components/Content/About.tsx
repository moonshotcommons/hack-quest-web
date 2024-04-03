import React, { useContext } from 'react';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { titleTxtData } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/data';

interface AboutProp {}

const About: React.FC<AboutProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="px-[1.25rem]">
      <p className="text-h3-mob text-neutral-off-black">{t(titleTxtData[3])}</p>
      <p className="body-s mt-[1.25rem] text-neutral-rich-gray">{t('aboutText')}</p>
    </div>
  );
};

export default About;
