import React from 'react';
import { countData } from '../../constants/data';
import CountUp from '@/components/Common/CountUp';

interface CountProp {}

const Count: React.FC<CountProp> = () => {
  return (
    <div className="my-[40px]  flex gap-[40px]">
      {countData.map((v, i) => (
        <div key={i} className="flex-1 flex-shrink-0 bg-[#454474] py-[40px] text-center text-neutral-off-white">
          <p className="text-[48px] font-bold leading-[110%] text-neutral-white">
            <CountUp start={0} end={v.count} duration={3} />+
          </p>
          <p className="my-[4px] text-[14px] font-bold">{v.label}</p>
          <p className="text-[12px] font-[300] leading-[12px]">{v.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Count;
