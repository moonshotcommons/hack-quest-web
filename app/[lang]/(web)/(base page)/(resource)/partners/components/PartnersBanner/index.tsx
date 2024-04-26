import Button from '@/components/Common/Button';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import PartnersCover from '@/public/images/resource/partners_cover.png';
import Image from 'next/image';

interface PartnersBannerProp {
  lang: Lang;
}

const PartnersBanner: React.FC<PartnersBannerProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="bg-neutral-black py-[80px]">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-h2  mb-[60px] text-neutral-white">{t('partners.title')}</h1>
        <h2 className="body-m mb-[60px] w-[514px] text-neutral-light-gray">{t('partners.subTitle')}</h2>
        <Button type="primary" className="button-text-l mb-[39px] h-[60px] w-[270px] uppercase text-neutral-black">
          {t('partners.becomeOurPartner')}
        </Button>
        <Image src={PartnersCover} alt="partner-cover" width={818} />
      </div>
    </div>
  );
};

export default PartnersBanner;
