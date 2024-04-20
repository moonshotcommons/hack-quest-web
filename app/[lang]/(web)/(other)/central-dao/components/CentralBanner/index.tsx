import React from 'react';
import BannerBg from '@/public/images/hackathon/banner_bg.png';
import BannerCover from '@/public/images/hackathon/banner_cover.png';
import DaoLogo from '@/public/images/hackathon/dao_logo.png';
import HackLogo from '@/public/images/hackathon/hack_logo.svg';
import Button from '@/components/Common/Button';
import DiscordIcon from '@/components/Common/Icon/Discord';
import Image from 'next/image';
import Link from 'next/link';
import { HACKQUEST_DISCORD } from '@/constants/links';

interface CentralBannerProp {}

const CentralBanner: React.FC<CentralBannerProp> = () => {
  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(${BannerBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className="absolute right-0 top-0 h-[820px] w-[828px] "
        style={{
          backgroundImage: `url(${BannerCover.src})`,
          backgroundSize: '100% 100%'
        }}
      ></div>
      <div className="container relative z-[2] mx-auto pb-[65px] pt-[120px]">
        <h1 className="text-[72px] font-bold uppercase leading-[110%] text-neutral-white">
          decentralized <br /> future hackathon
        </h1>
        <h2 className="mt-[12px] text-[28px] text-neutral-off-white">Web3 Programming for everyone</h2>
        <div className="my-[60px] flex gap-[40px] text-[24px] font-[500] text-neutral-white">
          <div>
            <p className="text-[16px] font-[300] uppercase text-neutral-light-gray">TIME</p>
            <p>Apr 15 - May 10, 2024</p>
          </div>
          <div>
            <p className="text-[16px] font-[300] uppercase text-neutral-light-gray">LOCATION</p>
            <p>India</p>
          </div>
          <div>
            <p className="text-[16px] font-[300] uppercase text-neutral-light-gray">APPLICATION CLOSES IN</p>
            <p>Apr 1, 2024</p>
          </div>
        </div>
        <div className="flex gap-[20px]">
          <Link href={HACKQUEST_DISCORD} target="_blank">
            <Button className="button-text-l h-[60px] w-[270px] bg-[#C418A8] uppercase text-neutral-white">
              apply
            </Button>
          </Link>

          <Link href={HACKQUEST_DISCORD} target="_blank">
            <Button
              className="button-text-l h-[60px] w-[270px] border-[2px] border-[rgba(255,255,255,0.5)] p-0  uppercase text-neutral-white"
              icon={<DiscordIcon color={'white'} />}
              iconPosition="right"
            >
              Follow discord
            </Button>
          </Link>
        </div>
        <div className="mt-[137px] flex items-center gap-[40px]">
          <div className="flex-center h-[37px] w-[126px] border border-neutral-white text-[18px] font-[500] text-neutral-white">
            CO-HOST
          </div>
          <Image src={HackLogo} width={139} alt="hackquest-logo" />
          <Image src={DaoLogo} width={139} alt="central-logo" />
        </div>
      </div>
    </div>
  );
};

export default CentralBanner;
