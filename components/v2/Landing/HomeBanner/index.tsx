import RightIcon from '@/components/Common/Icon/Right';
import SkipIcon from '@/components/Common/Icon/Skip';
import PeopleJoined from '@/components/Common/PeopleJoined';
import { getRandomPeopleAvatars } from '@/helper/random';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import BannerBg from '@/public/images/home/landing-back.png';
import Link from 'next/link';
import { useGetUserInfo, useGetUserUnLoginType } from '@/hooks/useGetUserInfo';
import Button from '@/components/Common/Button';
import Auth from '@/components/v2/Auth';
interface HomeBannerProps {}

const HomeBanner: FC<HomeBannerProps> = (props) => {
  const userInfo = useGetUserInfo();
  const unLoginType = useGetUserUnLoginType();

  return (
    <div className="h-[850px] flex justify-center bg-black pt-[214px]">
      <div className="container flex justify-between ">
        <div>
          <h1 className="text-text-default-color  font-next-book text-[80px] font-bold pt-[12.56rem] leading-[110%] uppercase">
            Web3.0 <br />
            Programming
            <br />
            For<span className="text-primary-color"> Everyone</span>
          </h1>
          <div className="flex gap-[1.25rem] mt-[2.75rem] z-50">
            <PeopleJoined avatars={getRandomPeopleAvatars()}></PeopleJoined>
            <div className="w-[9.6875rem] text-text-default-color font-next-book text-[1rem] leading-[125%] tracking-[.02rem]">
              Join the Hackquest community
            </div>
          </div>
        </div>
        <Auth />
      </div>
    </div>
  );
};

export default HomeBanner;
