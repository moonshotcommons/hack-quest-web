import Image from 'next/image';
import React, { ReactNode, useEffect, useState, FC, useContext, useMemo } from 'react';
import { useCycle } from 'framer-motion';

import NavContainer from './NavContainer';
import NavList from './NavList';
import Auth from './Auth';
import UserModule from './UserModule';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useCheckPathname } from '@/hooks/router/useCheckPathname';
import { NavbarListType } from '@/components/Web/Layout/BasePage/Navbar/type';
import HackLogo from '@/public/images/logo/black-icon-text-logo.svg';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import WaitListModalContent from '@/components/Mobile/MobGlobalNavModal/WaitListModalContent';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { NavType } from '../../constant';
import ConnectModalContent from '@/components/Mobile/MobGlobalNavModal/ConnectModalContent';
import { LoginResponse } from '@/service/webApi/user/type';
export interface NavbarProps {
  navList: NavbarListType[];
  logo?: ReactNode;
  userInfo: Partial<LoginResponse> | null;
}

const Navbar: FC<NavbarProps> = (props) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const [openNavKeys, setOpenNavKeys] = useState<string[]>([]);

  const setMobileNavModalToggleOpenHandle = useGlobalStore((state) => state.setMobileNavModalToggleOpenHandle);
  const { navList, userInfo } = props;
  const { isLandingPage } = useCheckPathname();
  const [isOpen, toggleOpen] = useCycle(false, true);

  const setAuthType = useUserStore((state) => state.setAuthType);

  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const queryState = query.get('state');
  const type = query.get('type');
  const [navType, setNavType] = useState<NavType>(NavType.NAV_LIST);

  const [moduleProps, setModuleProps] = useState<object>({});

  useEffect(() => {
    if ((type || queryState) && isLandingPage) {
      setAuthType(type as AuthType);
      setNavType(NavType.AUTH);
      toggleOpen();
    }
  }, []);

  useEffect(() => {
    setMobileNavModalToggleOpenHandle({
      isOpen,
      toggleOpen: toggleOpen,
      setNavType: (type) => setNavType(type),
      setModuleProps: (p) => setModuleProps(p)
    });
  }, [isOpen, toggleOpen, setNavType, setMobileNavModalToggleOpenHandle]);

  const NavContentNode = useMemo(() => {
    switch (navType) {
      case NavType.NAV_LIST:
        return (
          <NavList
            navList={navList}
            toggleOpen={() => {
              toggleOpen();
            }}
            {...moduleProps}
          >
            <UserModule
              userInfo={userInfo}
              changeNavType={(type) => {
                setNavType(type);
              }}
              toggleOpen={() => {
                toggleOpen();
              }}
              {...moduleProps}
            ></UserModule>
          </NavList>
        );
      case NavType.AUTH:
        return (
          <Auth
            changeNavState={() => {
              toggleOpen();
              setNavType(NavType.NAV_LIST);
            }}
            {...moduleProps}
          ></Auth>
        );
      case NavType.JOIN_WAIT_LIST:
        return (
          <WaitListModalContent
            changeNavState={() => {
              toggleOpen();
              setNavType(NavType.NAV_LIST);
            }}
            {...moduleProps}
          ></WaitListModalContent>
        );
      case NavType.CONNECT:
        return (
          <ConnectModalContent
            changeNavState={() => {
              toggleOpen();
              setNavType(NavType.NAV_LIST);
            }}
            {...moduleProps}
          ></ConnectModalContent>
        );
    }
  }, [navType, navList, toggleOpen, moduleProps]);

  return (
    <div className="flex h-[4rem] w-screen items-center overflow-hidden text-neutral-off-black">
      <NavContainer
        isOpen={isOpen}
        toggleOpen={() => {
          setNavType(NavType.NAV_LIST);
          toggleOpen();
        }}
      >
        {NavContentNode}
      </NavContainer>
      <div className="relative flex h-full w-full items-center justify-center gap-[8px]">
        <Image src={HackLogo} alt="logo" width={134}></Image>
        <span className="text-h5-mob font-Chaney text-neutral-black">{t('launchpool')}</span>
      </div>
    </div>
  );
};

export default Navbar;
