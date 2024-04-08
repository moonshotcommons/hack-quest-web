import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { eventsExploreLinkData } from '../../constants/data';
import { BsArrowRightShort } from 'react-icons/bs';
interface ExploreMoreProp {}

const ExploreMore: React.FC<ExploreMoreProp> = () => {
  return (
    <div className="container mx-auto mt-[100px]">
      <div className="mb-[60px] text-center">
        <p className="text-h2 mb-[12px] text-neutral-off-black">Explore More 🔍</p>
        <p className="body-m text-neutral-medium-gray">
          Like our events and what we do? Check out more ways to engage with our Web3 community!
        </p>
      </div>
      <div className="flex gap-[40px]">
        {eventsExploreLinkData.map((v) => (
          <Link key={v.id} href={v.path} className="flex-1 flex-shrink-0 ">
            <div className="flex w-full items-center justify-between rounded-[16px] bg-neutral-white p-[24px]">
              <div className="body-xl-bold flex items-center gap-[32px] text-neutral-off-black">
                <Image src={v.img} width={64} alt={v.label} />
                <span>{v.label}</span>
              </div>
              <BsArrowRightShort size={32} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
