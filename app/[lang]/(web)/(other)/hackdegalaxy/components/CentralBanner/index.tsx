import React from 'react';
import BannerBg from '@/public/images/hackathon/banner_bg.png';
import BannerCover from '@/public/images/hackathon/banner_cover.png';
import DaoLogo from '@/public/images/hackathon/dao_logo.png';
import HackLogo from '@/public/images/hackathon/hack_logo.svg';
import Button from '@/components/Common/Button';
import DiscordIcon from '@/components/Common/Icon/Discord';
import Image from 'next/image';
import Link from 'next/link';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import { applyLink, closeInTime, discordLink, endTime, startTime, tagline, twitterLink } from '../../constants/data';
import moment from 'moment';

interface CentralBannerProp {}

const CentralBanner: React.FC<CentralBannerProp> = () => {
  return (
    <div
      className="relative h-full"
      style={{
        backgroundImage: `url(${BannerBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container relative z-[2] mx-auto flex h-full flex-col justify-between pb-[65px] pt-[120px]">
        <Image
          src={BannerCover}
          width={660}
          alt="central-dao-cover"
          className="absolute right-[0] top-[62px] "
          priority
        ></Image>
        <div>
          <h1 className="text-[72px] font-bold uppercase leading-[110%] text-neutral-white">Hack DeGalaxy</h1>
          <h2 className="mt-[12px] text-[28px] text-neutral-off-white">{tagline}</h2>
          <div className="my-[60px] flex gap-[40px] text-[24px] font-[500] text-neutral-white">
            <div>
              <p className="text-[16px] font-[300] uppercase text-neutral-light-gray">TIME</p>
              <p>{`${moment(startTime).format('ll')} - ${moment(endTime).format('ll')}`}</p>
            </div>
            <div>
              <p className="text-[16px] font-[300] uppercase text-neutral-light-gray">LOCATION</p>
              <p>India</p>
            </div>
            <div>
              <p className="text-[16px] font-[300] uppercase text-neutral-light-gray">APPLICATION CLOSES IN</p>
              <p>{moment(closeInTime).format('ll')}</p>
            </div>
          </div>
          <div className="flex w-[612px] flex-col gap-[20px]">
            <Link href={applyLink} target="_blank">
              <Button
                className="button-text-l h-[60px] w-[612px]  uppercase text-neutral-white"
                style={{
                  background: 'linear-gradient(90deg, #6A5DFF 0%, #9A9CFF 100%)'
                }}
              >
                Apply
              </Button>
            </Link>
            <div className="flex justify-between">
              <Link href={discordLink} target="_blank">
                <Button
                  className="button-text-l h-[60px] w-[296px] border-[2px] border-[rgba(255,255,255,0.5)] bg-[rgba(0,0,0,0.5)] p-0  uppercase text-neutral-white"
                  icon={<DiscordIcon color={'white'} />}
                  iconPosition="right"
                >
                  Follow discord
                </Button>
              </Link>
              <Link href={twitterLink} target="_blank">
                <Button
                  className="button-text-l h-[60px] w-[296px] border-[2px] border-[rgba(255,255,255,0.5)] bg-[rgba(0,0,0,0.5)] p-0  uppercase text-neutral-white"
                  icon={<TwitterIcon color={'white'} />}
                  iconPosition="right"
                >
                  Follow x
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[40px]">
          <div className="flex-center h-[37px] w-[126px] border border-neutral-white text-[18px] font-[500] text-neutral-white">
            CO-HOST
          </div>
          <Image src={HackLogo} width={139} alt="hackquest-logo" />
          <Image src={DaoLogo} width={120} alt="central-logo" />
        </div>
      </div>
    </div>
  );
};

export default CentralBanner;
