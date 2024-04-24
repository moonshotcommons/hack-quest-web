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
    <div className="font-Poppins text-[.875rem] text-neutral-off-white">
      <CentralBanner />
      {/* <div className="flex flex-col gap-[4.5rem] px-[1.25rem] pt-[4.5rem]">
        <Count />
        <Degalaxy />
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
