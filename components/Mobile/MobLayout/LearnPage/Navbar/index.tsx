import React from 'react';

import { useRedirect } from '@/hooks/useRedirect';
import { IoExitOutline } from 'react-icons/io5';
import { MenuLink } from '../../BasePage/Navbar/type';
import { useCourseStore } from '@/store/zustand/courseStore';
import { useLearnStore } from '@/store/zustand/learnStore';

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { redirectToUrl } = useRedirect();
  const learnPageTitle = useCourseStore((state) => state.learnPageTitle);

  const setSidebarOpen = useLearnStore((state) => state.setSidebarOpen);
  const logoClick = () => {
    redirectToUrl(MenuLink.DASHBOARD);
  };
  return (
    <nav className="flex h-[64px] w-full items-center px-[1.25rem] text-neutral-white">
      <div
        className="flex h-full w-[2.5rem] items-center"
        onClick={() => {
          setSidebarOpen(true);
        }}
      >
        <svg
          width="20"
          height="19"
          viewBox="0 0 20 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 2H19C19.5523 2 20 1.55228 20 1C20 0.447715 19.5523 0 19 0H1C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2ZM20 18C20 18.5523 19.5523 19 19 19H1C0.447715 19 0 18.5523 0 18C0 17.4477 0.447715 17 1 17H19C19.5523 17 20 17.4477 20 18ZM1 9H19C19.5523 9 20 9.44771 20 10C20 10.5523 19.5523 11 19 11H1C0.447715 11 0 10.5523 0 10C0 9.44771 0.447715 9 1 9Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="text-h4-mob line-clamp-2 flex-1 flex-shrink-0 text-center">
        {learnPageTitle}
      </div>
      <div
        className="flex w-[2.5rem] cursor-pointer items-center justify-end"
        onClick={logoClick}
      >
        <IoExitOutline size={28} />
      </div>
    </nav>
  );
};

export default NavBar;
