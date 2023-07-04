import Image from 'next/image';
import React from 'react';
import Logo from '@/public/images/logo/text-Logo.svg';
import Avatar from '@/public/images/avatar.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface NavBarProps {
  navList: {
    name: string;
    path: string;
  }[];
}

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const { navList } = NavBarProps;
  const { pathname } = useRouter();
  console.log(pathname, 'pathname');
  return (
    <div className="h-[4.75rem] flex items-center justify-between">
      <nav className="gap-[4rem] h-full flex items-center">
        <Link href="/" className="h-full flex items-center">
          <Image src={Logo} alt="logo"></Image>
        </Link>
        {navList.map((nav) => {
          return (
            <Link
              className={`text-sm h-full flex items-center hover:font-next-book-bold hover:text-white hover:font-bold ${
                pathname === nav.path
                  ? 'font-next-book-bold text-white font-bold'
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
      <Image src={Avatar} alt="avatar"></Image>
    </div>
  );
};

export default NavBar;
