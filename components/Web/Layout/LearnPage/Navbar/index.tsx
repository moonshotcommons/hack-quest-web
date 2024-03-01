import HackLogo from '@/public/images/logo/hack_logo.png';
import Image from 'next/image';
import React from 'react';

import { useRedirect } from '@/hooks/useRedirect';
import { IoExitOutline, IoPlayOutline } from 'react-icons/io5';
import { MenuLink } from '../../BasePage/Navbar/type';
import { LearnPageType, useCourseStore } from '@/store/zustand/courseStore';
import { FiSave } from 'react-icons/fi';

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { redirectToUrl } = useRedirect();
  const learnPageTitle = useCourseStore((state) => state.learnPageTitle);
  const learnPageType = useCourseStore((state) => state.learnPageType);
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
      {learnPageType === LearnPageType.UGC_CREATE ? (
        <div className="flex w-[123px] cursor-pointer items-center justify-end gap-[20px]">
          <FiSave size={26} />
          <IoPlayOutline size={26} />
          <div className="h-[24px] w-[0.5px] bg-neutral-white"></div>
          <IoExitOutline
            size={26}
            onClick={() => redirectToUrl(MenuLink.INSTRUCTOR)}
          />
        </div>
      ) : (
        <div
          className="flex w-[123px] cursor-pointer items-center justify-end"
          onClick={logoClick}
        >
          <IoExitOutline size={24} />
          <span className="body-l ml-[7px]">Exit</span>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
