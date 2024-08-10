import Image from 'next/image';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import Badge from '@/components/Common/Badge';
import message from 'antd/es/message';
import Link from 'next/link';
import { isBadgeIds, needLoginPath } from './data';
import { NavbarListType } from './type';
import { useRedirect } from '@/hooks/router/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';
import HackLogo from '@/public/images/logo/hackquest_logo.png';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { LuChevronDown } from 'react-icons/lu';
import { useDebounceFn } from 'ahooks';
import DropDownMotion from '@/components/Common/DropDownMotion';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/helper/utils';
import { LoginResponse } from '@/service/webApi/user/type';

export interface NavBarProps {
  navList: NavbarListType[];
  children?: ReactNode;
  logo?: ReactNode;
  userInfo: Partial<LoginResponse> | null;
}

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);

  const { navList, children, userInfo } = NavBarProps;
  const { redirectToUrl } = useRedirect();
  const pathname = useCustomPathname();
  const [curNavId, setCurNavId] = useState('');
  const [curMenuId, setCurMenuId] = useState('');
  const missionData = useMissionCenterStore((state) => state.missionData);

  const [hoverNavId, setHoverNavId] = useState<null | string>(null);
  const { run: mouseLeaveNav } = useDebounceFn(
    () => {
      setHoverNavId(null);
    },
    { wait: 100 }
  );

  const setPlaygroundSelectModalOpen = useGlobalStore((state) => state.setPlaygroundSelectModalOpen);
  const { setAuthModalOpen, setAuthType } = useUserStore(
    useShallow((state) => ({
      setAuthModalOpen: state.setAuthModalOpen,
      setAuthType: state.setAuthType
    }))
  );

  useEffect(() => {
    let menuId = '';
    for (let nav of navList) {
      const curNav = nav.menu.find((menu) => {
        if (menu?.menu?.length) {
          return menu.menu?.find((m) => {
            // Nested routing
            if (pathname.includes(m.path as string)) {
              menuId = m.id || '';
              return true;
            }
          });
        } else if (pathname.includes(menu.path as string)) {
          menuId = menu.id || '';
          return true;
        }
      });
      if (curNav) {
        setCurNavId(nav.id);
        setCurMenuId(menuId);
        return;
      }
    }
    setCurNavId('');
    setCurMenuId('');
  }, [pathname, navList]);

  const handleClickNav = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, nav: NavbarListType) => {
    if (nav.id === 'more') return;
    const path = nav.menu[0]?.path!;
    // Disable same URL
    if (path === pathname) return;
    if (~needLoginPath.indexOf(path) && !userInfo) {
      message.warning('Please login first');
      setAuthType(AuthType.LOGIN);
      setAuthModalOpen(true);
      return;
    }
    redirectToUrl(path);
  };
  const logoClick = () => {
    redirectToUrl('/');
  };
  return (
    <div className="relative z-[999] h-[64px] w-full border-b border-neutral-light-gray bg-neutral-white text-neutral-off-black">
      <div className="container mx-auto h-full">
        <React.Suspense fallback={null}>
          <div className="flex h-full items-center justify-between">
            <nav className="flex h-full items-center text-neutral-white">
              <div className={`flex h-full cursor-pointer items-center`} onClick={logoClick}>
                <Image src={HackLogo} width={133} alt="logo"></Image>
              </div>
              <div className="body-s ml-[60px] flex h-full gap-3 text-neutral-off-black">
                {navList.map((nav) => (
                  <div
                    key={nav.id}
                    className="group relative flex h-full items-center"
                    data-id={nav.id}
                    onClick={(e) => handleClickNav(e, nav)}
                    onMouseEnter={() => {
                      mouseLeaveNav.cancel();
                      setHoverNavId(nav.id);
                    }}
                    onMouseLeave={mouseLeaveNav}
                  >
                    <div
                      className={cn(
                        'group-hover:body-s-bold flex cursor-pointer items-center gap-1 rounded-[32px] px-4 py-1',
                        {
                          'body-s-bold bg-yellow-light': curNavId === nav.id
                        }
                      )}
                    >
                      <div className="relative capitalize">
                        <span>{t(nav.label)}</span>
                        {~isBadgeIds.indexOf(nav.id) && userInfo ? (
                          <Badge count={missionData?.unClaimAll?.length || 0} />
                        ) : null}
                      </div>
                      {nav.menu.length > 1 && (
                        <LuChevronDown size={16} className="transition-all group-hover:rotate-180" />
                      )}
                    </div>
                    <DropDownMotion
                      open={nav.menu.length > 1 && hoverNavId === nav.id}
                      isNav={true}
                      className="left-0 rounded-2xl border border-neutral-light-gray bg-neutral-white p-3 shadow-[0_2px_2px_0_rgba(19,19,19,0.15)]"
                    >
                      {nav.id === 'more' ? (
                        <div className="flex gap-6">
                          {nav.menu.map((menu) => (
                            <div key={menu.id} className=" body-s-bold text-neutral-medium-gray">
                              <p className="whitespace-nowrap px-3 py-2">{t(menu.label)}</p>
                              {menu.menu?.map((more) =>
                                more.id === 'playground' ? (
                                  <div
                                    key={more.id}
                                    className="mt-[8px] cursor-pointer whitespace-nowrap rounded-[8px] px-3 py-2 text-neutral-rich-gray hover:bg-neutral-off-white"
                                    onClick={() => setPlaygroundSelectModalOpen(true)}
                                  >
                                    {t(more.label)}
                                  </div>
                                ) : (
                                  <Link
                                    key={more.id}
                                    href={(more.link || more.path) as string}
                                    target={more.outSide ? '_blank' : '_self'}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setHoverNavId(null);
                                    }}
                                  >
                                    <p
                                      className={cn(
                                        'mt-2 flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[8px] px-3 py-2 text-neutral-rich-gray hover:bg-neutral-off-white',
                                        {
                                          'bg-neutral-off-white': curMenuId === more.id && curNavId === nav.id
                                        }
                                      )}
                                    >
                                      {more.icon}
                                      <span>{t(more.label)}</span>
                                    </p>
                                  </Link>
                                )
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {nav.menu.map((menu) => (
                            <Link
                              key={menu.id}
                              href={menu.path === pathname ? '#' : menu.path!}
                              onClick={(e) => {
                                setHoverNavId(null);
                                e.stopPropagation();
                              }}
                            >
                              <div
                                className={cn(
                                  'flex items-center gap-4 rounded-[8px] px-3 py-2 hover:bg-neutral-off-white',
                                  {
                                    'bg-neutral-off-white': curMenuId === menu.id && curNavId === nav.id
                                  }
                                )}
                              >
                                <div className="h-8 w-8">
                                  <Image
                                    className="flex-shrink-0"
                                    src={`/images/navbar/${menu.id}.svg`}
                                    width={32}
                                    height={32}
                                    alt={menu.label}
                                  />
                                </div>
                                <div className="flex w-full flex-1 flex-col whitespace-nowrap">
                                  <p className="body-s-bold text-neutral-rich-gray">{t(menu.label)}</p>
                                  <p className="body-xs text-neutral-medium-gray">{t(menu.description)}</p>
                                </div>
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
        </React.Suspense>
      </div>
    </div>
  );
};

export default NavBar;
