import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';

import Badge from '@/components/Common/Badge';

import { message } from 'antd';
import Link from 'next/link';
import { isBadgeIds, needLoginPath } from './data';
import { MenuType, NavbarListType } from './type';
import { useRedirect } from '@/hooks/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import { useCustomPathname } from '@/hooks/useCheckPathname';
import HackLogo from '@/public/images/logo/light-footer-logo.svg';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { LuChevronDown } from 'react-icons/lu';

export interface NavBarProps {
  navList: NavbarListType[];
  children?: ReactNode;
  logo?: ReactNode;
}

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const userInfo = useUserStore((state) => state.userInfo);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const setAuthType = useUserStore((state) => state.setAuthType);

  const { navList, children } = NavBarProps;
  const { redirectToUrl } = useRedirect();
  const pathname = useCustomPathname();
  const [showSecondNav, setShowSecondNav] = useState(false);
  const [secondNavData, setSecondNavData] = useState<MenuType[]>([]);
  const [secondLabel, setSecondLabel] = useState('');
  const [curNavId, setCurNavId] = useState('');
  const [inSideNavIndex, setInSideNavIndex] = useState<number>(-1);
  const [secondNavIndex, setSecondNavIndex] = useState<number>(-1);
  const missionData = useMissionCenterStore((state) => state.missionData);

  const setPlaygroundSelectModalOpen = useGlobalStore(
    (state) => state.setPlaygroundSelectModalOpen
  );

  useEffect(() => {
    for (let nav of navList) {
      const curNav = nav.menu.find((menu) => pathname.includes(menu.path));
      if (curNav) {
        setShowSecondNav?.(nav.menu.length > 1);
        setSecondNavData(nav.menu as []);
        setSecondLabel(nav.label);
        setCurNavId(nav.id);
        return;
      }
    }
    setShowSecondNav?.(false);
    setSecondNavData([]);
    setSecondLabel('');
    setCurNavId('');
  }, [pathname, navList]);

  useEffect(() => {
    const index = navList.findIndex((v) => v.id === curNavId);
    setInSideNavIndex(index);
  }, [curNavId, navList]);

  useEffect(() => {
    if (!showSecondNav) return;
    const index = secondNavData.findIndex((v) => pathname.includes(v.path));
    setSecondNavIndex(index);
  }, [pathname, showSecondNav, secondNavData, navList]);

  const handleClickNav = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    nav: NavbarListType
  ) => {
    if (nav.type === 'outSide') {
      e.stopPropagation();
      if (nav.id === 'playground') {
        setPlaygroundSelectModalOpen(true);
        return;
      } else {
        window.open(nav.link);
      }
    }

    const path = nav.menu[0]?.path;
    if (~needLoginPath.indexOf(path) && !userInfo) {
      e.stopPropagation();
      message.warning('Please login first');
      setAuthType(AuthType.LOGIN);
      setAuthModalOpen(true);
      return;
    }
    redirectToUrl(path);
  };
  const logoClick = () => {
    // if (userInfo) return;
    // setAuthType(AuthType.LOGIN);
    // setAuthModalOpen(true);
    redirectToUrl('/');
  };
  return (
    <div className="relative z-[999] h-[64px]  w-full border-b border-neutral-light-gray bg-neutral-white text-neutral-off-black">
      <div className={`container mx-auto h-full`}>
        <div className="flex h-full items-center justify-between">
          <nav className="flex h-full items-center text-neutral-white">
            <div
              className={`flex h-full cursor-pointer items-center`}
              onClick={logoClick}
            >
              <Image src={HackLogo} width={133} alt="logo"></Image>
            </div>
            <div className="body-s ml-[60px] flex h-full gap-[28px] text-neutral-off-black">
              {navList.map((nav) => (
                <div
                  key={nav.id}
                  className={`group  relative flex  h-full items-center  `}
                  data-id={nav.id}
                  onClick={(e) => handleClickNav(e, nav)}
                >
                  <div
                    className={`group-hover:body-s-bold  flex cursor-pointer items-center gap-[4px] rounded-[32px] px-[16px]  py-[4px]  ${
                      curNavId === nav.id
                        ? 'body-s-bold bg-yellow-light'
                        : 'group-hover:bg-neutral-off-white'
                    }`}
                  >
                    <div className="relative">
                      <span>{nav.label}</span>
                      {~isBadgeIds.indexOf(nav.id) && userInfo ? (
                        <Badge count={missionData?.unClaimAll?.length || 0} />
                      ) : null}
                    </div>
                    {nav.menu.length > 1 && (
                      <LuChevronDown
                        size={16}
                        className="transition-all group-hover:rotate-180"
                      />
                    )}
                  </div>
                  {nav.menu.length > 1 && (
                    <div className="absolute left-0 top-[60px] hidden  w-[268px] rounded-[16px] border border-neutral-light-gray bg-neutral-white p-[12px] shadow-[0_2px_2px_0_rgba(19,19,19,0.15)] group-hover:block">
                      {nav.menu.map((nav, navIndex) => (
                        <Link
                          key={nav.path}
                          href={nav.path}
                          className={`mb-[8px] cursor-pointer rounded-[8px] px-[12px] py-[8px] hover:bg-neutral-off-white ${secondNavIndex === navIndex ? 'bg-neutral-off-white' : ''}`}
                        >
                          <p className="body-s-bold text-neutral-rich-gray">
                            {nav.label}
                          </p>
                          <p className="body-xs text-neutral-medium-gray">
                            {nav.label}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
          {children}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
