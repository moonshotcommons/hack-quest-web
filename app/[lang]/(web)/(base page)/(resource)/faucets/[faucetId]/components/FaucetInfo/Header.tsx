import { FaucetType } from '@/service/webApi/resourceStation/type';
import React from 'react';

interface HeaderProp {
  faucet?: FaucetType;
}

const Header: React.FC<HeaderProp> = ({ faucet }) => {
  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className=" flex items-center gap-[16px]">
        <div className="relative h-[48px] w-[48px] overflow-hidden">
          {/* <Image src={} alt={} fill className='object-cover' /> */}
        </div>
        <h1 className="text-h2">Arbitrum Sepolia Faucet</h1>
      </div>
      <div className="body-m flex gap-[15px] text-neutral-rich-gray">
        <span>Dripping 0.01 arbETH per day</span>
        <div className="h-[26px] w-[0.5px] bg-neutral-rich-gray"></div>
        <span>Current Balance: 0.50 arbETH</span>
      </div>
    </div>
  );
};

export default Header;
