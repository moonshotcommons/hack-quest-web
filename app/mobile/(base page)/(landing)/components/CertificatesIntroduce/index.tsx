import Image from 'next/image';
import { FC } from 'react';
import { icons, leftCardData, rightCardData } from './constant';
import Link from 'next/link';
import { LearningTrackTab } from '../../../(learn)/learning-track/constants/type';

interface CertificatesIntroduceProps {}

const CertificatesIntroduce: FC<CertificatesIntroduceProps> = (props) => {
  return (
    <div className="w-full px-5 py-10 bg-yellow-light flex flex-col items-center">
      <div className="w-[11.875rem] h-[10rem] flex items-center justify-center relative">
        <Image
          src={'/images/landing/ecosystems.png'}
          fill
          alt="Web3 ecosystems"
        ></Image>
      </div>
      <h2 className="text-h2 text-neutral-off-black capitalize text-[1.375rem] w-[21.875rem] text-center mt-6">
        Earn certificates issued by leading Web3 ecosystems
      </h2>
      <p className="px-2 py-1 rounded-[8px] body-xl-bold bg-yellow-primary w-fit text-neutral-off-black text-[1.375rem] font-extrabold">
        Exclusively on HackQuest
      </p>
      <div className="flex items-center gap-4 mt-6">
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
        <div className="px-2 py-1 text-neutral-black text-[.625rem]">
          10+ coming soon...
        </div>
      </div>
      <div className="w-full relative mt-10 z-10">
        <div className="w-full bg-neutral-white rounded-[16px] px-4 py-6 flex flex-col gap-6 items-center z-[99]">
          <h3 className="text-h4-mob font-next-book-bold">
            Start from the Basics
          </h3>
          <div className="flex flex-col gap-6 w-full items-center">
            {leftCardData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex justify-between border border-neutral-light-gray rounded-[.5rem] p-4"
                >
                  <div className="flex flex-col justify-between">
                    <h4 className="body-xs-bold">{item.name}</h4>
                    <div className="flex gap-6 items-center">
                      <div className="flex gap-[.375rem] items-center">
                        {icons.code}
                        <span className="button-text-s uppercase text-[10px]">
                          {item.language}
                        </span>
                      </div>
                      <div className="flex gap-[.375rem] items-center uppercase">
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
              className="body-m-bold flex gap-2 items-center cursor-pointer text-[.75rem]"
            >
              <span className="relative after:h-[2px] after:rounded-full after:absolute after:w-full after:left-0 after:-bottom-[1px] after:bg-yellow-primary">
                Explore Basics
              </span>
              {icons.rightArrow}
            </Link>
          </div>
          <div className="absolute w-full h-full bg-yellow-primary top-1 -right-1 rounded-[16px] -z-[1]"></div>
        </div>
      </div>
      <div className="w-full h-fit mt-10 z-10 relative">
        <div className="w-full h-full  bg-neutral-white rounded-[1rem] px-4 py-6 flex flex-col gap-4 items-center z-[99]">
          <h3 className="text-h4-mob font-next-book-bold">
            Become Specialized
          </h3>
          <div className="flex flex-wrap gap-4 w-full items-center justify-center">
            {rightCardData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex w-[calc(50%-0.5rem)] justify-between border border-neutral-light-gray rounded-[8px] p-4 items-center"
                >
                  <h4 className="body-xs-bold">{item.name}</h4>
                </div>
              );
            })}
            <Link
              href={`/learning-track?track=${LearningTrackTab.SPECIALLIZATION}`}
              target="_blank"
              className="body-m-bold flex gap-2 items-center cursor-pointer"
            >
              <span className="relative after:h-[2px] after:rounded-full after:absolute after:w-full after:left-0 after:-bottom-[1px] after:bg-yellow-primary text-[.75rem]">
                Explore Specializations
              </span>
              {icons.rightArrow}
            </Link>
          </div>
          <div className="absolute w-full h-full bg-yellow-primary top-1 -right-1 rounded-[16px] -z-[1]"></div>
        </div>
      </div>
    </div>
  );
};

export default CertificatesIntroduce;
