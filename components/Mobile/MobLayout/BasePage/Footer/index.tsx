import Image from 'next/image';
import React, { useContext } from 'react';
// import Logo from '@/public/images/logo/logo_hack_quest.svg';
import LightLogo from '@/public/images/logo/light-footer-logo.svg';
import DarkLogo from '@/public/images/logo/dark-footer-logo.svg';

import Link from 'next/link';
import ContractUs from '@/components/Web/Business/ContractUs';
import { ThemeContext } from '@/store/context/theme';
import { Theme } from '@/constants/enum';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="w-full gap-[6.25rem] pt-[12rem] bg-default-global-bg mt-[3rem] pb-[3.5rem] flex justify-between flex-col">
      <div className="h-full flex justify-between">
        <h2 className="font-next-poster-Bold w-[18rem] text-text-default-color text-[2rem]">
          WEB3 programming for Everyone
        </h2>
        <div className="flex gap-[7.5rem] text-sm font-next-book">
          <ul className="w-[8.375rem] flex flex-col gap-[1.75rem]">
            <Link
              href={'/courses'}
              className="hover:font-next-book-bold text-text-second-color cursor-pointer"
            >
              All Courses
            </Link>
            <Link
              href={'/dashboard'}
              className="hover:font-next-book-bold text-text-second-color  cursor-pointer"
            >
              Learning Dashboard
            </Link>
            {/* <li className="hover:font-next-book-bold text-white cursor-pointer">
              Resources Station
            </li> */}
          </ul>
          <div className="flex flex-col gap-[1.25rem]">
            <p className="text-text-second-color">Contact us:</p>
            <ContractUs></ContractUs>
          </div>
        </div>
      </div>
      <div className="w-full relative flex justify-between items-end pb-[2.625rem] bottom-line">
        {theme === Theme.Light && <Image src={LightLogo} alt="logo"></Image>}
        {theme === Theme.Dark && <Image src={DarkLogo} alt="logo"></Image>}
        <p className="text-text-default-color text-sm font-next-book-Thin">
          © 2023 HackQuests. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
