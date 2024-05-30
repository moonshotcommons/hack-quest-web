// import MedalIcon from '@/components/Common/Icon/MedalIcon';
import BaseImage from '@/components/Common/BaseImage';
import TrackTag from '@/components/Common/TrackTag';
import MenuLink from '@/constants/MenuLink';
import { EcosystemType } from '@/service/webApi/ecosystem/type';
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
      className="card-hover group  flex h-full w-full flex-col items-center justify-between rounded-[16px] bg-neutral-white p-[32px] hover:bg-yellow-hover"
    >
      <div className="relative flex  flex-col gap-[32px]">
        <BaseImage
          className="h-[80px] w-[80px] transition-all duration-300 group-hover:opacity-0"
          src={ecosystem.image}
          alt={ecosystem.name}
          contain={true}
        />
        <div className="flex flex-col  gap-[16px] transition-all duration-300 group-hover:translate-y-[-80px]">
          <h2 className="body-xl-bold text-neutral-black">{ecosystem.name}</h2>
          <div className="flex flex-wrap gap-[8px]">
            <TrackTag track={ecosystem.language} />
            <TrackTag track={`${ecosystem.projectCount ?? 0} ${ecosystem.projectCount > 1 ? 'Projects' : 'Project'}`} />
          </div>
          <p className="body-s line-clamp-3  text-neutral-medium-gray">{ecosystem.description}</p>
        </div>
        <GoArrowRight
          size={24}
          className="absolute bottom-0 left-0 opacity-0 transition-all duration-300 group-hover:opacity-100"
        />
      </div>
    </Link>
  );
};

export default EcoCard;
