import React from 'react';
import Image from 'next/image';
import BIcon from '@/public/images/campaigns/b_icon.png';
interface ProgressProp {}

const Progress: React.FC<ProgressProp> = () => {
  return (
    <div>
      <div>0</div>
      <div className="flex gap-[0.5%] relative">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-[19.6%]">
            <div className="w-full h-[15px] bg-[#DADADA] mb-[14px]">
              <div
                className="h-[15px] bg-[#ffd850] shadow-[0_0_8px_#ffd850]"
                style={{
                  width: '20%'
                }}
              ></div>
            </div>
            <div className="text-right">{(i + 1) * 100}</div>
          </div>
        ))}
        <Image
          src={BIcon}
          width={24}
          alt="icon"
          className="absolute left-0 bottom-0"
        ></Image>
      </div>
    </div>
  );
};

export default Progress;
