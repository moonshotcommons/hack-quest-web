import Image from 'next/image';
import React from 'react';
import DegalaxyCover from '@/public/images/hackathon/degalaxy_cover.png';
import { degalaxyData } from '@/app/[lang]/(web)/(other)/hackdegalaxy/constants/data';

interface DegalaxyProp {}

const Degalaxy: React.FC<DegalaxyProp> = () => {
  return (
    <div className="">
      <div className="mb-[3rem] flex items-end">
        <Image src={DegalaxyCover} width={131} alt="degalaxy_cover" className=""></Image>
        <p className="text-[1.5rem] font-bold uppercase leading-[110%]">
          why <br /> participate <br /> in hack degalaxy
        </p>
      </div>
      <div className="flex  flex-col gap-[2rem]">
        {degalaxyData.map((v, i) => (
          <div key={i} className="flex items-start gap-[1rem]">
            <Image src={v.img} width={60} alt={v.name}></Image>
            <div className="flex-1">
              <p className="text-[1rem] leading-[110%] text-neutral-white">{v.name}</p>
              <p className="mt-[.5rem] text-[.75rem] font-[300] leading-[110%] text-neutral-light-gray">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Degalaxy;
