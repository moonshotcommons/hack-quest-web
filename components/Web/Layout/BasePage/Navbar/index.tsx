import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';

import Badge from '@/components/Common/Badge';

import { message } from 'antd';
import Link from 'next/link';
import { isBadgeIds, needLoginPath } from './data';
import { MenuLink, MenuType, NavbarListType } from './type';
import { useRedirect } from '@/hooks/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import { useCustomPathname } from '@/hooks/useCheckPathname';
import HackLogo from '@/public/images/logo/light-footer-logo.svg';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { LuChevronDown } from 'react-icons/lu';
import { useDebounceFn } from 'ahooks';
import DropDownMotion from '@/components/Common/DropDownMotion';

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
  const [curNavId, setCurNavId] = useState('');
  const [secondNavIndex, setSecondNavIndex] = useState<number>(-1);
  const missionData = useMissionCenterStore((state) => state.missionData);

  const [hoverNavId, setHoverNavId] = useState<null | string>(null);
  const { run: mouseLeaveNav } = useDebounceFn(
    () => {
      setHoverNavId(null);
    },
    { wait: 100 }
  );

  const setPlaygroundSelectModalOpen = useGlobalStore(
    (state) => state.setPlaygroundSelectModalOpen
  );

  useEffect(() => {
    for (let nav of navList) {
      const curNav = nav.menu.find((menu) =>
        pathname.includes(menu.path as MenuLink)
      );
      if (curNav) {
        setShowSecondNav?.(nav.menu.length > 1);
        setSecondNavData(nav.menu as []);
        setCurNavId(nav.id);
        return;
      }
    }
    setShowSecondNav?.(false);
    setSecondNavData([]);
    setCurNavId('');
  }, [pathname, navList]);

  // useEffect(() => {
  //   const index = navList.findIndex((v) => v.id === curNavId);
  //   setInSideNavIndex(index);
  // }, [curNavId, navList]);

  useEffect(() => {
    if (!showSecondNav) return;
    const index = secondNavData.findIndex((v) =>
      pathname.includes(v.path as MenuLink)
    );
    setSecondNavIndex(index);
  }, [pathname, showSecondNav, secondNavData, navList]);

  const handleClickNav = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    nav: NavbarListType
  ) => {
    if (nav.type === 'outSide') return;
    const path = nav.menu[0]?.path!;
    if (~needLoginPath.indexOf(path) && !userInfo) {
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
            <div className="body-s ml-[60px] flex h-full gap-[12px] text-neutral-off-black">
              {navList.map((nav) => (
                <div
                  key={nav.id}
                  className={`group  relative flex  h-full items-center  `}
                  data-id={nav.id}
                  onClick={(e) => handleClickNav(e, nav)}
                  onMouseEnter={() => {
                    mouseLeaveNav.cancel();
                    setHoverNavId(nav.id);
                  }}
                  onMouseLeave={mouseLeaveNav}
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
                  <DropDownMotion
                    open={nav.menu.length > 1 && hoverNavId === nav.id}
                    isNav={true}
                    className=" left-0  rounded-[16px] border border-neutral-light-gray bg-neutral-white p-[12px] shadow-[0_2px_2px_0_rgba(19,19,19,0.15)]"
                  >
                    {nav.type === 'outSide' ? (
                      <div className="flex gap-[24px]">
                        {nav.menu.map((menu) => (
                          <div
                            key={menu.id}
                            className=" body-s-bold text-neutral-medium-gray"
                          >
                            <p className="px-[12px] py-[8px]">{menu.label}</p>
                            {menu.outSide?.map((outside) =>
                              outside.id === 'playground' ? (
                                <div
                                  key={outside.link}
                                  className="mt-[8px] cursor-pointer rounded-[8px]  px-[12px] py-[8px] text-neutral-rich-gray hover:bg-neutral-off-white"
                                  onClick={() =>
                                    setPlaygroundSelectModalOpen(true)
                                  }
                                >
                                  {outside.label}
                                </div>
                              ) : (
                                <Link
                                  key={outside.link}
                                  href={outside.link!}
                                  target="_blank"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <p className="mt-[8px] cursor-pointer rounded-[8px] px-[12px]  py-[8px] text-neutral-rich-gray hover:bg-neutral-off-white">
                                    {outside.label}
                                  </p>
                                </Link>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex w-full flex-col gap-[8px]">
                        {nav.menu.map((menu, menuIndex) => (
                          <Link
                            key={menu.path}
                            href={menu.path!}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <div
                              className={` whitespace-nowrap rounded-[8px] px-[12px] py-[8px] hover:bg-neutral-off-white ${secondNavIndex === menuIndex && curNavId === nav.id ? 'bg-neutral-off-white' : ''}`}
                            >
                              <p className="body-s-bold text-neutral-rich-gray">
                                {menu.label}
                              </p>
                              <p className="body-xs text-neutral-medium-gray">
                                {menu.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </DropDownMotion>
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
