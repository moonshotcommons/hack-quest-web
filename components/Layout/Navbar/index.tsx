import Image from 'next/image';
import React from 'react';
import Logo from '@/public/images/logo/text-Logo.svg';
import Avatar from '@/public/images/avatar.svg';
import Link from 'next/link';

export interface NavBarProps {
  navList: {
    name: string;
    path: string;
  }[];
}

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const { navList } = NavBarProps;
  return (
    <div className="h-[4.75rem] flex items-center justify-between">
      <nav className="gap-[4rem] text-[#B2B2B2] font-next-book flex">
        <Link href="/">
          <Image src={Logo} alt="logo"></Image>
        </Link>
        {navList.map((nav) => {
          return (
            <Link className="text-sm" key={nav.path} href={nav.path}>
              {nav.name}
            </Link>
          );
        })}
      </nav>
      <Image src={Avatar} alt="avatar"></Image>
    </div>
  );
};

export default NavBar;
