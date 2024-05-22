import MedalIcon from '@/components/Common/Icon/MedalIcon';
import React from 'react';
import { GoArrowRight } from 'react-icons/go';

interface EcoCardProp {}

const EcoCard: React.FC<EcoCardProp> = () => {
  return (
    <div className="card-hover flex h-[365px] flex-col items-center justify-between rounded-[16px] bg-neutral-white p-[32px]">
      <div className="flex flex-col items-center gap-[32px]">
        <div className="relative h-[80px] w-[80px] overflow-hidden">
          {/* <Image src={} alt={} fill className='object-contain' /> */}
        </div>
        <div className="flex flex-col items-center gap-[16px]">
          <h2 className="body-xl-bold text-neutral-black">Ethereum Developer</h2>
          <p className="body-s line-clamp-2  text-neutral-medium-gray">
            Solana is the fastest Layer1 blockchain using Proof of History
          </p>
          <div className="flex flex-wrap justify-center gap-[8px]">
            <div className="caption-12pt flex h-[24px] items-center gap-[4px] rounded-[20px] border-[0.5px] border-neutral-rich-gray px-[12px] text-neutral-rich-gray">
              <MedalIcon />
              <span>Certified Learning Track</span>
            </div>
            <div className="caption-12pt flex h-[24px] items-center gap-[4px] rounded-[20px] border-[0.5px] border-neutral-rich-gray px-[12px] text-neutral-rich-gray">
              <span>Rust</span>
            </div>
            <div className="caption-12pt flex h-[24px] items-center gap-[4px] rounded-[20px] border-[0.5px] border-neutral-rich-gray px-[12px] text-neutral-rich-gray">
              <span>15 Projects</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <GoArrowRight size={24} />
      </div>
    </div>
  );
};

export default EcoCard;
