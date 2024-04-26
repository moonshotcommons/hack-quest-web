import Button from '@/components/Common/Button';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import PartnersCover from '@/public/images/resource/partners_cover_mobile.png';
import Image from 'next/image';

interface PartnersBannerProp {
  lang: Lang;
}

const PartnersBanner: React.FC<PartnersBannerProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="flex flex-col items-center bg-neutral-black  py-[2.5rem]">
      <h1 className="text-h1-mob  mb-[3rem] px-[1.25rem] text-neutral-white">{t('partners.title')}</h1>
      <h2 className="body-m mb-[3rem] px-[1.25rem] text-center text-neutral-light-gray">{t('partners.subTitle')}</h2>
      <Button type="primary" className="button-text-m mb-[3rem] h-[3rem] w-[15rem] uppercase text-neutral-black">
        {t('partners.becomeOurPartner')}
      </Button>
      <div className="relative h-0 w-full overflow-hidden pt-[56.75%]">
        <Image src={PartnersCover} alt="partner-cover" fill className="object-cover" />
      </div>
    </div>
  );
};

export default PartnersBanner;
