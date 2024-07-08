'use client';
import React, { ReactNode } from 'react';
import NavBar, { NavbarProps } from '../Navbar';

// import Breadcrumb from '@/components/Web/Business/Breadcrumb';
import { useCheckPathname, useCustomPathname } from '@/hooks/router/useCheckPathname';
import AIFloatButton from '@/components/Mobile/MobAI/AIFloatButton';
import { LoginResponse } from '@/service/webApi/user/type';

export interface V2LayoutProps {
  navbarData: Omit<NavbarProps, 'userInfo'>;
  // footerData: IFooterProps;
  children: ReactNode;
  userInfo: Partial<LoginResponse> | null;
}

const V2Layout: React.FC<V2LayoutProps> = ({ navbarData, children, userInfo }) => {
  const pathname = useCustomPathname();
  const { isNavbarFullPage, isExcludeBreadcrumbLink } = useCheckPathname();
  // const renderBreadcrumb = useCallback(() => {
  //   const { navList } = navbarData;
  //   if (isExcludeBreadcrumbLink) {
  //     return null;
  //   }

  //   for (let menu of navList) {
  //     if (menu.menu.some((v) => v.path === pathname)) {
  //       return null;
  //     }
  //   }

  //   return (
  //     <div className="container mx-auto">
  //       <Suspense>
  //         <Breadcrumb />
  //       </Suspense>
  //     </div>
  //   );
  // }, [pathname, navbarData, isExcludeBreadcrumbLink]);

  return (
    <div className={`relative w-full  `}>
      <AIFloatButton>
        <div className="fixed top-0 z-50 flex w-full items-center bg-neutral-white">
          <NavBar {...navbarData} userInfo={userInfo} />
        </div>
        <div
          id="content-scroll-wrap"
          className={`m-auto w-full pt-[4rem]  ${isNavbarFullPage ? 'bg-[white]' : 'bg-neutral-off-white'}`}
        >
          {children}
        </div>

        {/* <div
        id="content-scroll-wrap"
        className={`m-auto w-full flex-1 overflow-auto  ${
          isNavbarFullPage ? 'bg-[white]' : 'bg-neutral-off-white'
        }`}
      ></div> */}
      </AIFloatButton>
    </div>
  );
};

export default V2Layout;
