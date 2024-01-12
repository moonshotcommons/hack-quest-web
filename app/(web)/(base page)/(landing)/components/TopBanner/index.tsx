import { FC } from 'react';
import BubbleCard from './BubbleCard';
import Image from 'next/image';
import Button from '@/components/Common/Button';

interface TopBannerProps {}

const TopBanner: FC<TopBannerProps> = (props) => {
  return (
    <div className="bg-neutral-black w-full h-[50rem] flex flex-col items-center justify-between">
      <div className="flex flex-col items-center">
        <h1 className="text-neutral-white text-h1 mt-[8.125rem] text-center">
          Web3 Programming
          <br />
          For <span className="text-yellow-dark">Everyone</span>
        </h1>
        <Button
          type="primary"
          className="py-4 px-11 mt-12 uppercase button-text-l"
        >
          Explore
        </Button>

        <BubbleCard
          direction="right"
          className="-mt-[13px] translate-x-[calc(50%+134px+84px)]"
        >
          <Image
            src="/images/landing/mantle_icon.png"
            alt="code"
            width={48}
            height={48}
          ></Image>
          <div className="text-neutral-off-white">
            <div className="body-m text-yellow-primary text-[12px] font-bold border border-yellow-primary px-2 py-1 w-fit rounded-[.5rem]">
              Certified
            </div>
            <div className="body-m-bold mt-2 flex gap-2 items-center">
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
            </div>
          </div>
        </BubbleCard>
        <BubbleCard
          direction="left"
          className="-mt-[40px] -translate-x-[calc(50%+267px)]"
        >
          <Image
            src="/images/landing/code_icon.png"
            alt="code"
            width={48}
            height={48}
          ></Image>
          <div className="text-neutral-off-white">
            <p className="body-m">Learn and build alongside</p>
            <p className="body-xl-bold">5k+ developers</p>
          </div>
        </BubbleCard>
      </div>

      <div className="w-full h-[232px] overflow-hidden flex flex-col">
        <img
          src={'/images/landing/center_moon.svg'}
          alt="hackquest"
          className="w-full"
        ></img>
        <div className="flex-1 bg-neutral-off-white w-full"></div>
        <div className="absolute w-[13.625rem] h-[9.625rem] top-[28.125rem] left-1/2 -translate-x-1/2">
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
