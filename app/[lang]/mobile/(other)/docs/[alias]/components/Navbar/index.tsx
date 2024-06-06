'use client';
import React, { useContext } from 'react';
import { useRedirect } from '@/hooks/router/useRedirect';
import MenuLink from '@/constants/MenuLink';
import Image from 'next/image';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';
import { motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';

export interface NavBarProps {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { redirectToUrl } = useRedirect();
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);

  const logoClick = () => {
    redirectToUrl(MenuLink.DASHBOARD);
  };
  return (
    <nav className="flex h-16 w-full items-center px-5 text-neutral-black">
      <div className="flex h-full w-10 items-center">
        <motion.nav initial={false} animate={sidebarOpen ? 'open' : 'closed'}>
          <button
            aria-label="Toggle Sidebar"
            className="flex items-center justify-center rounded-full bg-transparent outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
          </button>
        </motion.nav>
      </div>
      <div className="text-h4-mob line-clamp-2 flex flex-1 flex-shrink-0 justify-center gap-[4px]">
        <Image src="/images/logo/black-icon-text-logo.svg" alt="logo" width={133} height={16} />
        <span className="font-next-book-bold text-lg">{t('navbar.more.docs')}</span>
      </div>
      <div className="flex w-10 cursor-pointer items-center justify-end" onClick={logoClick} />
    </nav>
  );
};

export default NavBar;
