import DarkLogoActive from '@/public/images/logo/dark-text-Logo-active.svg';
import Image from 'next/image';
import React, { ReactNode, useContext } from 'react';

import { Theme } from '@/constants/enum';
import { ThemeContext } from '@/store/context/theme';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface NavBarProps {
  navList: {
    name: string;
    path: string;
  }[];
  children?: ReactNode;
  logo?: ReactNode;
}

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const { navList, children, logo } = NavBarProps;
  const { pathname } = useRouter();
  const { theme } = useContext(ThemeContext);

  const NavBarLogo = () => {
    // if (!Logo) return null;
    // if (pathname !== '/') return <Image src={Logo} alt="logo"></Image>;
    // if (pathname === '/') {
    switch (theme) {
      case Theme.Light:
      // return <Image src={LightLogoActive} alt="logo"></Image>;
      case Theme.Dark:
        return <Image src={DarkLogoActive} alt="logo"></Image>;
    }
    // }
  };

  return (
    <div className="m-auto h-full flex items-center justify-between">
      <nav className="gap-[4rem] h-full flex items-center">
        <Link href="/" className="h-full flex items-center">
          {/* {Logo && pathname !== '/' && <Image src={Logo} alt="logo"></Image>}
          {DarkLogoActive && pathname === '/' && theme === Theme.Dark && (
            <Image src={DarkLogoActive} alt="logo"></Image>
          )} */}
          <NavBarLogo></NavBarLogo>
        </Link>
        {navList.map((nav) => {
          return (
            <Link
              className={`text-sm h-full flex items-center text-white hover:font-bold tracking-[0.28px] ${
                pathname === nav.path
                  ? 'font-next-book-bold text-text-default-color font-bold border-b-4 border-[#FFD850]'
                  : 'font-next-book font-normal'
              }`}
              key={nav.path}
              href={nav.path}
            >
              {nav.name}
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
};

export default NavBar;
