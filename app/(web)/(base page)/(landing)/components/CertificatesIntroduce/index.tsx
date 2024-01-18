import Image from 'next/image';
import { FC } from 'react';
import { icons, leftCardData, rightCardData } from './constant';
import Link from 'next/link';
import { LearningTrackTab } from '../../../(learn)/learning-track/constants/type';

interface CertificatesIntroduceProps {}

const CertificatesIntroduce: FC<CertificatesIntroduceProps> = (props) => {
  return (
    <div className="w-full h-[1072px] bg-yellow-light flex flex-col">
      <div className="mt-[6.25rem] container mx-auto flex justify-between">
        <div className="flex flex-col justify-center w-[38.375rem] gap-10 ">
          <h2 className="text-h2 text-neutral-off-black capitalize">
            Earn certificates issued by leading Web3 ecosystems
          </h2>
          <p className="px-2 py-1 rounded-[8px] body-xl-bold bg-yellow-primary w-fit text-neutral-black">
            Exclusively on HackQuest
          </p>
          <div className="flex items-center gap-8">
            <Image
              src={'/images/landing/solana_logo.png'}
              alt="solana logo"
              width={161}
              height={23}
            ></Image>
            <Image
              src={'/images/landing/mantle_logo.png'}
              alt="solana logo"
              width={149}
              height={44}
            ></Image>
            <div className="border border-neutral-black px-2 py-1 rounded-[.5rem] body-s-bold text-neutral-black">
              10+ coming soon...
            </div>
          </div>
        </div>
        <div className="w-[26.6875rem] h-[22.5rem] relative">
          <Image
            src={'/images/landing/ecosystems.png'}
            fill
            alt="Web3 ecosystems"
          ></Image>
        </div>
      </div>
      <div className="w-full relative mt-10">
        <div className="border-b-[2px] border-dashed border-neutral-dark-gray w-full absolute left-1/2 -translate-x-1/2 top-[126px] z-[99]"></div>
        <div className="container mx-auto flex justify-between">
          <div className="w-[37.5rem] h-[30.875rem] relative">
            <div className="absolute w-full h-full bg-yellow-primary top-2 -right-2 rounded-[32px]"></div>
            <div className="absolute w-full h-full  bg-neutral-white rounded-[32px] p-10 flex flex-col gap-[32px]">
              <h3 className="text-h3">Start from the Basics</h3>
              <div className="w-6 h-6 z-[99]">{icons.leftCardCircle}</div>
              <div className="flex flex-col gap-6">
                {leftCardData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between border border-neutral-light-gray rounded-[16px] p-6"
                    >
                      <div className="flex flex-col justify-between">
                        <h4 className="text-h4">{item.name}</h4>
                        <div className="flex gap-6 items-center">
                          <div className="flex gap-[.375rem] items-center">
                            {icons.code}
                            <span className="button-text-s uppercase">
                              {item.language}
                            </span>
                          </div>
                          <div className="flex gap-[.375rem] items-center uppercase">
                            {icons.course}
                            <span className="button-text-s">{item.course}</span>
                          </div>
                        </div>
                      </div>
                      <Image
                        src={item.image}
                        width={60}
                        height={60}
                        alt={item.alt}
                      ></Image>
                    </div>
                  );
                })}
                <Link
                  href={`/learning-track`}
                  target="_blank"
                  className="body-m-bold flex gap-2 items-center cursor-pointer"
                >
                  <span className="relative after:h-[2px] after:rounded-full after:absolute after:w-full after:left-0 after:-bottom-[1px] after:bg-yellow-primary">
                    Explore Basics
                  </span>
                  {icons.rightArrow}
                </Link>
              </div>
            </div>
          </div>
          <div className="w-[37.5rem] h-[30.875rem] relative">
            <div className="absolute w-full h-full bg-yellow-primary top-2 -right-2 rounded-[32px]"></div>
            <div className="absolute w-full h-full  bg-neutral-white rounded-[32px] p-10 flex flex-col gap-[32px]">
              <h3 className="text-h3">Become Specialized</h3>
              <div className="w-6 h-6 z-[99]">{icons.rightCardCircle}</div>
              <div className="flex flex-wrap gap-6">
                {rightCardData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex w-[15.5rem] justify-between border border-neutral-light-gray rounded-[16px] p-6 pr-4 items-center"
                    >
                      <h4 className="text-h4">{item.name}</h4>
                      <Image
                        src={item.image}
                        width={91.8}
                        height={60}
                        alt={item.alt}
                      ></Image>
                    </div>
                  );
                })}
                <Link
                  href={`/learning-track?track=${LearningTrackTab.SPECIALLIZATION}`}
                  target="_blank"
                  className="body-m-bold flex gap-2 items-center cursor-pointer"
                >
                  <span className="relative after:h-[2px] after:rounded-full after:absolute after:w-full after:left-0 after:-bottom-[1px] after:bg-yellow-primary">
                    Explore Specializations
                  </span>
                  {icons.rightArrow}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatesIntroduce;
