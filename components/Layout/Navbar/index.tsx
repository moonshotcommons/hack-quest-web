import Image from 'next/image';
import React, { ReactNode, useContext } from 'react';
import Logo from '@/public/images/logo/text-Logo.svg';
import DarkLogoActive from '@/public/images/logo/dark-text-Logo-active.svg';
import LightLogoActive from '@/public/images/logo/light-text-Logo-active.svg';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ThemeContext } from '@/store/context/theme';
import { Theme } from '@/constants/enum';

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
      case Theme.Dark:
        return <Image src={DarkLogoActive} alt="logo"></Image>;
      case Theme.Light:
        return <Image src={LightLogoActive} alt="logo"></Image>;
    }
    // }
  };

  return (
    <div className="container m-auto h-[4.75rem] flex items-center justify-between">
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
              className={`text-sm h-full flex items-center hover:font-next-book-bold hover:text-text-default-color hover:font-bold ${
                pathname === nav.path
                  ? 'font-next-book-bold text-text-default-color font-bold'
                  : 'font-next-book text-[#B2B2B2] font-normal'
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
