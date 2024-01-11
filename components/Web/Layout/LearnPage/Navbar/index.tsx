import DarkLogoActive from '@/public/images/logo/dark-text-Logo-active.svg';
import Image from 'next/image';
import React, { ReactNode } from 'react';

import { useRedirect } from '@/hooks/useRedirect';
import { IoExitOutline } from 'react-icons/io5';
import { MenuLink } from '../../BasePage/Navbar/type';
import { useCourseStore } from '@/store/zustand/courseStore';

export interface NavBarProps {
  children?: ReactNode;
}

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const { redirectToUrl } = useRedirect();
  const learnPageTitle = useCourseStore((state) => state.learnPageTitle);
  const logoClick = () => {
    redirectToUrl(MenuLink.DASHBOARD);
  };
  return (
    <nav className="w-full h-[64px] flex items-center px-[40px] text-neutral-white">
      <Image
        src={DarkLogoActive}
        alt="log"
        width={123}
        className="cursor-pointer"
        onClick={logoClick}
      ></Image>
      <div className="flex-1 text-center text-h4">{learnPageTitle}</div>
      <div
        className="w-[123px] flex items-center justify-end cursor-pointer"
        onClick={logoClick}
      >
        <IoExitOutline size={24} />
        <span className="ml-[7px] body-l">Exit</span>
      </div>
    </nav>
  );
};

export default NavBar;
