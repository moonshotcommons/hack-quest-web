'use client';
import { FC, ReactNode, useState } from 'react';
import DocsSidebar from './components/DocsSidebar';
import NavBar from './components/Navbar';

interface DocsLayoutProps {
  children: ReactNode;
  params: { alias: string };
}

const DocsLayout: FC<DocsLayoutProps> = ({ children, params: { alias } }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // <div className="flex w-full justify-between bg-neutral-white">
    //   <DocsSidebar selectAlias={alias} />
    //   <div className="flex-1 pl-[296px]">{children}</div>
    // </div>
    <div className={`relative w-full`}>
      <div className="fixed top-0 z-50 flex w-full items-center bg-neutral-black">
        <NavBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      </div>
      <div id="content-scroll-wrap" className={`m-auto w-full bg-white pt-[4rem]`}>
        {/* <AIFloatButton pageType="learn"> */}
        <DocsSidebar selectAlias={alias} open={sidebarOpen} />
        {children}
        {/* </AIFloatButton> */}
      </div>
    </div>
  );
};

export default DocsLayout;
