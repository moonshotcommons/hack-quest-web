import TrackTag from '@/components/Common/TrackTag';
import { Lang } from '@/i18n/config';
import Image from 'next/image';
import React from 'react';
import Enroll from './Enroll';
import { EcosystemDetailType } from '@/service/webApi/ecosystem/type';

interface BannerProp {
  lang: Lang;
  ecosystem: EcosystemDetailType;
}

const Banner: React.FC<BannerProp> = ({ lang, ecosystem }) => {
  return (
    <div className="bg-neutral-white">
      <div className="container mx-auto flex items-center justify-between gap-[32px] py-[80px]">
        <div className="flex items-center gap-[32px]">
          <div className="relative h-[120px] w-[120px] flex-shrink-0 overflow-auto">
            <Image src={ecosystem?.info?.image} alt={ecosystem?.info?.name} fill className="object-contain" />
          </div>
          <div>
            <h1 className="text-h2 text-neutral-black">{ecosystem?.info?.name}</h1>
            <p className="body-m mt-[8px] text-neutral-off-black">{ecosystem?.info?.description}</p>
            <div className="mt-[24px] flex flex-1 flex-wrap gap-[8px]">
              {ecosystem?.info?.tags?.map((v) => <TrackTag key={v} track={v} />)}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Enroll lang={lang} ecosystem={ecosystem} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
