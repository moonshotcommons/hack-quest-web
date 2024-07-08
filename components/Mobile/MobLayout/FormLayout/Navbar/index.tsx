import Image from 'next/image';
import React, { ReactNode, useEffect, useState, FC, useContext } from 'react';
import { useCycle } from 'framer-motion';
import { IoExitOutline } from 'react-icons/io5';

import NavContainer from '../../BasePage/Navbar/NavContainer';
import NavList from '../../BasePage/Navbar/NavList';
import Auth from '../../BasePage/Navbar/Auth';
import UserModule from '../../BasePage/Navbar/UserModule';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useCheckPathname } from '@/hooks/router/useCheckPathname';
import { NavbarListType } from '@/components/Web/Layout/BasePage/Navbar/type';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { NavType } from '../../constant';

import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import emitter from '@/store/emitter';
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
  const { isLandingPage } = useCheckPathname();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
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

  const onExit = () => {
    emitter.emit('submit-form-exit');
  };

  return (
    <div className="flex h-[4rem] w-screen items-center justify-end overflow-hidden text-neutral-white">
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
      <div className="absolute left-1/2 top-1/2 flex flex-1 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <Image src={'/images/logo/white-icon-text-logo.svg'} alt="logo" width={184} height={22}></Image>
      </div>
      <span className="flex items-center gap-2 pr-5 capitalize text-neutral-white" onClick={onExit}>
        <IoExitOutline color="white" size={29} />
      </span>
    </div>
  );
};

export default Navbar;
