import React, { useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';

interface DemoVideoProp {}

const DemoVideo: React.FC<DemoVideoProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div>
      <p className="text-h3 text-neutral-off-black">{t(titleTxtData[4])}</p>
      <video controls className="mt-[24px] w-full rounded-[20px]">
        {/* <source src={project.video}></source> */}
      </video>
      <p className="caption-14pt mt-[12px] text-center text-neutral-rich-gray">
        {t('demoVideoText')}
      </p>
    </div>
  );
};

export default DemoVideo;
