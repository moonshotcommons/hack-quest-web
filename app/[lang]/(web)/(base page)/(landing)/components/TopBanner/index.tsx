import { FC } from 'react';
import BubbleCard from './BubbleCard';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import Link from 'next/link';

interface TopBannerProps {}

const TopBanner: FC<TopBannerProps> = (props) => {
  return (
    <div className="flex h-[50rem] w-full flex-col items-center justify-between bg-neutral-black">
      <div className="flex flex-col items-center">
        <h1 className="text-h1 mt-[8.125rem] text-center text-neutral-white">
          Web3 Programming
          <br />
          For <span className="text-yellow-dark">Everyone</span>
        </h1>
        <Link href={'/learning-track'} target="_blank">
          <Button type="primary" className="button-text-l mt-12 px-11 py-4 uppercase">
            Explore
          </Button>
        </Link>

        <BubbleCard direction="right" className="-mt-[13px] translate-x-[calc(50%+134px+84px)]">
          <Image src="/images/landing/solana_icon.png" alt="solana" width={60} height={60}></Image>
          <div className="text-neutral-off-white">
            <div className="body-m body-xs-bold w-fit rounded-[.5rem] border border-yellow-primary px-2 py-1 text-yellow-primary">
              Certified
            </div>
            <Link href={'/learning-track?track=Basic&language=RUST'} target="_blank" className="body-m-bold mt-2 flex items-center gap-2">
              <span className="relative after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-yellow-primary">
                Solana Learning Track
              </span>
              <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </BubbleCard>
        <BubbleCard direction="left" className="-mt-[40px] -translate-x-[calc(50%+267px)]">
          <Image src="/images/landing/code_icon.png" alt="code" width={48} height={48}></Image>
          <div className="text-neutral-off-white">
            <p className="body-m">Learn and build alongside</p>
            <p className="body-xl-bold">5k+ developers</p>
          </div>
        </BubbleCard>
      </div>

      <div className="flex h-[232px] w-full flex-col overflow-hidden">
        <img src={'/images/landing/center_moon.svg'} alt="hackquest" className="w-full"></img>
        <div className="w-full flex-1 bg-neutral-off-white"></div>
        <div className="absolute left-1/2 top-[28.125rem] h-[9.625rem] w-[13.625rem] -translate-x-1/2">
          <Image src={'/images/landing/center_astronaut.svg'} alt="hackquest" fill></Image>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
