import TrackTag from '@/components/Common/TrackTag';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
// import Image from 'next/image';
import React from 'react';
import Enroll from './Enroll';

interface BannerProp {
  lang: Lang;
}

const Banner: React.FC<BannerProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LEARN);
  return (
    <div className="bg-neutral-white">
      <div className="container mx-auto flex items-center justify-between gap-[40px] py-[80px]">
        <div className="flex items-center gap-[32px]">
          <div className="relative h-[120px] w-[120px] flex-shrink-0 overflow-auto">
            {/* <Image src={} alt={} fill className="object-cover" /> */}
          </div>
          <div>
            <h1 className="text-h2 text-neutral-black">Solana Ecosystem</h1>
            <p className="body-m mt-[8px] text-neutral-off-black">
              Solana is the fastest Layer1 blockchain using Proof of History
            </p>
            <div className="mt-[24px] flex flex-1 flex-wrap gap-[8px]">
              <TrackTag track="DEFI" />
              <TrackTag track="DEFI" />
              <TrackTag track="DEFI" />
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Enroll lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
