import React, { useContext } from 'react';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { titleTxtData } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/data';

interface DemoVideoProp {}

const DemoVideo: React.FC<DemoVideoProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="">
      <p className="text-h3-mob px-[1.25rem] text-neutral-off-black">{t(titleTxtData[4])}</p>
      <video controls className="mt-[1.25rem] w-full">
        {/* <source src={project.video}></source> */}
      </video>
      <p className="caption-12pt mt-[.75rem] text-center text-neutral-rich-gray">{t('demoVideoText')}</p>
    </div>
  );
};

export default DemoVideo;
