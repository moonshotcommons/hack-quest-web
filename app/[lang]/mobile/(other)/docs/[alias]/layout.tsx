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
    <div className="relative w-full">
      <div className="fixed top-0 z-50 flex w-full items-center bg-neutral-white">
        <NavBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      </div>
      <div id="content-scroll-wrap" className="m-auto w-full bg-neutral-off-white px-5 pb-5 pt-[5.25rem]">
        <DocsSidebar selectAlias={alias} open={sidebarOpen} />
        {children}
      </div>
    </div>
  );
};

export default DocsLayout;
