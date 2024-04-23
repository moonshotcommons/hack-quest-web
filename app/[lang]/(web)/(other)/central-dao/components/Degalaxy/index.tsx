import Image from 'next/image';
import React from 'react';
import DegalaxyCover from '@/public/images/hackathon/degalaxy_cover.png';
import { degalaxyData } from '../../constants/data';

interface DegalaxyProp {}

const Degalaxy: React.FC<DegalaxyProp> = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-[81%] gap-[48px]">
        <div className="w-[366px] flex-shrink-0">
          <p className="text-[36px] font-bold uppercase leading-[110%]">why participate in hack degalaxy</p>
          <Image src={DegalaxyCover} width={127} alt="degalaxy_cover" className="ml-[24px] mt-[7px]"></Image>
        </div>
        <div className="flex flex-1 flex-wrap gap-x-[24px] gap-y-[48px]">
          {degalaxyData.map((v, i) => (
            <div key={i} className="flex items-start gap-[16px]">
              <Image src={v.img} width={60} alt={v.name}></Image>
              <div className="w-[240px]">
                <p className="text-[18px] leading-[110%] text-neutral-white">{v.name}</p>
                <p className="mt-[8px] text-[14px] font-[300] leading-[110%] text-neutral-light-gray">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Degalaxy;
