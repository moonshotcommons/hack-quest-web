import React, { ReactNode } from 'react';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
export interface LoginLayoutProps {
  // footerData: IFooterProps;
  children: ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    // bg-[url('/images/login/bg.svg')] bg-no-repeat bg-cover
    <div className={`w-full min-h-screen bg-black ${inter.className}`}>
      <main>{children}</main>
      {/* <Footer {...footerData} /> */}
    </div>
  );
};

export default LoginLayout;
