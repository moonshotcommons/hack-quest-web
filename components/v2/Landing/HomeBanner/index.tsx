import PeopleJoined from '@/components/Common/PeopleJoined';
import { getRandomPeopleAvatars } from '@/helper/random';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import { useGetUserInfo, useGetUserUnLoginType } from '@/hooks/useGetUserInfo';
import Auth from '@/components/v2/Auth';
import Astronaut from '@/public/images/landing/astronaut.png';
interface HomeBannerProps {}

const HomeBanner: FC<HomeBannerProps> = (props) => {
  const userInfo = useGetUserInfo();
  const unLoginType = useGetUserUnLoginType();

  return (
    <div className="h-[850px] flex justify-center bg-black pt-[214px]">
      <div className="container flex justify-between ">
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
        <Auth />
      </div>
    </div>
  );
};

export default HomeBanner;
