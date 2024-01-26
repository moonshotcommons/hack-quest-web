import { FC } from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import Link from 'next/link';

interface TopBannerProps {}

const TopBanner: FC<TopBannerProps> = (props) => {
  return (
    <div className="bg-neutral-black w-full h-[42.625rem] flex flex-col pt-10 items-center justify-between">
      <div className="flex flex-col items-center">
        <h1 className="text-neutral-white text-h1 text-center text-[30px]">
          Web3 Programming
          <br />
          For <span className="text-yellow-primary">Everyone</span>
        </h1>
        <Link href={'/learning-track'} target="_blank">
          <Button
            type="primary"
            className="py-4 px-[3.25rem] mt-12 uppercase button-text-m"
          >
            Explore
          </Button>
        </Link>

        <div className="flex p-4 gap-4 border border-neutral-off-white w-[18.4375rem] rounded-[1rem] mt-[3rem]">
          <div className="w-fit h-fit">
            <Image
              src="/images/landing/mantle_icon.png"
              alt="code"
              width={48}
              height={48}
            ></Image>
          </div>
          <div className="text-neutral-off-white flex-1">
            <div className="body-m text-yellow-primary text-[12px] font-bold border border-yellow-primary px-2 py-1 w-fit rounded-[.5rem]">
              Certified
            </div>
            <Link
              href={
                '/learning-track/6d108f0d-dfb2-4dad-8f38-93b45573bc43?learningTrackId=6d108f0d-dfb2-4dad-8f38-93b45573bc43&menu=learningTrack'
              }
              target="_blank"
              className="body-m-bold mt-2 flex gap-2 items-center text-[.75rem]"
            >
              <span className="relative after:h-[2px] after:rounded-full after:absolute after:w-full after:left-0 after:-bottom-[1px] after:bg-yellow-primary">
                Mantle Learning Track
              </span>
              <svg
                width="13"
                height="18"
                viewBox="0 0 13 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 3.5L10 8.79412L2.5 14.0882"
                  stroke="#F4F4F4"
                  strokeWidth="1.76471"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col  absolute top-[33.4375rem]">
        <Image
          src={'/images/landing/center_moon_mobile.svg'}
          alt="hackquest"
          width={1834}
          height={409}
          className="w-full z-1"
        ></Image>
        <div className="flex-1 bg-neutral-off-white w-full"></div>
        <div className="absolute w-[13.625rem] h-[9.625rem] top-0 -translate-y-[calc(100%-36px)] left-1/2 -translate-x-1/2 z-50">
          <Image
            src={'/images/landing/center_astronaut.svg'}
            alt="hackquest"
            fill
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
