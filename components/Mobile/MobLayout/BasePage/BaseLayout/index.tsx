'use client';
import User from '@/components/Web/User';
import React, { ReactNode } from 'react';
import NavBar, { NavbarProps } from '../Navbar';

// import Breadcrumb from '@/components/Web/Business/Breadcrumb';
import { useCheckPathname, useCustomPathname } from '@/hooks/router/useCheckPathname';
import AIFloatButton from '@/components/Mobile/MobAI/AIFloatButton';

export interface V2LayoutProps {
  navbarData: NavbarProps;
  // footerData: IFooterProps;
  children: ReactNode;
}

const V2Layout: React.FC<V2LayoutProps> = ({ navbarData, children }) => {
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
        <div className="fixed top-0 z-50 flex w-full items-center bg-neutral-black">
          <NavBar {...navbarData}>
            <User></User>
          </NavBar>
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
