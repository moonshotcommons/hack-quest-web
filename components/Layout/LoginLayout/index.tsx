import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
const inter = Inter({ subsets: ['latin'] });
import LoginBgLine from '@/public/images/login/login_bg_line.svg';
import LoginMoon from '@/public/images/login/login_moon.svg';
export interface LoginLayoutProps {
  // footerData: IFooterProps;
  children: ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div
      className={`w-full min-h-screen bg-black ${inter.className} bg-[url("/images/login/login-back-show.png")] bg-cover bg-no-repeat`}
    >
      <div className="absolute w-full h-full bottom-0 left-0">
        <Image
          src={LoginMoon}
          alt="bg"
          width={858.85}
          height={792.21}
          className="absolute bottom-0 left-0"
        ></Image>
        <Image
          src={LoginBgLine}
          alt="bg"
          className="absolute scale-[1] bottom-0 0 left-[0rem]"
          width={949}
          height={949}
        ></Image>
        <h1 className="absolute text-[4.6985rem] text-[#EDEDED] left-[5.31rem] top-[13.19rem] font-neuemachina-light w-[23.375rem] leading-[102%]">{`Let's Begin the </Quest>!`}</h1>
      </div>
      <main className="relative w-full h-full min-h-screen">{children}</main>
      {/* <Footer {...footerData} /> */}
    </div>
  );
};

export default LoginLayout;
