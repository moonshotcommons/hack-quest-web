// import DarkLogoActive from '@/public/images/logo/dark-text-Logo-active.svg';
import HackLogo from '@/public/images/logo/hack_logo.png';
import Image from 'next/image';
import React from 'react';

import { useRedirect } from '@/hooks/useRedirect';
import { IoExitOutline } from 'react-icons/io5';
import { MenuLink } from '../../BasePage/Navbar/type';
import { useCourseStore } from '@/store/zustand/courseStore';

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { redirectToUrl } = useRedirect();
  const learnPageTitle = useCourseStore((state) => state.learnPageTitle);
  const logoClick = () => {
    redirectToUrl(MenuLink.DASHBOARD);
  };
  return (
    <nav className="flex h-[64px] w-full items-center px-[40px] text-neutral-white">
      <Image
        src={HackLogo}
        alt="log"
        width={133}
        className="cursor-pointer"
        onClick={logoClick}
      ></Image>
      <div className="text-h4 flex-1 text-center">{learnPageTitle}</div>
      <div
        className="flex w-[123px] cursor-pointer items-center justify-end"
        onClick={logoClick}
      >
        <IoExitOutline size={24} />
        <span className="body-l ml-[7px]">Exit</span>
      </div>
    </nav>
  );
};

export default NavBar;
