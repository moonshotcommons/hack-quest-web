import React from 'react';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
export interface UnitLayoutProps {
  // footerData: IFooterProps;
  children: JSX.Element;
}

const UnitLayout: React.FC<UnitLayoutProps> = ({ children }) => {
  return (
    <div className={`w-full min-h-screen bg-black ${inter.className}`}>
      <div className="w-[91rem] m-auto">
        <main>{children}</main>
        {/* <Footer {...footerData} /> */}
      </div>
    </div>
  );
};

export default UnitLayout;
