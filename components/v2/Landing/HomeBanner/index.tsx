import Auth from '@/components/v2/Auth';
import Astronaut from '@/public/images/landing/astronaut.png';
import BannerBg from '@/public/images/landing/banner_bg.png';
import Image from 'next/image';
import { FC } from 'react';
interface HomeBannerProps {}

const HomeBanner: FC<HomeBannerProps> = (props) => {
  return (
    <div
      className="h-[850px] flex justify-center w-full pt-[214px] slab:pt-[50px]"
      style={{
        backgroundImage: `url(${BannerBg.src})`,
        backgroundSize: '100% auto',
        backgroundPosition: 'center'
      }}
    >
      <div className="container flex justify-between w-full slab:hidden">
        <div className="flex flex-col h-full justify-between">
          <h1 className="text-landing-banner-intr-color  font-next-book-bold text-[48px] tracking-[2.4px] leading-[140%] uppercase">
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
      <div className="hidden slab:block w-full h-full px-[20px] relative max-w-[640px]">
        <h1 className="slab:container mx-auto text-landing-banner-intr-color  font-next-book-bold text-[24px] tracking-[2.4px] leading-[140%] uppercase">
          Web3.0 Programming
          <br />
          For<span className="text-primary-color"> Everyone</span>
        </h1>
        <div className="w-full mt-[60px]">
          <Auth />
        </div>
        <div className="absolute bottom-0 left-[20px]">
          <Image src={Astronaut} alt="astronaut" width={138}></Image>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
