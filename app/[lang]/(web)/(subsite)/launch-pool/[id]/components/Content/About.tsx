import React, { useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';

interface AboutProp {}

const About: React.FC<AboutProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div>
      <p className="text-h3 text-neutral-off-black">{t(titleTxtData[3])}</p>
      <p className="body-l mt-[24px] text-neutral-rich-gray">{t('aboutText')}</p>
    </div>
  );
};

export default About;
