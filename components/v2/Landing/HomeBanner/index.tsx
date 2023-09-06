import Auth from '@/components/v2/Auth';
import { useGetUserInfo, useGetUserUnLoginType } from '@/hooks/useGetUserInfo';
import Astronaut from '@/public/images/landing/astronaut.png';
import Image from 'next/image';
import { FC } from 'react';
interface HomeBannerProps {}

const HomeBanner: FC<HomeBannerProps> = (props) => {
  const userInfo = useGetUserInfo();
  const unLoginType = useGetUserUnLoginType();

  return (
    <div
      className="h-[850px] flex justify-center w-full pt-[214px]"
      style={{
        backgroundImage: `url('/images/landing/banner_bg.png')`,
        backgroundSize: '1440px 100%',
        backgroundRepeat: 'repeat'
      }}
    >
      <div className="container flex justify-between w-full">
        <div className="flex flex-col h-full justify-between">
          <h1 className="text-landing-banner-intr-color  font-next-book-bold text-[48px] tracking-[2.28px] leading-[110%] uppercase">
            Web3.0 <br />
            Programming
            <br />
            For<span className="text-primary-color"> Everyone</span>
          </h1>
          <div className="pl-[90px]">
            <Image src={Astronaut} alt="astronaut" width={138}></Image>
          </div>
        </div>
        <div className="w-[400px]">
          <Auth />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
