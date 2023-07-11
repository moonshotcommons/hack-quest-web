import React, { ReactNode } from 'react';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
export interface UnitLayoutProps {
  // footerData: IFooterProps;
  children: ReactNode;
}

const UnitLayout: React.FC<UnitLayoutProps> = ({ children }) => {
  return (
    <div className={`w-full min-h-screen bg-black ${inter.className}`}>
      <div className="px-[4.5rem] m-auto">
        <main>{children}</main>
        {/* <Footer {...footerData} /> */}
      </div>
    </div>
  );
};

export default UnitLayout;
