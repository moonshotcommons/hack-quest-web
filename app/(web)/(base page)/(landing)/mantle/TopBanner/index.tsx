'use client';
import { FC } from 'react';

import Image from 'next/image';
import Button from '@/components/Common/Button';

import MantleBgLogo from '@/public/images/mantle/mantle_bg.png';
import { useUserStore } from '@/store/zustand/userStore';
import Link from 'next/link';
// import MantleBgLogo from '@/public/images/mantle/mantle_bg_logo.png';

interface TopBannerProps {}

const logo = (
  <svg
    width="128"
    height="15"
    viewBox="0 0 128 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_5321_23353)">
      <path
        d="M60.4361 13.0251H56.6155V1.99757H60.4361V13.0251ZM68.1044 1.99757H63.5961L60.4361 6.86683V7.51133L63.9234 13.0251H68.4317L64.2567 7.18908L68.1044 1.99757ZM26.6282 1.99757V6.03213H23.6113V1.99757H19.7907V13.0251H23.6113V8.93338H26.6282V13.0251H30.4488V1.99757H26.6282ZM51.1684 10.1288C49.6619 10.1288 48.631 8.95309 48.631 7.51133C48.631 6.06957 49.6619 4.8939 51.1684 4.8939C52.2624 4.8939 53.0471 5.46942 53.2593 5.74239L55.1571 3.16536C54.6376 2.69332 53.0351 1.6221 50.75 1.6221C46.6991 1.6221 44.6242 4.72538 44.6242 7.51133C44.6242 10.2973 46.6991 13.4006 50.75 13.4006C53.0361 13.4006 54.6376 12.3293 55.1571 11.8573L53.2593 9.28027C53.0471 9.55325 52.2624 10.1288 51.1684 10.1288ZM40.6514 13.0271C40.0679 12.0248 38.9969 11.6592 37.9749 11.6592C36.9529 11.6592 35.8819 12.0248 35.2984 13.0271H31.6779L35.8969 1.9956H40.0549L44.2739 13.0271H40.6534H40.6514ZM39.4313 9.22804L37.9739 5.27134L36.5165 9.22804C36.5165 9.22804 37.0961 8.98364 37.9309 8.98364H38.0149C38.8507 8.98364 39.4293 9.22804 39.4293 9.22804H39.4313ZM40.6514 13.0271C40.0679 12.0248 38.9969 11.6592 37.9749 11.6592C36.9529 11.6592 35.8819 12.0248 35.2984 13.0271H31.6779L35.8969 1.9956H40.0549L44.2739 13.0271H40.6534H40.6514ZM39.4313 9.22804L37.9739 5.27134L36.5165 9.22804C36.5165 9.22804 37.0961 8.98364 37.9309 8.98364H38.0149C38.8507 8.98364 39.4293 9.22804 39.4293 9.22804H39.4313ZM128 1.99757H117.757V4.87911H120.968V13.0251H124.789V4.87911H128V1.99757ZM104.663 4.87911V1.99757H94.9468V13.0251H98.7674V13.0212H104.663V10.1396H98.7674V8.75797H104.663V6.26174H98.7674V4.8801H104.663V4.87911ZM113.017 6.07056H110.821C110.487 6.07056 110.217 5.80448 110.217 5.47632C110.217 5.14815 110.487 4.88207 110.821 4.88207H116.207V2.00053H109.927C107.961 2.00053 106.371 3.58222 106.397 5.52263C106.422 7.43348 108.039 8.95309 109.98 8.95309H112.176C112.509 8.95309 112.78 9.21917 112.78 9.54733C112.78 9.8755 112.509 10.1416 112.176 10.1416H106.792V13.0231H113.07C115.036 13.0231 116.626 11.4414 116.6 9.50102C116.575 7.59017 114.958 6.07056 113.017 6.07056ZM89.0872 1.99757V8.33815C89.0872 9.15216 88.4166 9.81243 87.5898 9.81243C86.763 9.81243 86.0924 9.15216 86.0924 8.33815V1.99757H82.2718V8.74515C82.2718 11.6326 84.617 13.3809 87.5498 13.4025C90.5056 13.4242 92.9088 11.7164 92.9088 8.81118V1.99757H89.0882H89.0872ZM78.8245 10.4816L81.2248 9.57986L81.0226 12.6762C81.0226 12.6762 77.9277 13.4006 74.5565 13.4006C70.3145 13.4006 68.4307 10.0223 68.4307 7.32508C68.4307 4.62782 70.5056 1.62309 74.5565 1.62309C78.6073 1.62309 80.452 4.31739 80.3399 7.0452C80.2799 8.51751 79.5192 9.82327 78.8245 10.385V10.4816ZM74.5575 10.1288C75.9278 10.1288 76.6755 8.87721 76.6755 7.51527C76.6755 6.15334 75.9278 4.89488 74.5575 4.89488C73.1872 4.89488 72.4395 6.15334 72.4395 7.51527C72.4395 8.87721 73.1872 10.1288 74.5575 10.1288ZM13.0043 2.19664C14.3836 3.55463 15.2354 5.42803 15.2354 7.49951L14.8801 14.6965L7.6182 14.999C5.51421 14.999 3.61041 14.1594 2.23211 12.8024C0.852806 11.4454 0 9.57197 0 7.50049L0.30729 0.349846L7.6182 0C9.72219 0 11.626 0.839629 13.0043 2.19664ZM10.7632 4.49872C9.97042 3.71822 8.87539 3.23435 7.66625 3.23435C5.24696 3.23435 3.28511 5.16589 3.28511 7.54779C3.28511 8.73825 3.77657 9.81637 4.56932 10.5969C5.36207 11.3774 6.4571 11.8612 7.66625 11.8612C10.0845 11.8612 12.0464 9.93069 12.0474 7.54779C12.0474 6.35733 11.5559 5.27922 10.7632 4.49872Z"
        fill="#C4C4C4"
      />
    </g>
    <defs>
      <clipPath id="clip0_5321_23353">
        <rect width="128" height="15" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const TopBanner: FC<TopBannerProps> = (props) => {
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);

  return (
    <div
      className="relative flex h-[38.75rem] w-full flex-col justify-between overflow-hidden bg-neutral-black bg-cover"
      style={{
        background:
          'radial-gradient(51.73% 51.73% at 52.94% 31.85%, #05251E 0%, #000 100%)'
      }}
    >
      <div className="absolute right-0 top-0 z-0 h-full w-full bg-[url('/images/mantle/night-star-background.webp')] mix-blend-lighten">
        {/* <Image
          src={NightStarBackground}
          fill
          alt="background"
          className="object-cover"
        ></Image> */}
      </div>
      <div className="container relative mx-auto  flex max-w-[77.5rem] justify-center">
        <div className="absolute -left-[939px] -top-[765px] h-[132.5625rem] w-[133.75rem]">
          <Image src={MantleBgLogo} fill alt="mantle"></Image>
        </div>
        {/* <div className="absolute -left-[658px] -top-[466px] h-[95.1875rem] w-[98.75rem] rotate-[31deg] ">
          <Image src={MantleBgLogo} fill alt="mantle"></Image>
        </div> */}
        {/* <div className="absolute left-[44px] top-[82px] h-[240px] w-[200px] -rotate-[13deg]">
          <Image src={TopBannerPerson} alt="mantle"></Image>
        </div> */}
        <div className="relative z-[1] mt-[11.25rem] flex h-full flex-col items-center">
          <div className="flex flex-col items-center gap-[10px]">
            <h1 className="text-[48px]  font-medium leading-[110%] -tracking-[1.92px] text-white">
              Mantle Learn
            </h1>
            <div className="flex items-center">
              <p className="pr-[12px] text-[18px] leading-[130%] text-[#C4C4C4]">
                - Powered by{' '}
              </p>
              {logo}
            </div>
            <Link
              href="https://www.mantle.xyz/"
              target="_blank"
              className="flex items-center gap-[6px] font-GT-Walsheim-Trial text-[18px] text-[#C4C4C4]"
            >
              <span className="underline">Visit Mantle main site</span>
              <svg
                width="17"
                height="9"
                viewBox="0 0 17 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4C0.723858 4 0.5 4.22386 0.5 4.5C0.5 4.77614 0.723858 5 1 5L1 4ZM16.3536 4.85355C16.5488 4.65829 16.5488 4.34171 16.3536 4.14645L13.1716 0.964467C12.9763 0.769205 12.6597 0.769205 12.4645 0.964467C12.2692 1.15973 12.2692 1.47631 12.4645 1.67157L15.2929 4.5L12.4645 7.32843C12.2692 7.52369 12.2692 7.84027 12.4645 8.03553C12.6597 8.2308 12.9763 8.2308 13.1716 8.03553L16.3536 4.85355ZM1 5L16 5L16 4L1 4L1 5Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>

          <div className="mt-[38px] flex items-center gap-x-[10px]">
            <Button
              type="mantle"
              className="w-[21.5rem] gap-[15px] rounded-[10px] hover:scale-[1.02]"
              iconPosition="right"
              icon={
                <svg
                  width="13"
                  height="18"
                  viewBox="0 0 13 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 3.5L10 8.79412L2.5 14.0882"
                    stroke="#0B0B0B"
                    strokeWidth="1.76471"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              onClick={() => setAuthModalOpen(true)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      <div
        className="relative z-10 h-[144px] w-full"
        style={{
          background:
            'linear-gradient(0deg, #000 8.87%, rgba(0, 0, 0, 0.00) 100%)'
        }}
      ></div>
    </div>
  );
};

export default TopBanner;
