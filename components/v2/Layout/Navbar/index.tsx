import DarkLogoActive from '@/public/images/logo/dark-text-Logo-active.svg';
import Image from 'next/image';
import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import Badge from '@/components/Common/Badge';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { MenuType, NavbarListType } from './type';
import { needLoginPath, isBadgeIds } from './data';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { message } from 'antd';

export interface NavBarProps {
  navList: NavbarListType[];
  children?: ReactNode;
  logo?: ReactNode;
  showSecondNav?: boolean;
  changeShowSecondNav?: (show: boolean) => void;
  isFull?: boolean;
}

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const userInfo = useGetUserInfo();
  const { navList, children, showSecondNav, changeShowSecondNav, isFull } =
    NavBarProps;
  const router = useRouter();
  const pathname = router.pathname;
  const [secondNavData, setSecondNavData] = useState<MenuType[]>([]);
  const [curNavId, setCurNavId] = useState('');
  const [outSideNav, setOutSideNav] = useState<NavbarListType[]>([]);
  const [inSideNav, setInSideNav] = useState<NavbarListType[]>([]);
  const [inSideNavIndex, setInSideNavIndex] = useState<number>(-1);
  const [secondNavIndex, setSecondNavIndex] = useState<number>(-1);
  const { missionData } = useSelector((state: AppRootState) => {
    return {
      missionData: state.missionCenter?.missionData
    };
  });

  useEffect(() => {
    const outSide = navList.filter((v) => v.type === 'outSide');
    setOutSideNav(outSide);
    const inSide = navList.filter((v) => v.type !== 'outSide');
    setInSideNav(inSide);
    if (isFull) {
      changeShowSecondNav?.(false);
      setSecondNavData(inSide[0].menu as []);
      setCurNavId(inSide[0].id);
      return;
    }

    for (let nav of inSide) {
      const curNav = nav.menu.find((menu) => pathname.includes(menu.path));
      if (curNav) {
        changeShowSecondNav?.(nav.menu.length > 1);
        setSecondNavData(nav.menu as []);
        setCurNavId(nav.id);
        return;
      }
    }
    changeShowSecondNav?.(false);
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

  const handleClickNav = (nav: NavbarListType) => {
    const path = nav.menu[0].path;
    if (~needLoginPath.indexOf(path) && !userInfo) {
      message.warning('Please log in first');
      return;
    }
    router.push(path);
  };

  return (
    <div className=" w-full">
      <div
        className={`h-[64px] mx-auto  ${
          isFull ? 'w-full 2xl:px-[40px]' : 'container'
        }`}
      >
        <div className="h-full flex items-center justify-between font-next-book">
          <nav className="h-full flex items-center text-white">
            <Image src={DarkLogoActive} alt="logo"></Image>
            <SlideHighlight
              className="flex ml-16 gap-[10px] h-[34px] text-sm rounded-[20px] bg-[#3E3E3E] overflow-hidden tracking-[0.28px]"
              currentIndex={inSideNavIndex}
              type={'background'}
            >
              {inSideNav.map((nav) => (
                <div
                  key={nav.id}
                  className={`h-full flex-center px-[14px] rounded-[20px] cursor-pointer ${
                    curNavId === nav.id ? 'text-[#0b0b0b]' : ''
                  }`}
                  onClick={() => handleClickNav(nav)}
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
                  className={`h-full flex-center px-[14px] rounded-[20px] cursor-pointer `}
                >
                  {nav.label}
                </Link>
              ))}
            </div>
          </nav>
          {children}
        </div>
      </div>
      {showSecondNav && (
        <div className=" text-white tracking-[0.84px]  w-screen h-12 bg-[#0B0B0B]">
          <SlideHighlight
            className="container m-auto flex items-end gap-[30px] h-full"
            currentIndex={secondNavIndex}
          >
            {secondNavData.map((menu: MenuType) => (
              <Link
                key={menu.path}
                href={menu.path}
                className="pb-3 cursor-pointer hover:underline"
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
