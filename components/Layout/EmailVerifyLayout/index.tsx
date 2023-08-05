import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
const inter = Inter({ subsets: ['latin'] });
// import LoginBgLine from '@/public/images/login/login_bg_line.svg';
// import LoginMoon from '@/public/images/login/login_moon.svg';
import LightBg from '@/public/images/login/light-bg.svg';
export interface EmailVerifyLayoutProps {
  // footerData: IFooterProps;
  children: ReactNode;
}

const EmailVerifyLayout: React.FC<EmailVerifyLayoutProps> = ({ children }) => {
  return (
    <div
      className={`w-full min-h-screen bg-auth-global-bg ${inter.className} bg-cover bg-no-repeat flex justify-center items-center`}
    >
      <main className="w-full max-w-[36.3125rem]  min-h-screen flex flex-col justify-between">
        <div className="flex-1 h-full w-full flex justify-center items-center">
          {children}
        </div>
        <ul className="w-full text-text-default-color py-[3.75rem] flex flex-row justify-between">
          <li>© HackQuest</li>
          <li>Contact</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
        </ul>
      </main>
      {/* <Footer {...footerData} /> */}
    </div>
  );
};

export default EmailVerifyLayout;
