import MenuLink from '@/constants/MenuLink';
import { FaucetType } from '@/service/webApi/resourceStation/type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface FaucetCardProp {
  faucet: FaucetType;
}

const FaucetCard: React.FC<FaucetCardProp> = ({ faucet }) => {
  return (
    <Link
      href={`${MenuLink.FAUCETS}/${faucet.chainId}`}
      className="card-hover flex h-[90px] w-full items-center overflow-hidden rounded-[12px] bg-neutral-white px-[8px] py-[12px] text-neutral-off-black"
    >
      <div className="flex-center h-full w-[64px]">
        <div className="relative h-[48px] w-[48px] overflow-hidden">
          <Image src={faucet.thumbnail} alt={faucet.name} fill className="object-cover"></Image>
        </div>
      </div>
      <div className="flex h-full flex-1 flex-shrink-0 flex-col justify-between px-[12px]">
        <h2 className="body-m-bold line-clamp-1 w-full">{faucet.name}</h2>
        <div className="flex gap-[16px]">
          <div className="flex-1 flex-shrink-0">
            <p className="caption-12pt text-neutral-rich-gray">Faucet</p>
            <p className="body-xs ">Drips {`${Number(faucet.amount).toFixed(3)} ${faucet.symbol}`}</p>
          </div>
          <div className="flex-1 flex-shrink-0">
            <p className="caption-12pt text-neutral-rich-gray">Stash</p>
            <p className="body-xs ">{`${Number(faucet.balance).toFixed(3)} ${faucet.symbol}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FaucetCard;
