import React from 'react';
import BannerBg from '@/public/images/hackathon/mobile_banner_bg.png';
import Button from '@/components/Common/Button';
import DiscordIcon from '@/components/Common/Icon/Discord';
import Link from 'next/link';
import { HACKQUEST_DISCORD } from '@/constants/links';

interface CentralBannerProp {}

const CentralBanner: React.FC<CentralBannerProp> = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${BannerBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="px-[1.25rem]   pb-[10.1875rem] pt-[2.5rem]">
        <h1 className="text-[2.25rem] font-bold uppercase leading-[110%] text-neutral-white">
          decentralized future hackathon
        </h1>
        <h2 className="mt-[.75rem] text-[.875rem] text-neutral-off-white">Web3 Programming for everyone</h2>
        <div className="my-[2.5rem] flex flex-col gap-[.75rem] text-[1rem] font-[500] text-neutral-white">
          <div>
            <p className="text-[.875rem] font-[300] uppercase text-neutral-light-gray">TIME</p>
            <p>Apr 15 - May 10, 2024</p>
          </div>
          <div>
            <p className="text-[.875rem] font-[300] uppercase text-neutral-light-gray">LOCATION</p>
            <p>India</p>
          </div>
          <div>
            <p className="text-[.875rem] font-[300] uppercase text-neutral-light-gray">APPLICATION CLOSES IN</p>
            <p>Apr 1, 2024</p>
          </div>
        </div>
        <div className="flex flex-col gap-[1rem]">
          <Link href={HACKQUEST_DISCORD} target="_blank">
            <Button className="button-text-l h-[3.75rem] w-[16.875rem] bg-[#C418A8] uppercase text-neutral-white">
              apply
            </Button>
          </Link>

          <Link href={HACKQUEST_DISCORD} target="_blank">
            <Button
              className="button-text-l h-[3.75rem] w-[16.875rem] border-[.125rem] border-[rgba(255,255,255,0.5)] p-0  uppercase text-neutral-white"
              icon={<DiscordIcon color={'white'} />}
              iconPosition="right"
            >
              Follow discord
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CentralBanner;
