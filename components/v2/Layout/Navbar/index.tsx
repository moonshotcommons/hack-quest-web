import DarkLogoActive from '@/public/images/logo/dark-text-Logo-active.svg';
import Image from 'next/image';
import React, { ReactNode, use, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import Badge from '@/components/Common/Badge';
import { MenuType, NavbarListType } from './type';

export interface NavBarProps {
  navList: NavbarListType[];
  children?: ReactNode;
  logo?: ReactNode;
  showSecondNav?: boolean;
  changeShowSecondNav?: (show: boolean) => void;
  isFull?: boolean;
}

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const { navList, children, showSecondNav, changeShowSecondNav, isFull } =
    NavBarProps;
  const router = useRouter();
  const pathname = router.pathname;
  const [secondNavData, setSecondNavData] = useState([]);
  const [curNavId, setCurNavId] = useState('');
  const [outSideNav, setOutSideNav] = useState<NavbarListType[]>([]);
  const [inSideNav, setInSideNav] = useState<NavbarListType[]>([]);
  const { missionData } = useSelector((state: AppRootState) => {
    return {
      missionData: state.missionCenter?.missionData
    };
  });

  useEffect(() => {
    if (navList.length) {
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
    }
  }, [pathname, navList]);

  const handleClickNav = (nav: NavbarListType) => {
    if (nav.id === 'playground') {
      router.push(process.env.IDE_URL || 'https://ide.dev.hackquest.io');
      return;
    }
    router.push(nav.menu[0].path);
  };
  return (
    <div className="h-full w-full flex justify-center">
      <div
        className={`h-full  ${isFull ? 'w-full 2xl:px-[40px]' : 'container'}`}
      >
        <div className="h-full flex items-center justify-between font-next-book">
          <nav className="h-full flex items-center text-[#fff]">
            <Image src={DarkLogoActive} alt="logo"></Image>
            <div className="flex ml-[64px] gap-[10px] h-[34px]  text-[14px] rounded-[20px] bg-[#3E3E3E] overflow-hidden tracking-[0.28px]">
              {inSideNav.map((nav) => (
                <div
                  key={nav.id}
                  className={`h-full flex-center px-[14px] rounded-[20px] cursor-pointer ${
                    curNavId === nav.id ? 'bg-[#FFD850] text-[#0b0b0b]' : ''
                  }`}
                  onClick={() => handleClickNav(nav)}
                >
                  <div className="relative">
                    <span>{nav.label}</span>
                    {nav.id === 'missions' && (
                      <Badge count={missionData?.unClaimAll?.length || 0} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex ml-[20px] gap-[10px] h-[34px]  text-[14px] rounded-[20px] bg-[#3E3E3E] overflow-hidden tracking-[0.28px]">
              {outSideNav.map((nav) => (
                <div
                  key={nav.id}
                  className={`h-full flex-center px-[14px] rounded-[20px] cursor-pointer `}
                  onClick={() => handleClickNav(nav)}
                >
                  <div className="relative">
                    <span>{nav.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </nav>
          {children}
        </div>
      </div>
      {showSecondNav && (
        <div className="fixed text-[#fff] tracking-[0.84px] left-0 top-[64px] w-[100vw]  h-[48px]  bg-[#0B0B0B]">
          <div className="container m-auto flex items-end gap-[30px]  h-full">
            {secondNavData.map((menu: MenuType) => (
              <Link
                key={menu.path}
                href={menu.path}
                className={`pb-[8px] border-b-[3px] cursor-pointer  ${
                  pathname.includes(menu.path)
                    ? 'border-b-[#FFD850]'
                    : 'border-b-[transparent]'
                }`}
              >
                {menu.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
