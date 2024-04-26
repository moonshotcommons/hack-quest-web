import React, { FC, ReactNode } from 'react';
import SubmitLayoutNavbar from '../../components/Navbar';

interface SubmitLayoutProps {
  children: ReactNode;
}

const SubmitLayout: FC<SubmitLayoutProps> = ({ children }) => {
  const loading = false;
  return (
    <div className="flex h-full w-full flex-col">
      <div className="fixed top-0 z-[99] w-full">
        <SubmitLayoutNavbar />
      </div>
      <div className="flex h-full min-h-screen w-full items-center justify-center bg-neutral-off-white pt-16">
        {children}
      </div>
    </div>
  );
};

export default SubmitLayout;
