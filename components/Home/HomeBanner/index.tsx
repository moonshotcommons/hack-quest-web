import RightIcon from '@/components/Common/Icon/Right';
import SkipIcon from '@/components/Common/Icon/Skip';
import PeopleJoined from '@/components/Common/PeopleJoined';
import { getRandomPeopleAvatars } from '@/helper/random';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import BannerBg from '@/public/images/home/landing-back.png';
import Link from 'next/link';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import Button from '@/components/Common/Button';
interface HomeBannerProps {}

const HomeBanner: FC<HomeBannerProps> = (props) => {
  const userInfo = useGetUserInfo();

  return (
    <div className="relative z-10">
      <div className="absolute -right-[10.25rem] top-0 z-[1]">
        <div className="bg-gradient-to-b from-transparent to-black w-full h-full absolute top-0 left-[50%] -translate-x-[50%]"></div>
        <Image src={BannerBg} alt="bg" className="z-0"></Image>
      </div>
      <div className="relative left-0 top-0 z-[999] uppercase">
        <h1 className="text-text-default-color  font-next-book-bold text-[80px] font-bold pt-[12.56rem] leading-[110%]">
          Web3.0 <br />
          Programming
          <br />
          For<span className="text-primary-color"> Everyone</span>
        </h1>
        <div className="flex gap-[1.25rem] mt-[2.75rem]">
          <PeopleJoined avatars={getRandomPeopleAvatars()}></PeopleJoined>
          <div className="w-[9.6875rem] text-text-default-color font-next-book text-[1rem] ">
            What we offer...
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
                className="text-neutral-white bg-neutral-black"
              >
                Login
              </Button>
            </Link>
          )}
          {userInfo && (
            <Link href={'/dashboard'}>
              <div className="flex items-center w-fit px-[2.5rem] py-[1.25rem] font-next-book text-[#F5F5F5] text-[1rem] rounded-[5rem] border border-solid border-[#F5F5F5] gap-[0.62rem] hover:text-black hover:bg-[#D9D9D9] cursor-pointer">
                <div>Dashboard</div>
                <RightIcon></RightIcon>
              </div>
            </Link>
          )}
          <Link href={'/courses'}>
            <div className="flex w-fit text-[#F5F5F5] font-next-book text-[1.25rem] items-center gap-[0.31rem]">
              <div>
                <span>Explore All Course</span>
                <span className="block h-[.0625rem] w-full bg-[#595959]"></span>
              </div>
              <SkipIcon></SkipIcon>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
