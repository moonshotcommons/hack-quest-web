import MenuLink from '@/constants/MenuLink';
import Link from 'next/link';
import React from 'react';

interface FaucetCardProp {
  // faucet: FaucetType;
  faucet: any;
}

const FaucetCard: React.FC<FaucetCardProp> = ({ faucet }) => {
  return (
    <Link
      href={`${MenuLink.FAUCETS}/1`}
      className="card-hover flex h-[90px] w-full items-center overflow-hidden rounded-[12px] bg-neutral-white px-[8px] py-[12px] text-neutral-off-black"
    >
      <div className="flex-center h-full w-[64px]">
        <div className="relative h-[48px] w-[48px] overflow-hidden">
          {/* <Image src={} alt={} fill className='object-cover'></Image> */}
        </div>
      </div>
      <div className="flex h-full flex-1 flex-shrink-0 flex-col justify-between px-[12px]">
        <h2 className="body-m-bold line-clamp-1 w-full">Arbitrum Sepolia</h2>
        <div className="flex gap-[16px]">
          <div className="flex-1 flex-shrink-0">
            <p className="caption-12pt text-neutral-rich-gray">Faucet</p>
            <p className="body-xs ">Drips 0.01 bsETH</p>
          </div>
          <div className="flex-1 flex-shrink-0">
            <p className="caption-12pt text-neutral-rich-gray">Stash</p>
            <p className="body-xs ">7573.30 hETH</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FaucetCard;
