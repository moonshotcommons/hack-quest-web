// import MedalIcon from '@/components/Common/Icon/MedalIcon';
import TrackTag from '@/components/Common/TrackTag';
import MenuLink from '@/constants/MenuLink';
import { EcosystemType } from '@/service/webApi/ecosystem/type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GoArrowRight } from 'react-icons/go';

interface EcoCardProp {
  ecosystem: EcosystemType;
}

const EcoCard: React.FC<EcoCardProp> = ({ ecosystem }) => {
  return (
    <Link
      href={`${MenuLink.EXPLORE}/${ecosystem.id}`}
      className="card-hover flex h-[365px] flex-col items-center justify-between rounded-[16px] bg-neutral-white p-[32px]"
    >
      <div className="flex flex-col items-center gap-[32px]">
        <div className="relative h-[80px] w-[80px] overflow-hidden">
          <Image src={ecosystem.image} alt={ecosystem.name} fill className="object-contain" />
        </div>
        <div className="flex flex-col items-center gap-[16px]">
          <h2 className="body-xl-bold text-neutral-black">{ecosystem.name}</h2>
          <p className="body-s line-clamp-2  text-neutral-medium-gray">{ecosystem.description}</p>
          <div className="flex flex-wrap justify-center gap-[8px]">
            {/* <div className="caption-12pt flex h-[24px] items-center gap-[4px] rounded-[20px] border-[0.5px] border-neutral-rich-gray px-[12px] text-neutral-rich-gray">
              <MedalIcon />
              <span>Certified Learning Track</span>
            </div> */}
            {ecosystem.tags.map((v) => (
              <TrackTag key={v} track={v} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <GoArrowRight size={24} />
      </div>
    </Link>
  );
};

export default EcoCard;
