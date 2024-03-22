import Image from 'next/image';
import React, {
  ReactNode,
  useEffect,
  useState,
  FC,
  useContext,
  useMemo
} from 'react';
import { useCycle } from 'framer-motion';

import { useRedirect } from '@/hooks/useRedirect';

import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import NavContainer from './NavContainer';
import NavList from './NavList';
import Auth from './Auth';
import UserModule from './UserModule';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useCheckPathname } from '@/hooks/useCheckPathname';
import { NavbarListType } from '@/components/Web/Layout/BasePage/Navbar/type';
import HackLogo from '@/public/images/logo/light-footer-logo.svg';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import WaitListModalContent from '@/components/Mobile/MobGlobalNavModal/WaitListModalContent';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { NavType } from '../../constant';
import ConnectModalContent from '@/components/Mobile/MobGlobalNavModal/ConnectModalContent';
export interface NavbarProps {
  navList: NavbarListType[];
  children?: ReactNode;
  logo?: ReactNode;
}

const Navbar: FC<NavbarProps> = (props) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const [openNavKeys, setOpenNavKeys] = useState<string[]>([]);
  const userInfo = useUserStore((state) => state.userInfo);
  const setMobileNavModalToggleOpenHandle = useGlobalStore(
    (state) => state.setMobileNavModalToggleOpenHandle
  );
  const { navList, children } = props;
  const { redirectToUrl } = useRedirect();
  const { isLandingPage } = useCheckPathname();
  const missionData = useMissionCenterStore((state) => state.missionData);
  const [isOpen, toggleOpen] = useCycle(false, true);

  const setAuthType = useUserStore((state) => state.setAuthType);

  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const queryState = query.get('state');
  const type = query.get('type');

  const [navType, setNavType] = useState<NavType>(NavType.NAV_LIST);

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
      setNavType: (type) => setNavType(type)
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
          >
            <UserModule
              changeNavType={(type) => {
                setNavType(type);
              }}
              toggleOpen={() => {
                toggleOpen();
              }}
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
          ></Auth>
        );
      case NavType.JOIN_WAIT_LIST:
        return (
          <WaitListModalContent
            changeNavState={() => {
              toggleOpen();
              setNavType(NavType.NAV_LIST);
            }}
          ></WaitListModalContent>
        );
      case NavType.CONNECT:
        return (
          <ConnectModalContent
            changeNavState={() => {
              toggleOpen();
              setNavType(NavType.NAV_LIST);
            }}
          ></ConnectModalContent>
        );
    }
  }, [navType, navList, toggleOpen]);

  return (
    <div className="flex h-[4rem] w-screen items-center overflow-hidden text-neutral-off-black">
      <NavContainer
        isOpen={isOpen}
        toggleOpen={() => {
          setNavType(NavType.NAV_LIST);
          toggleOpen();
        }}
      >
        {/* {navType === NavType.NAV_LIST && (
          <NavList
            navList={navList}
            toggleOpen={() => {
              toggleOpen();
            }}
          >
            <UserModule
              changeNavType={(type) => {
                setNavType(type);
              }}
              toggleOpen={() => {
                toggleOpen();
              }}
            ></UserModule>
          </NavList>
        )}
        {navType === NavType.AUTH && (
          <Auth
            changeNavState={() => {
              toggleOpen();
              setNavType(NavType.NAV_LIST);
            }}
          ></Auth>
        )} */}
        {NavContentNode}
      </NavContainer>
      <div className="relative flex h-full w-full items-center justify-center gap-[8px]">
        <Image src={HackLogo} alt="logo" width={134}></Image>
        <span className="text-h5-mob font-Chaney text-neutral-black">
          {t('launchpool')}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
