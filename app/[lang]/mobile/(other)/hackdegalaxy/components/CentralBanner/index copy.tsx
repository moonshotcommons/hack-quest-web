import React from 'react';
import BannerBg from '@/public/images/hackathon/mobile_banner_bg.png';
import Button from '@/components/Common/Button';
import DiscordIcon from '@/components/Common/Icon/Discord';
import Link from 'next/link';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import DaoLogo from '@/public/images/hackathon/dao_logo.png';
import HackLogo from '@/public/images/hackathon/hack_logo.svg';
import Image from 'next/image';
import {
  applyLink,
  closeInTime,
  discordLink,
  endTime,
  startTime,
  tagline,
  twitterLink
} from '@/app/[lang]/(web)/(other)/hackdegalaxy/constants/data';
import moment from 'moment';

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
      <div className="flex  flex-col gap-[2.5rem] px-[1.25rem] py-[2.5rem]">
        <div>
          <h1 className="text-[2.25rem] font-bold uppercase leading-[110%] text-neutral-white">
            decentralized <br /> future <br /> hackathon
          </h1>
          <h2 className="mt-[.75rem] text-[.875rem] text-neutral-off-white">{tagline}</h2>
        </div>

        <div className=" flex flex-col gap-[.75rem] text-[1rem] font-[500] text-neutral-white">
          <div>
            <p className="text-[.875rem] font-[300] uppercase text-neutral-light-gray">TIME</p>
            <p>{`${moment(startTime).format('ll')} - ${moment(endTime).format('ll')}`}</p>
          </div>
          <div>
            <p className="text-[.875rem] font-[300] uppercase text-neutral-light-gray">LOCATION</p>
            <p>India</p>
          </div>
          <div>
            <p className="text-[.875rem] font-[300] uppercase text-neutral-light-gray">APPLICATION CLOSES IN</p>
            <p>{moment(closeInTime).format('ll')}</p>
          </div>
        </div>
        <div className="flex flex-col gap-[1rem]">
          <Link href={applyLink} target="_blank">
            <Button
              className="button-text-l h-[3.75rem] w-[16.875rem]  uppercase text-neutral-white"
              style={{
                background: 'linear-gradient(90deg, #6A5DFF 0%, #9A9CFF 100%)'
              }}
            >
              apply
            </Button>
          </Link>

          <Link href={discordLink} target="_blank">
            <Button
              className="button-text-l h-[3.75rem] w-[16.875rem] border-[.125rem] border-[rgba(255,255,255,0.5)] bg-[rgba(0,0,0,0.5)] p-0  uppercase text-neutral-white"
              icon={<DiscordIcon color={'white'} isMobile={true} />}
              iconPosition="right"
            >
              Follow discord
            </Button>
          </Link>

          <Link href={twitterLink} target="_blank">
            <Button
              className="button-text-l h-[3.75rem] w-[16.875rem] border-[.125rem] border-[rgba(255,255,255,0.5)] bg-[rgba(0,0,0,0.5)] p-0  uppercase text-neutral-white"
              icon={<TwitterIcon color={'white'} isMobile={true} />}
              iconPosition="right"
            >
              Follow x
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-[1.5rem]">
          <div className="flex-center border border-neutral-white px-[.5rem] py-[.25rem] text-[.75rem] font-[500] text-neutral-white">
            CO-HOST
          </div>
          <Image src={HackLogo} width={91} alt="hackquest-logo" />
          <Image src={DaoLogo} width={66} alt="central-logo" />
        </div>
      </div>
    </div>
  );
};

export default CentralBanner;
