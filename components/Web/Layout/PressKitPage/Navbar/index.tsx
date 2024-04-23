'use client';
import Image from 'next/image';
import React, { useContext } from 'react';

import { useRedirect } from '@/hooks/router/useRedirect';
import HackLogo from '@/public/images/logo/black-icon-text-logo.svg';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { HiArrowLongRight } from 'react-icons/hi2';

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.PRESS_KIT);
  const { redirectToUrl } = useRedirect();

  const goLanding = () => {
    redirectToUrl('/');
  };

  return (
    <div className="relative z-[999] h-[64px]  w-full border-b border-neutral-light-gray bg-neutral-white text-neutral-off-black">
      <div className={`container mx-auto h-full`}>
        <div className="flex h-full items-center justify-between">
          <nav className="flex h-full items-center text-neutral-white">
            <Link href={MenuLink.LAUNCH} className={`flex h-full cursor-pointer items-center`} onClick={goLanding}>
              <Image src={HackLogo} width={133} alt="logo"></Image>
            </Link>
            <div className={`text-h4 ml-[4px] flex h-full cursor-pointer items-center text-neutral-black`}>
              {t('pressKit')}
            </div>
          </nav>
          <div className="body-m flex cursor-pointer items-center gap-[7px] text-neutral-black" onClick={goLanding}>
            <div className="relative">
              <span>{t('goToHackQuest')}</span>
              <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-[2px] bg-yellow-dark"></div>
            </div>
            <HiArrowLongRight size={20}></HiArrowLongRight>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
