import Image from 'next/image';
import { FC } from 'react';
import { icons, leftCardData, rightCardData } from './constant';
import Link from 'next/link';
import { LearningTrackTab } from '../../../(learn)/learning-track/constants/type';

interface CertificatesIntroduceProps {}

const CertificatesIntroduce: FC<CertificatesIntroduceProps> = (props) => {
  return (
    <div className="flex w-full flex-col items-center bg-yellow-light px-5 py-10">
      <div className="relative flex h-[10rem] w-[11.875rem] items-center justify-center">
        <Image
          src={'/images/landing/ecosystems.png'}
          fill
          alt="Web3 ecosystems"
        ></Image>
      </div>
      <h2 className="text-h2 mt-6 w-[21.875rem] text-center text-[1.375rem] capitalize text-neutral-off-black">
        Earn certificates issued by leading Web3 ecosystems
      </h2>
      <p className="body-xl-bold w-fit rounded-[8px] bg-yellow-primary px-2 py-1 text-[1.375rem] font-extrabold text-neutral-off-black">
        Exclusively on HackQuest
      </p>
      <div className="mt-6 flex items-center gap-4">
        <Image
          src={'/images/landing/solana_logo.png'}
          alt="solana logo"
          width={84}
          height={12}
        ></Image>
        <Image
          src={'/images/landing/mantle_logo.png'}
          alt="solana logo"
          width={81}
          height={24}
        ></Image>
        <div className="px-2 py-1 text-[.625rem] text-neutral-black">
          10+ coming soon...
        </div>
      </div>
      <div className="relative z-10 mt-10 w-full">
        <div className="z-[99] flex w-full flex-col items-center gap-6 rounded-[16px] bg-neutral-white px-4 py-6">
          <h3 className="text-h4-mob">Start from the Basics</h3>
          <div className="flex w-full flex-col items-center gap-6">
            {leftCardData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full justify-between rounded-[.5rem] border border-neutral-light-gray p-4"
                >
                  <div className="flex flex-col justify-between">
                    <h4 className="body-xs-bold">{item.name}</h4>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-[.375rem]">
                        {icons.code}
                        <span className="button-text-s text-[10px] uppercase">
                          {item.language}
                        </span>
                      </div>
                      <div className="flex items-center gap-[.375rem] uppercase">
                        {icons.course}
                        <span className="button-text-s text-[10px]">
                          {item.course}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Image
                    src={item.image}
                    width={48}
                    height={48}
                    alt={item.alt}
                  ></Image>
                </div>
              );
            })}
            <Link
              href={`/learning-track`}
              target="_blank"
              className="body-m-bold flex cursor-pointer items-center gap-2 text-[.75rem]"
            >
              <span className="relative after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-yellow-primary">
                Explore Basics
              </span>
              {icons.rightArrow}
            </Link>
          </div>
          <div className="absolute -right-1 top-1 -z-[1] h-full w-full rounded-[16px] bg-yellow-primary"></div>
        </div>
      </div>
      <div className="relative z-10 mt-10 h-fit w-full">
        <div className="z-[99] flex  h-full w-full flex-col items-center gap-4 rounded-[1rem] bg-neutral-white px-4 py-6">
          <h3 className="text-h4-mob">Become Specialized</h3>
          <div className="flex w-full flex-wrap items-center justify-center gap-4">
            {rightCardData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex w-[calc(50%-0.5rem)] items-center justify-between rounded-[8px] border border-neutral-light-gray p-4"
                >
                  <h4 className="body-xs-bold">{item.name}</h4>
                </div>
              );
            })}
            <Link
              href={`/learning-track?track=${LearningTrackTab.SPECIALLIZATION}`}
              target="_blank"
              className="body-m-bold flex cursor-pointer items-center gap-2"
            >
              <span className="relative text-[.75rem] after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-yellow-primary">
                Explore Specializations
              </span>
              {icons.rightArrow}
            </Link>
          </div>
          <div className="absolute -right-1 top-1 -z-[1] h-full w-full rounded-[16px] bg-yellow-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default CertificatesIntroduce;
