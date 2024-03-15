import Image from 'next/image';
import React from 'react';
import LaunchImg from '@/public/images/launch/launch_frame.png';
import HackLogo from '@/public/images/logo/light-footer-logo.svg';
import { separationNumber } from '@/helper/utils';
import { MdArrowForwardIos } from 'react-icons/md';
import Button from '@/components/Common/Button';
import { linksIcon } from '../../constants/data';

interface OverViewProp {}

const OverView: React.FC<OverViewProp> = () => {
  return (
    <div className="flex gap-[40px]">
      <div className="flex-center w-[498px] rounded-[16px] border border-neutral-light-gray bg-neutral-white">
        <Image src={LaunchImg} alt="launch" width={341}></Image>
      </div>
      <div className="flex flex-1 flex-col gap-[20px]">
        <div className="">
          <div className="item-center flex justify-between">
            <Image src={HackLogo} alt="hack-logo" width={280}></Image>
            <div className="body-m-bold flex h-[34px] items-center rounded-[8px] border-2 border-status-success-dark px-[12px] uppercase text-status-success-dark">
              LIVE NOW
            </div>
          </div>
          <h1 className="body-l mt-[4px] text-neutral-off-black">
            Web3.0 Programing For Everyone
          </h1>
        </div>

        <div className="body-s flex text-neutral-medium-gray">
          <div className="flex-1 ">
            <p>Total Participated Users</p>
            <p className="body-xl-bold mt-[4px] text-neutral-black">
              {separationNumber(35120)}
            </p>
          </div>
          <div className="flex-1 ">
            <p>Total Fuel</p>
            <p className="body-xl-bold mt-[4px] text-neutral-black">
              {separationNumber(588496)}
            </p>
          </div>
        </div>

        <div className="body-m text-neutral-medium-gray [&>div]:mb-[8px]">
          <div className="flex [&>div]:flex-1">
            <div className="">Project Token</div>
            <div className="text-neutral-black">$HQT</div>
          </div>
          <div className="flex [&>div]:flex-1">
            <div className="">Offerings Close in</div>
            <div className="text-neutral-black">5D 4H 48M 21MM</div>
          </div>
          <div className="flex [&>div]:flex-1">
            <div className="">Total Airdrop Amount</div>
            <div className="text-neutral-black">{`${2}% / ${separationNumber(2000000)} $HQT`}</div>
          </div>
          <div className="flex [&>div]:flex-1">
            <div className="">Current Stakings</div>
            <div className="text-neutral-black">{`${separationNumber(10000000)} $MNT`}</div>
          </div>
          <div className="flex [&>div]:flex-1">
            <div className="">Blockchain Network</div>
            <div className="text-neutral-black">Manta Network</div>
          </div>
          <div className="flex [&>div]:flex-1">
            <div className="">Your Fuel</div>
            <div className="flex items-center gap-[8px] text-neutral-off-black">
              <div className="relative">
                Check Your Fueling Board
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-yellow-primary"></div>
              </div>
              <MdArrowForwardIos />
            </div>
          </div>
          <div className="flex [&>div]:flex-1">
            <div className="">Blockchain Network</div>
            <div className="text-neutral-black">Manta Network</div>
          </div>
        </div>
        <Button
          type="primary"
          className="button-text-l h-[60px] w-full uppercase"
        >
          claim token
        </Button>
        <div className="my-[10px] h-[1px] w-full bg-neutral-light-gray"></div>
        <div className="body-m flex items-center text-neutral-medium-gray">
          <span className="flex-1 ">Links</span>
          <div className="flex flex-1 items-center justify-between">
            {linksIcon.hack}
            {linksIcon.file}
            {linksIcon.discord}
            {linksIcon.twitter}
            {linksIcon.telegram}
            {linksIcon.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
