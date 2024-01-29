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
import { useUserStore } from '@/store/zustand/userStore';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import { useCustomPathname } from '@/hooks/useCheckPathname';

export interface NavBarProps {
  navList: NavbarListType[];
  children?: ReactNode;
  logo?: ReactNode;
  isFull?: boolean;
}

type SlideNavigatorHighlight = React.CSSProperties & {
  '--highlight-x'?: string;
  '--highlight-width'?: string;
};

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const userInfo = useUserStore((state) => state.userInfo);
  const { navList, children, isFull } = NavBarProps;
  const { redirectToUrl } = useRedirect();
  const pathname = useCustomPathname();
  const [showSecondNav, setShowSecondNav] = useState(false);
  const [secondNavData, setSecondNavData] = useState<MenuType[]>([]);
  const [curNavId, setCurNavId] = useState('');
  const [outSideNav, setOutSideNav] = useState<NavbarListType[]>([]);
  const [inSideNav, setInSideNav] = useState<NavbarListType[]>([]);
  const [inSideNavIndex, setInSideNavIndex] = useState<number>(-1);
  const [secondNavIndex, setSecondNavIndex] = useState<number>(-1);
  const missionData = useMissionCenterStore((state) => state.missionData);

  useEffect(() => {
    const outSide = navList.filter((v) => v.type === 'outSide');
    setOutSideNav(outSide);
    const inSide = navList.filter((v) => v.type !== 'outSide');
    setInSideNav(inSide);
    if (isFull) {
      setShowSecondNav?.(false);
      setSecondNavData(inSide[0].menu as []);
      setCurNavId(inSide[0].id);
      return;
    }

    for (let nav of inSide) {
      const curNav = nav.menu.find((menu) => pathname.includes(menu.path));
      if (curNav) {
        setShowSecondNav?.(nav.menu.length > 1);
        setSecondNavData(nav.menu as []);
        setCurNavId(nav.id);
        return;
      }
    }
    setShowSecondNav?.(false);
    setSecondNavData([]);
    setCurNavId('');
  }, [pathname, navList]);

  useEffect(() => {
    const index = inSideNav.findIndex((v) => v.id === curNavId);
    setInSideNavIndex(index);
  }, [inSideNav, curNavId]);

  useEffect(() => {
    if (!showSecondNav) return;
    const index = secondNavData.findIndex((v) => pathname.includes(v.path));
    setSecondNavIndex(index);
  }, [pathname, showSecondNav, secondNavData]);

  const handleClickNav = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    nav: NavbarListType
  ) => {
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
      <div
        className={`h-[64px] mx-auto  ${
          isFull ? 'w-full 2xl:px-[40px]' : 'container'
        }`}
      >
        <div className="slab:hidden  h-full flex items-center justify-between font-next-book">
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
              className="flex ml-16 gap-[10px] h-[34px] text-sm rounded-[20px] bg-[#3E3E3E] overflow-hidden tracking-[0.28px]"
              currentIndex={inSideNavIndex}
            >
              {inSideNav.map((nav) => (
                <div
                  key={nav.id}
                  className={`h-full flex-center px-[14px] rounded-[20px] cursor-pointer ${
                    curNavId === nav.id ? 'text-[#0b0b0b]' : ''
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
            <div className="flex ml-[20px] gap-[10px] h-[34px]  text-[14px] rounded-[20px] bg-[#3E3E3E] overflow-hidden tracking-[0.28px]">
              {outSideNav.map((nav) => (
                <Link
                  key={nav.id}
                  href={nav.link as string}
                  target="_blank"
                  className={`h-full flex-center px-[14px] rounded-[20px] cursor-pointer  `}
                >
                  {nav.label}
                </Link>
              ))}
            </div>
          </nav>
          {children}
        </div>
        <nav className="hidden slab:flex-center w-full h-full ">
          <Image src={DarkLogoActive} height={20} alt="logo"></Image>
        </nav>
      </div>
      {showSecondNav && (
        <div className="slab:hidden  text-white tracking-[0.84px]  w-screen h-12 bg-[#0B0B0B]">
          <SlideHighlight
            className="container m-auto flex items-end gap-[30px] h-full"
            currentIndex={secondNavIndex}
          >
            {secondNavData.map((menu: MenuType) => (
              <Link
                key={menu.path}
                href={menu.path}
                className="h-full pb-3 cursor-pointer hover:underline flex items-end"
              >
                {menu.label}
              </Link>
            ))}
          </SlideHighlight>
        </div>
      )}
    </div>
  );
};

export default NavBar;
