import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
const inter = Inter({ subsets: ['latin'] });
// import LoginBgLine from '@/public/images/login/login_bg_line.svg';
// import LoginMoon from '@/public/images/login/login_moon.svg';
import LightBg from '@/public/images/login/light-bg.svg';
export interface LoginLayoutProps {
  // footerData: IFooterProps;
  children: ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div
      className={`w-full relative min-h-screen bg-default-global-bg ${inter.className} bg-cover bg-no-repeat`}
    >
      <div className="fixed w-full bottom-0 left-0">
        <Image
          src={LightBg}
          alt="bg"
          className="absolute bottom-0 left-[0]"
        ></Image>
        {/* <Image
          src={LoginBgLine}
          alt="bg"
          className="absolute scale-[1] bottom-0 0 left-[0rem]"
          width={949}
          height={949}
        ></Image> */}
        {/* <h1 className="absolute text-[4.6985rem] text-[#EDEDED] left-[5.31rem] top-[13.19rem] font-neuemachina-light w-[23.375rem] leading-[102%]">{`Let's Begin the </Quest>!`}</h1> */}
      </div>
      <main className="absolute w-[47.25vw] h-full max-h-screen overflow-y-auto top-0 right-0 flex flex-col px-[6.875rem]">
        <div className="flex-1">{children}</div>
        <ul className="text-text-default-color py-[3.75rem] flex flex-row justify-between">
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

export default LoginLayout;
