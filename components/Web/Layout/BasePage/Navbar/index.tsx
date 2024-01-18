import DarkLogoActive from '@/public/images/logo/dark-text-Logo-active.svg';
import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';

import Badge from '@/components/Common/Badge';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { V2_LANDING_PATH } from '@/constants/nav';

import { message } from 'antd';
import Link from 'next/link';
import { isBadgeIds, needLoginPath } from './data';
import { MenuType, NavbarListType } from './type';
import { useRedirect } from '@/hooks/useRedirect';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store/zustand/userStore';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';

export interface NavBarProps {
  navList: NavbarListType[];
  children?: ReactNode;
  logo?: ReactNode;
}

type SlideNavigatorHighlight = React.CSSProperties & {
  '--highlight-x'?: string;
  '--highlight-width'?: string;
};

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const userInfo = useUserStore((state) => state.userInfo);

  const { navList, children } = NavBarProps;
  const { redirectToUrl } = useRedirect();
  const pathname = usePathname();
  const [showSecondNav, setShowSecondNav] = useState(false);
  const [secondNavData, setSecondNavData] = useState<MenuType[]>([]);
  const [secondLabel, setSecondLabel] = useState('');
  const [curNavId, setCurNavId] = useState('');
  const [inSideNavIndex, setInSideNavIndex] = useState<number>(-1);
  const [secondNavIndex, setSecondNavIndex] = useState<number>(-1);
  const missionData = useMissionCenterStore((state) => state.missionData);

  useEffect(() => {
    for (let nav of navList) {
      const curNav = nav.menu.find((menu) => pathname.includes(menu.path));
      if (curNav) {
        setShowSecondNav?.(nav.menu.length > 1);
        setSecondNavData(nav.menu as []);
        setSecondLabel(nav.label);
        setCurNavId(nav.id);
        return;
      }
    }
    setShowSecondNav?.(false);
    setSecondNavData([]);
    setSecondLabel('');
    setCurNavId('');
  }, [pathname, navList]);

  useEffect(() => {
    const index = navList.findIndex((v) => v.id === curNavId);
    setInSideNavIndex(index);
  }, [curNavId, navList]);

  useEffect(() => {
    if (!showSecondNav) return;
    const index = secondNavData.findIndex((v) => pathname.includes(v.path));
    setSecondNavIndex(index);
  }, [pathname, showSecondNav, secondNavData, navList]);

  const handleClickNav = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    nav: NavbarListType
  ) => {
    if (nav.type === 'outSide') {
      e.stopPropagation();
      window.open(nav.link);
    }
    const path = nav.menu[0].path;
    if (~needLoginPath.indexOf(path) && !userInfo) {
      e.stopPropagation();
      message.warning('Please login first');
      redirectToUrl(V2_LANDING_PATH);
      return;
    }
    redirectToUrl(path);
  };
  const logoClick = () => {
    if (userInfo) return;
    redirectToUrl(V2_LANDING_PATH);
  };
  return (
    <div className="w-full">
      <div className={`h-[64px] mx-auto container`}>
        <div className="h-full flex items-center justify-between font-next-book">
          <nav className="h-full flex items-center text-white">
            <div
              className={`h-full flex items-center ${
                !userInfo ? 'cursor-pointer' : ''
              }`}
              onClick={logoClick}
            >
              <Image src={DarkLogoActive} alt="logo"></Image>
            </div>
            <SlideHighlight
              className="flex h-full ml-[60px] gap-[28px]  body-s text-neutral-off-white"
              currentIndex={inSideNavIndex}
            >
              {navList.map((nav) => (
                <div
                  key={nav.id}
                  className={`h-full flex-center  cursor-pointer ${
                    curNavId === nav.id ? 'text-neutral-white body-s-bold' : ''
                  }`}
                  data-id={nav.id}
                  onClick={(e) => handleClickNav(e, nav)}
                >
                  <div className="relative">
                    <span>{nav.label}</span>
                    {~isBadgeIds.indexOf(nav.id) && userInfo ? (
                      <Badge count={missionData?.unClaimAll?.length || 0} />
                    ) : null}
                  </div>
                </div>
              ))}
            </SlideHighlight>
          </nav>
          {children}
        </div>
      </div>
      {showSecondNav && (
        <div className="text-neutral-white tracking-[0.84px]  w-screen h-12 bg-neutral-off-black">
          <div className="container m-auto flex h-full items-center body-s">
            <div className="flex items-center h-[34px] pr-[20px] border-r-[0.5px] border-r-neutral-white">
              {secondLabel}
            </div>
            <SlideHighlight
              className="pl-[20px]  flex items-center gap-[30px] h-full"
              currentIndex={secondNavIndex}
              type="SECOND_NAVBAR"
            >
              {secondNavData.map((menu: MenuType, i: number) => (
                <Link
                  key={menu.path}
                  href={menu.path}
                  className={`cursor-pointer   ${
                    secondNavIndex === i ? 'body-s-bold' : ''
                  }`}
                >
                  {menu.label}
                </Link>
              ))}
            </SlideHighlight>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
