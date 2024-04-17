import React from 'react';
import CentralTitle from '../CentralTitle';
import Image from 'next/image';
import { judgesData } from '@/app/[lang]/(web)/(other)/central-dao/constants/data';

interface JudgesProp {}

const Judges: React.FC<JudgesProp> = () => {
  return (
    <div>
      <CentralTitle title="Judges" />
      <div className="flex  flex-col gap-[1.25rem]">
        {judgesData.map((v, i) => (
          <div
            key={i}
            className="flex h-[5.0625rem]  items-center gap-[1rem] rounded-[6.25rem] border border-neutral-light-gray bg-[rgba(255,255,255,0.1)] p-[.5rem] text-[.875rem]"
          >
            <div className="relative h-[4.0625rem] w-[4.0625rem] flex-shrink-0 overflow-hidden rounded-[50%]">
              <Image src={v.avatar} fill alt={v.name} className="object-cover" />
            </div>
            <div className="flex h-full flex-col justify-center ">
              <p className="truncate font-bold leading-[160%]">{v.name}</p>
              <p className="line-clamp-2 text-[.75rem] leading-[160%] text-neutral-light-gray">{v.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Judges;
