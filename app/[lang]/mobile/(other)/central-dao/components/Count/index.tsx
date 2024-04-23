import React from 'react';
import CountUp from '@/components/Common/CountUp';
import { countData } from '@/app/[lang]/(web)/(other)/central-dao/constants/data';

interface CountProp {}

const Count: React.FC<CountProp> = () => {
  return (
    <div className="my-[1.25rem]  flex flex-wrap gap-[1rem]">
      {countData.map((v, i) => (
        <div key={i} className="w-[calc((100%-1rem)/2)]  bg-[#454474] p-[1.25rem] text-center text-neutral-off-white">
          <p className="text-[2rem] font-bold leading-[110%] text-neutral-white">
            <CountUp start={0} end={v.count} duration={3} />+
          </p>
          <p className="my-[.25rem] text-[.75rem] font-bold">{v.label}</p>
          <p className="text-[.625rem] font-[300] leading-[.75rem]">{v.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Count;
