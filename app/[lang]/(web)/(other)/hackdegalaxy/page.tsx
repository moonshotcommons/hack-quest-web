import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import { Metadata } from 'next';
import React from 'react';
import CentralBanner from './components/CentralBanner';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.HACKDEGALAXY}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKDEGALAXY}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKDEGALAXY}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKDEGALAXY}`
      }
    }
  };
}

interface CentralDaoProp {}

const CentralDao: React.FC<CentralDaoProp> = () => {
  return (
    <div className="h-[100vh] font-Poppins text-[16px] text-neutral-off-white">
      <CentralBanner />
      {/* <div className="container mx-auto flex flex-col gap-[120px]">
        <Count />
        <Degalaxy />
      </div>

      <div className="mx-auto flex w-[808px] flex-col gap-[120px] pt-[120px]">
        <Introduction />
        <PrizeTrack />
        <Schedule />
        <Judges />
        <Partners />
      </div> */}
    </div>
  );
};

export default CentralDao;
