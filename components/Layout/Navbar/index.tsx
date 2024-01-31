'use client';
import DarkLogoActive from '@/public/images/logo/dark-text-Logo-active.svg';
import Image from 'next/image';
import React, { ReactNode, useEffect, useLayoutEffect, useState } from 'react';

import Badge from '@/components/Common/Badge';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { V2_LANDING_PATH } from '@/constants/nav';
import { message } from 'antd';
import Link from 'next/link';
import { isBadgeIds, navbarList, needLoginPath } from './data';
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
  const pathname = useCustomPathname();
  const { redirectToUrl } = useRedirect();
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

  useLayoutEffect(() => {
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
    <div className=" w-full">
      <div
        className={`mx-auto h-[64px]  ${
          isFull ? 'w-full 2xl:px-[40px]' : 'container'
        }`}
      >
        <div className="flex  h-full items-center justify-between font-next-book slab:hidden">
          <nav className="flex h-full items-center text-neutral-white">
            <div
              className={`flex h-full items-center ${
                !userInfo ? 'cursor-pointer' : ''
              }`}
              onClick={logoClick}
            >
              <Image src={DarkLogoActive} alt="logo"></Image>
            </div>
            <SlideHighlight
              className="ml-16 flex h-[34px] gap-[10px] overflow-hidden rounded-[20px] bg-neutral-rich-gray text-sm tracking-[0.28px]"
              currentIndex={inSideNavIndex}
            >
              {inSideNav.map((nav) => (
                <div
                  key={nav.id}
                  className={`flex-center h-full cursor-pointer rounded-[20px] px-[14px] ${
                    curNavId === nav.id ? 'text-neutral-black' : ''
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
            <div className="ml-[20px] flex h-[34px] gap-[10px]  overflow-hidden rounded-[20px] bg-neutral-rich-gray text-[14px] tracking-[0.28px]">
              {outSideNav.map((nav) => (
                <Link
                  key={nav.id}
                  href={nav.link as string}
                  target="_blank"
                  className={`flex-center h-full cursor-pointer rounded-[20px] px-[14px]  `}
                >
                  {nav.label}
                </Link>
              ))}
            </div>
          </nav>
          {children}
        </div>
        <nav className="slab:flex-center hidden h-full w-full ">
          <Image src={DarkLogoActive} height={20} alt="logo"></Image>
        </nav>
      </div>
      {showSecondNav && (
        <div className="h-12  w-screen bg-neutral-black  tracking-[0.84px] text-neutral-white slab:hidden">
          <SlideHighlight
            className="container m-auto flex h-full items-end gap-[30px]"
            currentIndex={secondNavIndex}
          >
            {secondNavData.map((menu: MenuType) => (
              <div
                key={menu.path}
                className="cursor-pointer pb-3 hover:underline"
                onClick={() => {
                  redirectToUrl(menu.path);
                }}
              >
                {menu.label}
              </div>
            ))}
          </SlideHighlight>
        </div>
      )}
    </div>
  );
};

export const NavbarInstance = <NavBar navList={navbarList}></NavBar>;

export default NavBar;
