import React, { useContext } from 'react';

import { useRedirect } from '@/hooks/router/useRedirect';
import MenuLink from '@/constants/MenuLink';
import Image from 'next/image';
import { usePressKitStore } from '@/store/zustand/pressKitStore';
import { useShallow } from 'zustand/react/shallow';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';
import { motion } from 'framer-motion';

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { redirectToUrl } = useRedirect();
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.PRESS_KIT);

  const Path = (props: any) => (
    <motion.path fill="transparent" strokeWidth="3" stroke="#fff" strokeLinecap="round" {...props} />
  );
  const { sidebarOpen, setSidebarOpen } = usePressKitStore(
    useShallow((state) => {
      return {
        sidebarOpen: state?.sidebarOpen,
        setSidebarOpen: state?.setSidebarOpen
      };
    })
  );
  const logoClick = () => {
    redirectToUrl(MenuLink.DASHBOARD);
  };
  return (
    <nav className="flex h-[4rem] w-full items-center px-[1.25rem] text-neutral-white">
      <div className="flex h-full w-[2.5rem] items-center">
        <motion.nav initial={false} animate={sidebarOpen ? 'open' : 'closed'}>
          <div className="flex h-[4rem] items-center justify-center rounded-full bg-transparent outline-none">
            <svg width="23" height="23" viewBox="0 0 23 23" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Path
                variants={{
                  closed: { d: 'M 2 2.5 L 20 2.5' },
                  open: { d: 'M 3 16.5 L 17 2.5' }
                }}
              />
              <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.1 }}
              />
              <Path
                variants={{
                  closed: { d: 'M 2 16.346 L 20 16.346' },
                  open: { d: 'M 3 2.5 L 17 16.346' }
                }}
              />
            </svg>
          </div>
        </motion.nav>
      </div>
      <div className="text-h4-mob line-clamp-2 flex flex-1 flex-shrink-0 justify-center gap-[4px]">
        <Image src={'/images/logo/black-icon-text-logo.svg'} alt="logo" width={133} height={16}></Image>
        <span className="text-h4 text-[18px]">{t('pressKit')}</span>
      </div>
      <div className="flex w-[2.5rem] cursor-pointer items-center justify-end" onClick={logoClick}></div>
    </nav>
  );
};

export default NavBar;
