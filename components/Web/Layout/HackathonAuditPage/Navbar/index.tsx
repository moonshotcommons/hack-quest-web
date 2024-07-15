'use client';
import Image from 'next/image';
import React from 'react';

import HackLogo from '@/public/images/logo/hackquest_logo.png';
import Link from 'next/link';
import { IoExitOutline } from 'react-icons/io5';
import MenuLink from '@/constants/MenuLink';
import { useHackathonAuditStore } from '@/store/zustand/hackathonAuditStore';
import { useShallow } from 'zustand/react/shallow';

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { hackathonAuditName } = useHackathonAuditStore(
    useShallow((state) => ({
      hackathonAuditName: state.hackathonAuditName
    }))
  );
  return (
    <div className="relative z-[999] h-[64px]  w-full border-b border-neutral-light-gray bg-neutral-white text-neutral-off-black">
      <div className={`h-full px-[40px]`}>
        <div className="flex h-full items-center">
          <nav className="flex h-full items-center">
            <Link href={'/'} className={`flex h-full cursor-pointer items-center`}>
              <Image src={HackLogo} width={133} alt="logo"></Image>
            </Link>
          </nav>
          <div className="flex h-full flex-1 items-center justify-center gap-[4px] text-neutral-off-black">
            <span className="text-h4">{hackathonAuditName}</span>
            <span>{` - `}</span>
            <span className="body-m">{`Hackathon Organizer`}</span>
          </div>
          <Link href={`${MenuLink.HACKATHON_ORGANIZER}`} className="w-[133px]">
            <div className="flex cursor-pointer items-center justify-end">
              <IoExitOutline size={24} />
              <span className="body-l ml-[7px]">Exit</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
