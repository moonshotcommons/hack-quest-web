import React from 'react';
import { partnersData } from '../../constants/data';
import Image from 'next/image';
import CentralTitle from '../CentralTitle';
interface PartnersProp {}

const Partners: React.FC<PartnersProp> = () => {
  return (
    <div>
      <CentralTitle title="Partners" />
      <div className="flex flex-wrap gap-x-[16px] gap-y-[24px]">
        {partnersData.map((v, i) => (
          <div
            key={i}
            className="flex-center h-[71px] w-[calc((100%-48px)/4)] rounded-[80px] border border-neutral-light-gray bg-[rgba(255,255,255,0.2)] p-[10px]"
          >
            <Image src={v} width={124} alt="artners-avatar" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
