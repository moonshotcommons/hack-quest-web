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
      className="card-hover flex flex-col gap-[1rem] rounded-[1rem] bg-neutral-white p-[1rem]"
    >
      <div className="relative h-[4rem] w-[4rem] overflow-hidden">
        <Image src={ecosystem.image} alt={ecosystem.name} fill className="object-contain" />
      </div>
      <div className="flex flex-col gap-[.75rem]">
        <h2 className="body-l-bold text-neutral-black">{ecosystem.name}</h2>
        <div className="flex flex-wrap  gap-[.5rem]">
          <TrackTag track={ecosystem.language} />
          {/* <TrackTag track={`${ecosystem.projectCount ?? 0} ${ecosystem.projectCount > 1 ? 'Projects' : 'Project'}`} /> */}
        </div>
        <p className="body-s line-clamp-2  text-neutral-medium-gray">{ecosystem.description}</p>
      </div>
      <GoArrowRight size={18} />
    </Link>
  );
};

export default EcoCard;
