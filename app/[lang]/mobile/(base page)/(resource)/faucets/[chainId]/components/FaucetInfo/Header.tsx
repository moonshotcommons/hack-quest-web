import { FaucetType } from '@/service/webApi/resourceStation/type';
import Image from 'next/image';
import React from 'react';

interface HeaderProp {
  faucet: FaucetType;
}

const Header: React.FC<HeaderProp> = ({ faucet }) => {
  return (
    <div className="flex flex-col items-center gap-[.625rem]">
      <div className=" flex items-center gap-[.5rem]">
        <div className="relative h-[2rem] w-[2rem] overflow-hidden">
          <Image src={faucet.thumbnail} alt={faucet.name} fill className="object-cover" />
        </div>
        <h1 className="text-h2-mob">{faucet.name}</h1>
      </div>
      <div className="body-xs flex gap-[.5rem] text-neutral-rich-gray">
        <span>Dripping {`${faucet.amount} ${faucet.symbol}`} per day</span>
        <div className="h-[1.1875rem] w-[0.5px] bg-neutral-rich-gray"></div>
        <span>Current Balance: {`${faucet.balance} ${faucet.symbol}`}</span>
      </div>
    </div>
  );
};

export default Header;
