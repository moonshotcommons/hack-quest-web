import TrackTag from '@/components/Common/TrackTag';
import { Lang } from '@/i18n/config';
import Image from 'next/image';
import React from 'react';
import { EcosystemDetailType } from '@/service/webApi/ecosystem/type';
import Enroll from './Enroll';

interface BannerProp {
  lang: Lang;
  ecosystem: EcosystemDetailType;
}

const Banner: React.FC<BannerProp> = ({ lang, ecosystem }) => {
  return (
    <div className="bg-neutral-white px-[1.25rem] py-[1.5rem]">
      <div className="relative mb-[2rem] h-[4rem] w-[7.5rem] overflow-hidden">
        <Image src={ecosystem?.info?.image} alt={ecosystem?.info?.name} fill className="object-contain" />
      </div>
      <h1 className="text-h2-mob text-neutral-black">{ecosystem?.info?.name}</h1>
      <p className="body-s  mt-[.5rem] text-neutral-medium-gray">{ecosystem?.info?.description}</p>
      <div className="mt-[.75rem] flex flex-wrap gap-[.5rem]">
        {ecosystem?.info?.tags?.map((v) => <TrackTag key={v} track={v} />)}
      </div>
      <div className="fixed bottom-[1.875rem] left-0 z-[9] w-full px-[1.25rem]">
        <Enroll lang={lang} ecosystem={ecosystem} />
      </div>
    </div>
  );
};

export default Banner;
