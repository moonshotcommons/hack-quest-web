import Image from 'next/image';
import React, { ReactNode, Suspense, useEffect, useState } from 'react';

import { useRedirect } from '@/hooks/useRedirect';
import { useCustomPathname } from '@/hooks/useCheckPathname';
import HackLogo from '@/public/images/logo/light-footer-logo.svg';
import LaunchLogo from '@/public/images/launch/launch_pool_log.png';
import { MenuLink, NavbarListType } from '../../BasePage/Navbar/type';
import User from '../User';
import Intl from '../Intl';

export interface NavBarProps {
  navList: NavbarListType[];
  logo?: ReactNode;
}

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const { navList } = NavBarProps;
  const { redirectToUrl } = useRedirect();
  const pathname = useCustomPathname();
  const [curNavId, setCurNavId] = useState('');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    for (let nav of navList) {
      const curNav = nav.menu.find((menu) =>
        pathname.includes(menu.path as MenuLink)
      );
      if (curNav) {
        setCurNavId(nav.id);
        return;
      }
    }
    setCurNavId('');
  }, [pathname, navList]);

  const handleClickNav = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    nav: NavbarListType
  ) => {
    if (nav.id === 'projects') {
    } else {
    }
  };

  const logoClick = () => {
    redirectToUrl('/');
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="relative z-[999] h-[64px]  w-full border-b border-neutral-light-gray bg-neutral-white text-neutral-off-black">
      <div className={`container mx-auto h-full`}>
        <div className="flex h-full items-center justify-between">
          <nav className="flex h-full items-center text-neutral-white">
            <div
              className={`flex h-full cursor-pointer items-center`}
              onClick={logoClick}
            >
              <Image src={HackLogo} width={133} alt="logo"></Image>
            </div>
            <div className={`ml-[8px] flex h-full cursor-pointer items-center`}>
              <Image src={LaunchLogo} width={108} alt="logo"></Image>
            </div>
            <div className="body-s ml-[60px] flex h-full gap-[12px] text-neutral-off-black">
              {navList.map((nav) => (
                <div
                  key={nav.id}
                  className={`group  relative flex  h-full items-center  `}
                  data-id={nav.id}
                  onClick={(e) => handleClickNav(e, nav)}
                >
                  <div
                    className={`group-hover:body-s-bold  flex cursor-pointer items-center gap-[4px] rounded-[32px] px-[16px]  py-[4px]  ${
                      curNavId === nav.id
                        ? 'body-s-bold bg-yellow-light'
                        : 'group-hover:bg-neutral-off-white'
                    }`}
                  >
                    <div className="relative">
                      <span>{nav.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </nav>
          <div className="flex items-center">
            {/* {mounted && } */}
            {/* <Intl /> */}
            <Suspense fallback={null}>
              <Intl />
            </Suspense>
            <div className="mx-[16px] h-[34px] w-[1px] bg-neutral-light-gray"></div>
            <User />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
