import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';

import Badge from '@/components/Common/Badge';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';

import { message } from 'antd';
import Link from 'next/link';
import { isBadgeIds, needLoginPath } from './data';
import { MenuType, NavbarListType } from './type';
import { useRedirect } from '@/hooks/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import { useCustomPathname } from '@/hooks/useCheckPathname';
import HackLogo from '@/public/images/logo/hack_logo.png';
import { useGlobalStore } from '@/store/zustand/globalStore';

export interface NavBarProps {
  navList: NavbarListType[];
  children?: ReactNode;
  logo?: ReactNode;
}

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const userInfo = useUserStore((state) => state.userInfo);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const setAuthType = useUserStore((state) => state.setAuthType);

  const { navList, children } = NavBarProps;
  const { redirectToUrl } = useRedirect();
  const pathname = useCustomPathname();
  const [showSecondNav, setShowSecondNav] = useState(false);
  const [secondNavData, setSecondNavData] = useState<MenuType[]>([]);
  const [secondLabel, setSecondLabel] = useState('');
  const [curNavId, setCurNavId] = useState('');
  const [inSideNavIndex, setInSideNavIndex] = useState<number>(-1);
  const [secondNavIndex, setSecondNavIndex] = useState<number>(-1);
  const missionData = useMissionCenterStore((state) => state.missionData);

  const setPlaygroundSelectModalOpen = useGlobalStore(
    (state) => state.setPlaygroundSelectModalOpen
  );

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
      if (nav.id === 'playground') {
        setPlaygroundSelectModalOpen(true);
        return;
      } else {
        window.open(nav.link);
      }
    }

    const path = nav.menu[0]?.path;
    if (~needLoginPath.indexOf(path) && !userInfo) {
      e.stopPropagation();
      message.warning('Please login first');
      setAuthType(AuthType.LOGIN);
      setAuthModalOpen(true);
      return;
    }
    redirectToUrl(path);
  };
  const logoClick = () => {
    // if (userInfo) return;
    // setAuthType(AuthType.LOGIN);
    // setAuthModalOpen(true);
    redirectToUrl('/');
  };
  return (
    <div className="relative z-[999] w-full">
      <div className={`container mx-auto h-[64px]`}>
        <div className="flex h-full items-center justify-between">
          <nav className="flex h-full items-center text-neutral-white">
            <div
              className={`flex h-full cursor-pointer items-center`}
              onClick={logoClick}
            >
              <Image src={HackLogo} width={133} alt="logo"></Image>
            </div>
            <SlideHighlight
              className="body-s ml-[60px] flex h-full  gap-[28px] text-neutral-off-white"
              currentIndex={inSideNavIndex}
            >
              {navList.map((nav) => (
                <div
                  key={nav.id}
                  className={`flex-center h-full  cursor-pointer ${
                    curNavId === nav.id ? 'body-s-bold text-neutral-white' : ''
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
      {navList.map((nav, i) => (
        <div
          key={nav.id}
          className={` h-12  w-screen bg-neutral-off-black tracking-[0.84px] text-neutral-white ${inSideNavIndex === i && nav.menu?.length > 1 ? 'block' : 'hidden'}`}
        >
          <div className="body-s container m-auto flex h-full items-center">
            <div className="flex h-[34px] items-center border-r-[0.5px] border-r-neutral-white pr-[20px]">
              {nav.label}
            </div>
            {inSideNavIndex === i && nav.menu?.length > 1 ? (
              <SlideHighlight
                className="flex  h-full items-center gap-[30px] pl-[20px]"
                currentIndex={secondNavIndex}
                type="SECOND_NAVBAR"
              >
                {nav.menu.map((menu: MenuType, i: number) => (
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
            ) : (
              <div className="flex  h-full items-center gap-[30px] pl-[20px]">
                {nav.menu.map((menu: MenuType, i: number) => (
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
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavBar;
