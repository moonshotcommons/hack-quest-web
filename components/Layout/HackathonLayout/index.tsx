import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
const inter = Inter({ subsets: ['latin'] });

export interface HackathonLayoutProps {
  // footerData: IFooterProps;
  children: ReactNode;
}

const formatSize = (s: number | string) => {
  if (typeof s === 'string') s = parseInt(s);
  return `${(s / 1728) * 100}vw`;
};

const HackathonLayout: React.FC<HackathonLayoutProps> = ({ children }) => {
  return (
    <div
      className={`w-full min-h-screen h-full ${inter.className} m-auto bg-[red] bg-no-repeat`}
    >
      {children}
    </div>
  );
};

export default HackathonLayout;
