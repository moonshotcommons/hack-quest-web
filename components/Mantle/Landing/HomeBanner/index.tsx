'use client';
import Auth from '@/components/Mantle/Auth';
import { useGetUserInfo, useGetUserUnLoginType } from '@/hooks/useGetUserInfo';
import useIsPc from '@/hooks/useIsPc';
import Astronaut from '@/public/images/landing/astronaut.png';
import BannerBg from '@/public/images/mantle/banner_bg.jpg';
import BannerBgWap from '@/public/images/mantle/banner_bg_wap.png';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { FiX } from 'react-icons/fi';
import Button from '@/components/Mantle/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
interface HomeBannerProps {}

const logo = (
  <svg
    width="134"
    height="14"
    viewBox="0 0 134 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.2748 0.41626V13.5842H10.7803V8.73035H5.38272V13.5842H0.888184V0.41626H5.38272V5.25107H10.7803V0.41626H15.2748Z"
      fill="white"
    />
    <path
      d="M25.5644 12.2487H23.5475C22.7152 12.2487 21.9855 12.797 21.7711 13.5842H17.1033L21.022 0.41626H28.0899L32.0086 13.5842H27.3408C27.1253 12.7958 26.3968 12.2487 25.5644 12.2487ZM26.0159 8.73147L24.7105 3.89666H24.4026L23.0971 8.73147H26.0159Z"
      fill="white"
    />
    <path
      d="M32.3087 6.99015C32.3087 3.12568 35.5204 0 39.4665 0C41.5084 0 43.3325 0.83444 44.6412 2.15525L41.4095 5.35931C40.934 4.81532 40.2397 4.48569 39.4665 4.48569C38.0589 4.48569 36.9091 5.61171 36.9091 6.99015C36.9091 8.36858 38.0589 9.51421 39.4665 9.51421C40.2197 9.51421 40.914 9.18459 41.3695 8.66019L44.6412 11.8446C43.3325 13.1655 41.4884 13.9999 39.4665 13.9999C35.5216 13.9999 32.3087 10.8742 32.3087 6.99015Z"
      fill="white"
    />
    <path
      d="M52.0982 9.76347L51.3294 10.6862V13.5842H46.8325V0.409424H51.3294V4.70046H51.464L54.7311 0.409424H59.7858L54.9809 6.26226L60.0927 13.5831H54.7882L52.1941 9.76235H52.0982V9.76347Z"
      fill="white"
    />
    <g clip-path="url(#clip0_6011_7238)">
      <path
        d="M73.1369 2.05251L73.1346 2.05482C74.4014 3.3231 75.1849 5.07324 75.1849 7.00005L74.8769 13.6928L68.185 14C66.7335 14 65.3853 13.5583 64.2673 12.8019C63.9031 12.5555 63.5634 12.2757 63.2525 11.9669L63.2548 11.9646C61.9764 10.6949 61.1848 8.93669 61.1848 7.00005L61.4928 0.30729L68.185 0.000107682C69.4213 0.000107696 70.5826 0.320538 71.5906 0.882933C72.1597 1.20046 72.6799 1.59513 73.1372 2.0528L73.1369 2.05251Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M71.8678 6.98352C71.8678 9.15793 70.2984 10.6731 68.2192 10.6731C66.14 10.6731 64.5707 9.15793 64.5707 6.98352C64.5707 4.8091 66.14 3.29395 68.2192 3.29395C70.2984 3.29395 71.8678 4.8091 71.8678 6.98352Z"
        fill="#0B0B0B"
      />
    </g>
    <path
      d="M77.0512 7.98098V0.418701H81.4762V7.90732C81.4762 9.53762 82.3462 10.3896 83.6888 10.3896C85.0313 10.3896 85.8441 9.53762 85.8441 7.90732V0.418701H90.2691V7.98098C90.2691 12.3519 87.1305 13.9998 83.5934 13.9998C80.0562 13.9998 77.05 12.3519 77.05 7.98098H77.0512Z"
      fill="white"
    />
    <path
      d="M97.0937 3.8733V5.24517H104.461V8.72055H97.0937V10.1114H104.461V13.5689H92.6042V0.415771H104.461V3.8733H97.0937Z"
      fill="white"
    />
    <path
      d="M106.874 10.1235H113.898C114.495 10.1235 114.784 9.85945 114.784 9.42536C114.784 8.99127 114.496 8.74626 113.879 8.74626H110.684C108.432 8.74626 106.604 7.23814 106.604 4.58102C106.604 1.52786 108.74 0.415771 110.896 0.415771H118.864V3.90303H111.994C111.474 3.90303 111.109 4.09099 111.109 4.562C111.109 5.03301 111.474 5.26012 111.994 5.26012H114.996C117.576 5.26012 119.288 6.74923 119.288 9.40635C119.288 11.9135 117.365 13.6096 114.861 13.6096H106.817L106.875 10.1235H106.874Z"
      fill="white"
    />
    <path
      d="M124.566 3.89626H120.571V0.415771H133.056V3.89626H129.061V13.584H124.566V3.89626Z"
      fill="white"
    />
    <defs>
      <clipPath id="clip0_6011_7238">
        <rect
          width="13.9999"
          height="14.0002"
          fill="white"
          transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 75.1849 14)"
        />
      </clipPath>
    </defs>
  </svg>
);

const HomeBanner: FC<HomeBannerProps> = (props) => {
  const userInfo = useGetUserInfo();
  const unLoginType = useGetUserUnLoginType();
  const [loginVisible, setLoginVisible] = useState(false);
  const isPc = useIsPc();
  return (
    <div
      className="h-[820px] flex justify-center w-full pt-[60px] slab:h-[0] slab:pt-[150%] slab:relative"
      style={{
        backgroundImage: `url(${isPc() ? BannerBg.src : BannerBgWap.src})`,
        backgroundSize: `${isPc() ? 'contain' : 'cover'}`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 0px'
      }}
    >
      <div className="container  slab:hidden  flex justify-between w-full">
        <div className="flex flex-col h-full relative">
          <h1 className="text-white  text-[54px] tracking-[2.4px] font-bold leading-[130%]">
            Mantle Learn
          </h1>
          <div className="flex items-center">
            <p className="text-white pr-[12px] text-[21px] leading-[130%]">
              - Powered by{' '}
            </p>
            {logo}
          </div>
          <Link
            href={' https://www.mantle.xyz/'}
            className="flex gap-x-[10px] mt-[30px] items-center"
          >
            <p className="font-next-book text-[21px] text-white leading-[125%] tracking-[0.42px] underline cursor-pointer hover:text-white/9 0">
              Visit Mantle main site
            </p>
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7C0.447715 7 4.82823e-08 7.44772 0 8C-4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM21.7071 8.70711C22.0976 8.31658 22.0976 7.68342 21.7071 7.2929L15.3431 0.928933C14.9526 0.538409 14.3195 0.538409 13.9289 0.928933C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM1 9L21 9L21 7L1 7L1 9Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>
        <div className="w-[400px] mt-[200px]">
          <Auth />
        </div>
      </div>
      <div className="hidden slab:flex absolute w-full h-full left-0 top-0 py-[10%] flex-col justify-between">
        <div className="flex flex-col h-full relative text-center">
          <h1 className="text-white  text-[36px] tracking-[2.4px] font-bold leading-[130%]">
            Mantle University
          </h1>
          <div className="flex items-center justify-center mt-[10px]">
            <p className="text-white pr-[12px] text-[14px] leading-[130%]">
              - Powered by{' '}
            </p>
            {logo}
          </div>
          <Link
            href={' https://www.mantle.xyz/'}
            className="flex gap-x-[10px] mt-[30px] items-center justify-center"
          >
            <p className="font-next-book text-[16px] text-white leading-[125%] tracking-[0.42px] underline cursor-pointer hover:text-white/9 0">
              Visit Mantle main site
            </p>
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7C0.447715 7 4.82823e-08 7.44772 0 8C-4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM21.7071 8.70711C22.0976 8.31658 22.0976 7.68342 21.7071 7.2929L15.3431 0.928933C14.9526 0.538409 14.3195 0.538409 13.9289 0.928933C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM1 9L21 9L21 7L1 7L1 9Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => setLoginVisible(true)}
            icon={<RightArrowIcon></RightArrowIcon>}
            iconPosition="right"
            className="text-auth-primary-button-text-color text-[18px] bg-[#CCE9E7]"
          >
            Start learning today
          </Button>
        </div>
      </div>
      <div className="hidden slab:flex flex-col justify-between"></div>
      {loginVisible && (
        <div className="absolute z-[999] w-[100vw] h-[100%] left-0 top-0 bg-[#000] text-[#fff]">
          <div className="absolute right-[24px] top-[40px] flex justify-end">
            <FiX size={26} onClick={() => setLoginVisible(false)} />
          </div>
          <div className="w-full h-full p-[20px] flex flex-col justify-center">
            <h1 className="text-white text-center  text-[36px] tracking-[2.4px] font-bold leading-[130%]">
              Mantle University
            </h1>
            <div className="flex items-center justify-center mt-[10px]">
              <p className="text-white pr-[12px] text-[14px] leading-[130%]">
                - Powered by{' '}
              </p>
              {logo}
            </div>
            <div className="w-full mt-[60px] h-[330px]">
              <Auth />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeBanner;
