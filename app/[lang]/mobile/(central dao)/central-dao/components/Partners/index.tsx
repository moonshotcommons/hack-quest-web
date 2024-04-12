import React from 'react';
import Image from 'next/image';
import CentralTitle from '../CentralTitle';
import { partnersData } from '@/app/[lang]/(web)/(central dao)/central-dao/constants/data';
interface PartnersProp {}

const Partners: React.FC<PartnersProp> = () => {
  return (
    <div>
      <CentralTitle title="Partners" />
      <div className="flex flex-wrap gap-x-[1rem] gap-y-[1.5rem]">
        {partnersData.map((v, i) => (
          <div
            key={i}
            className="flex-center h-[4.4375rem] w-[calc((100%-1rem)/2)] rounded-[5rem] border border-neutral-light-gray bg-[rgba(255,255,255,0.2)] p-[.625rem]"
          >
            <Image src={v} width={110} alt="artners-avatar" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
