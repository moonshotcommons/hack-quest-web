import Image from 'next/image';
import React, { ReactNode, useEffect, useState, FC } from 'react';
import { useCycle } from 'framer-motion';

import { useRedirect } from '@/hooks/router/useRedirect';

import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import NavContainer from './NavContainer';
import NavList from './NavList';
import Auth from './Auth';
import UserModule from './UserModule';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useCheckPathname } from '@/hooks/router/useCheckPathname';
import { NavbarListType } from '@/components/Web/Layout/BasePage/Navbar/type';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { NavType } from '../../constant';
import { LoginResponse } from '@/service/webApi/user/type';

export interface NavbarProps {
  navList: NavbarListType[];
  children?: ReactNode;
  logo?: ReactNode;
  userInfo: Partial<LoginResponse> | null;
}

const Navbar: FC<NavbarProps> = (props) => {
  const setMobileNavModalToggleOpenHandle = useGlobalStore((state) => state.setMobileNavModalToggleOpenHandle);
  const { navList, userInfo } = props;
  const { redirectToUrl } = useRedirect();
  const { isLandingPage } = useCheckPathname();
  const missionData = useMissionCenterStore((state) => state.missionData);
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

  return (
    <div className="flex h-[4rem] w-full items-center justify-between overflow-hidden text-neutral-black shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
      <NavContainer
        isOpen={isOpen}
        toggleOpen={() => {
          setNavType(NavType.NAV_LIST);
          toggleOpen();
        }}
      >
        {navType === NavType.NAV_LIST && (
          <NavList
            navList={navList}
            toggleOpen={() => {
              toggleOpen();
            }}
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
        )}
        {navType === NavType.AUTH && (
          <Auth
            changeNavState={() => {
              toggleOpen();
              setNavType(NavType.NAV_LIST);
            }}
            {...moduleProps}
          ></Auth>
        )}
      </NavContainer>
      <div className="relative flex flex-1 items-center justify-center">
        <Image src={'/images/logo/black-icon-text-logo.svg'} alt="logo" width={184} height={22}></Image>
      </div>
    </div>
  );
};

export default Navbar;
