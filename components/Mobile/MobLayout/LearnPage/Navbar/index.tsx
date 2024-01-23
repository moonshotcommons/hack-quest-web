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
    <nav className="w-full h-[64px] flex items-center px-[1.25rem] text-neutral-white">
      <div className="w-[2.5rem] h-full"></div>
      <div className="flex-1 text-center text-h4-mob">{learnPageTitle}</div>
      <div
        className="w-[2.5rem] flex items-center justify-end cursor-pointer"
        onClick={logoClick}
      >
        <IoExitOutline size={28} />
      </div>
    </nav>
  );
};

export default NavBar;
