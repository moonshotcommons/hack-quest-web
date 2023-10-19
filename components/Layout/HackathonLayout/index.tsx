import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Countdown from '@/components/event/hackathon/Countdown';
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
      className={`w-full min-h-screen h-full ${inter.className} m-auto relative bg-[#1f1920] bg-no-repeat`}
    >
      {children}
      <footer className="pl-[calc((75/1728)*100vw)] pr-[calc((92/1728)*100vw)] m-auto h-[calc((549/1728)*100vw)] z-50 text-[calc((200/1728)*100vw)] flex justify-between">
        <div className="mt-[calc((318/1728)*100vw)] flex flex-col gap-[calc((36/1728)*100vw)]">
          <Countdown></Countdown>
          <div className="text-[#cd9df2cc] text-[calc((16/1728)*100vw)] leading-[120%] font-bold">
            Copyright © 2023 Moonshot Global, LLC.
          </div>
        </div>
        <div className="mt-[calc((390/1728)*100vw)] flex gap-[calc((88/1728)*100vw)] text-[#cd9df2cc]">
          <div className="text-[calc((10/1728)*100vw)] flex gap-[calc((20/1728)*100vw)] border h-fit px-[calc((15/1728)*100vw)] py-[calc((5/1728)*100vw)] rounded-full font-Chaney">
            <span>Nitro hackathon</span>
            <span>2023</span>
          </div>
          <div>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 29C22.732 29 29 22.732 29 15C29 7.26801 22.732 1 15 1C7.26801 1 1 7.26801 1 15C1 22.732 7.26801 29 15 29ZM15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
                fill="#CD9DF2"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 11.5C11.7239 11.5 11.5 11.7239 11.5 12V18C11.5 18.2761 11.7239 18.5 12 18.5C12.2761 18.5 12.5 18.2761 12.5 18V13.2071L17.5053 18.2124C17.7006 18.4077 18.0172 18.4077 18.2124 18.2124C18.4077 18.0172 18.4077 17.7006 18.2124 17.5053L13.2071 12.5H18C18.2761 12.5 18.5 12.2761 18.5 12C18.5 11.7239 18.2761 11.5 18 11.5H12Z"
                fill="#CD9DF2"
              />
            </svg>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HackathonLayout;
