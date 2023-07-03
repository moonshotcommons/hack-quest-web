import Image from 'next/image';
import React from 'react';
import Logo from '@/public/images/logo/logo_hack_quest.svg';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import DiscordIcon from '@/components/Common/Icon/Discord';
import InstagramIcon from '@/components/Common/Icon/Instagram';

const Footer = () => {
  return (
    <div className="w-full gap-[6.25rem] pt-[12rem] mt-[3rem] pb-[3.5rem] bg-black flex justify-between flex-col">
      <div className="h-full flex justify-between">
        <h2 className="font-next-poster-Bold w-[18rem] text-[#EDEDED] text-[2rem]">
          WEB3 programming for Everyone
        </h2>
        <div className="flex gap-[7.5rem]  text-[#B2B2B2] text-sm font-next-book-Thin">
          <ul className="flex flex-col gap-[1.75rem]">
            <li>All Courses</li>
            <li>Learning Dashboard</li>
            <li>Resources Station</li>
          </ul>
          <div className="flex flex-col gap-[1.25rem]">
            <p>Contact us:</p>
            <ul className="flex gap-[20px]">
              <TwitterIcon></TwitterIcon>
              <DiscordIcon></DiscordIcon>
              <InstagramIcon></InstagramIcon>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full relative flex justify-between items-end pb-[2.625rem] bottom-line">
        <Image src={Logo} alt="logo"></Image>
        <p className="text-[#676767] text-sm font-next-book-Thin">
          © 2023 HackQuests. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
