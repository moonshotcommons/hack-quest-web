import DarkLogoActive from '@/public/images/logo/dark-text-Logo-active.svg';
import Image from 'next/image';
import React, { ReactNode, use, useContext, useMemo } from 'react';

import { Theme } from '@/constants/enum';
import { ThemeContext } from '@/store/context/theme';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import Badge from '@/components/Common/Badge';
import { NavbarListType } from './type';

export interface NavBarProps {
  navList: NavbarListType[];
  children?: ReactNode;
  logo?: ReactNode;
}

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const { navList, children, logo } = NavBarProps;
  const { pathname } = useRouter();
  const curNavId = useMemo(() => {
    for (let nav of navList) {
      if (nav.menu.some((menu) => pathname.includes(menu.path))) {
        return nav.id;
      }
    }
    return '';
  }, [pathname]);
  const { missionData } = useSelector((state: AppRootState) => {
    return {
      missionData: state.missionCenter?.missionData
    };
  });
  console.info(curNavId);
  return (
    <>
      <div className="m-auto h-full flex items-center justify-between font-next-book">
        <nav className="gap-[4rem] h-full flex items-center text-[#fff]">
          <Image src={DarkLogoActive} alt="logo"></Image>;
          <div className="flex gap-[10px] h-[34px]  text-[14px] rounded-[20px] bg-[#3E3E3E] overflow-hidden tracking-[0.28px]">
            {navList.map((v) => (
              <div
                key={v.id}
                className={`h-full flex-center px-[14px] rounded-[20px] ${
                  curNavId === v.id ? 'bg-[#FFD850] text-[#0b0b0b]' : ''
                }`}
              >
                {v.label}
              </div>
            ))}
          </div>
        </nav>
        {children}
      </div>
    </>
  );
};

export default NavBar;
