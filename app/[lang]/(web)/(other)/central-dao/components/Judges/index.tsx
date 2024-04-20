import React from 'react';
import CentralTitle from '../CentralTitle';
import { judgesData } from '../../constants/data';
import Image from 'next/image';

interface JudgesProp {}

const Judges: React.FC<JudgesProp> = () => {
  return (
    <div>
      <CentralTitle title="Judges" />
      <div className="flex flex-wrap gap-[24px]">
        {judgesData.map((v, i) => (
          <div
            key={i}
            className="flex h-[81px] w-[calc((100%-24px)/2)] items-center gap-[16px] rounded-[100px] border border-neutral-light-gray bg-[rgba(255,255,255,0.1)] p-[8px] text-[16px]"
          >
            <div className="relative h-[65px] w-[65px] flex-shrink-0 overflow-hidden rounded-[50%]">
              <Image src={v.avatar} fill alt={v.name} className="object-cover" />
            </div>
            <div className="flex h-full flex-col justify-center ">
              <p className="truncate font-bold leading-[160%]">{v.name}</p>
              <p className="line-clamp-2 text-[12px] leading-[160%] text-neutral-light-gray">{v.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Judges;
