import RightIcon from '@/components/v2/Common/Icon/Right';
import SkipIcon from '@/components/v2/Common/Icon/Skip';
import PeopleJoined from '@/components/v2/Common/PeopleJoined';
import { getRandomPeopleAvatars } from '@/helper/random';
import Image from 'next/image';
import { FC } from 'react';
import BannerBg from '@/public/images/home/landing-back.png';
import Link from 'next/link';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import Button from '@/components/v2/Common/Button';
interface HomeBannerProps {}

const HomeBanner: FC<HomeBannerProps> = (props) => {
  const userInfo = useGetUserInfo();

  return (
    <div className="relative z-10">
      <div className="absolute -right-[10.25rem] top-0 z-[1]">
        <div className="bg-gradient-to-b from-transparent to-landing-banner-gradient-to w-full h-full absolute top-0 left-[50%] -translate-x-[50%]"></div>
        <Image src={BannerBg} alt="bg" className="z-0"></Image>
      </div>
      <div className="relative left-0 top-0 z-[999] ">
        <h1 className="text-text-default-color  font-next-book text-[80px] font-bold pt-[12.56rem] leading-[110%] uppercase">
          Web3.0 <br />
          Programming
          <br />
          For<span className="text-yellow-primary"> Everyone</span>
        </h1>
        <div className="flex gap-[1.25rem] mt-[2.75rem] z-50">
          <PeopleJoined avatars={getRandomPeopleAvatars()}></PeopleJoined>
          <div className="w-[9.6875rem] text-text-default-color font-next-book text-[1rem] leading-[125%] tracking-[.02rem]">
            Join the Hackquest community
          </div>
        </div>
        <div className="flex items-center gap-8 mt-[3.62rem]">
          {!userInfo && (
            <Link href={'/auth/login'}>
              {/* <div className="flex items-center w-fit px-[2.5rem] py-[1.25rem] font-next-book text-[#F5F5F5] text-[1rem] rounded-[5rem] border border-solid border-[#F5F5F5] gap-[0.62rem] hover:text-black hover:bg-[#D9D9D9] cursor-pointer">
                <div>Login</div>
                <RightIcon></RightIcon>
              </div> */}
              <Button
                icon={<RightIcon />}
                iconPosition="right"
                className="
                border
                text-landing-banner-login-button-text-color
                bg-landing-banner-login-button-bg
                border-landing-banner-login-button-border-color
                "
              >
                Login
              </Button>
            </Link>
          )}
          {userInfo && (
            <Link href={'/dashboard'}>
              {/* <div className="flex items-center w-fit px-[2.5rem] py-[1.25rem] font-next-book text-landing-banner-login-button-text-color text-[1rem] rounded-[5rem] border border-solid border-landing-banner-login-button-border-color gap-[0.62rem] hover:text-black hover:bg-[#D9D9D9] cursor-pointer">
                <div>Dashboard</div>
                <RightIcon></RightIcon>
              </div> */}
              <Button
                icon={<RightIcon />}
                iconPosition="right"
                className="
                border
                text-landing-banner-login-button-text-color
                bg-landing-banner-login-button-bg
                border-landing-banner-login-button-border-color
                "
              >
                Dashboard
              </Button>
            </Link>
          )}
          <Link href={'/courses'}>
            <div className="flex w-fit text-text-default-color font-next-book text-[1.25rem] items-center gap-[0.31rem]">
              <div>
                <span>Explore All Course</span>
                <span className="block h-[.125rem] w-full bg-yellow-primary"></span>
              </div>
              <SkipIcon color="currentColor"></SkipIcon>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
