import { FaucetType } from '@/service/webApi/resourceStation/type';
import React from 'react';

interface HeaderProp {
  faucet: FaucetType;
}

const Header: React.FC<HeaderProp> = ({ faucet }) => {
  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className=" flex items-center gap-[16px]">
        <div className="relative h-[48px] w-[48px] overflow-hidden">
          {/* <Image src={faucet.thumbnail} alt={faucet.name} fill className="object-cover" /> */}
          <img src={faucet.thumbnail} alt={faucet.name} className="object-cover" />
        </div>
        <h1 className="text-h2">{faucet.name}</h1>
      </div>
      <div className="body-m flex gap-[15px] text-neutral-rich-gray">
        <span>Dripping {`${faucet.amount} ${faucet.symbol}`} per day</span>
        <div className="h-[26px] w-[0.5px] bg-neutral-rich-gray"></div>
        <span>Current Balance: {`${faucet.balance} ${faucet.symbol}`}</span>
      </div>
    </div>
  );
};

export default Header;
