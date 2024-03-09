import Image from 'next/image';
import { FC } from 'react';
import { icons, leftCardData, rightCardData } from './constant';
import Link from 'next/link';
import { LearningTrackTab } from '../../../(learn)/learning-track/constants/type';

interface CertificatesIntroduceProps {}

const CertificatesIntroduce: FC<CertificatesIntroduceProps> = (props) => {
  return (
    <div className="flex h-[1072px] w-full flex-col bg-yellow-light">
      <div className="container mx-auto mt-[6.25rem] flex max-w-[1280px] justify-between">
        <div className="flex w-[38.375rem] flex-col justify-center gap-10 ">
          <h2 className="text-h2 capitalize text-neutral-off-black">
            Earn certificates issued by leading Web3 ecosystems
          </h2>
          <p className="body-xl-bold w-fit rounded-[8px] bg-yellow-primary px-2 py-1 text-neutral-black">
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
            <div className="body-s-bold rounded-[.5rem] border border-neutral-black px-2 py-1 text-neutral-black">
              10+ coming soon...
            </div>
          </div>
        </div>
        <div className="relative h-[22.5rem] w-[26.6875rem]">
          <Image
            src={'/images/landing/ecosystems.png'}
            fill
            alt="Web3 ecosystems"
          ></Image>
        </div>
      </div>
      <div className="relative mt-10 w-full">
        <div className="absolute left-1/2 top-[126px] z-[99] w-full -translate-x-1/2 border-b-[2px] border-dashed border-neutral-dark-gray"></div>
        <div className="container mx-auto flex max-w-[1280px] justify-between">
          <div className="relative h-[30.875rem] w-[37.5rem]">
            <div className="absolute -right-2 top-2 h-full w-full rounded-[32px] bg-yellow-primary"></div>
            <div className="absolute flex h-full  w-full flex-col gap-[32px] rounded-[32px] bg-neutral-white p-10">
              <h3 className="text-h3">Start from the Basics</h3>
              <div className="z-[99] h-6 w-6">{icons.leftCardCircle}</div>
              <div className="flex flex-col gap-6">
                {leftCardData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between rounded-[16px] border border-neutral-light-gray p-6"
                    >
                      <div className="flex flex-col justify-between">
                        <h4 className="text-h4">{item.name}</h4>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-[.375rem]">
                            {icons.code}
                            <span className="button-text-s uppercase">
                              {item.language}
                            </span>
                          </div>
                          <div className="flex items-center gap-[.375rem] uppercase">
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
                  className="body-m-bold flex cursor-pointer items-center gap-2"
                >
                  <span className="relative after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-yellow-primary">
                    Explore Basics
                  </span>
                  {icons.rightArrow}
                </Link>
              </div>
            </div>
          </div>
          <div className="relative h-[30.875rem] w-[37.5rem]">
            <div className="absolute -right-2 top-2 h-full w-full rounded-[32px] bg-yellow-primary"></div>
            <div className="absolute flex h-full  w-full flex-col gap-[32px] rounded-[32px] bg-neutral-white p-10">
              <h3 className="text-h3">Become Specialized</h3>
              <div className="z-[99] h-6 w-6">{icons.rightCardCircle}</div>
              <div className="flex flex-wrap gap-6">
                {rightCardData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex w-[calc(50%-24px)] items-center justify-between rounded-[16px] border border-neutral-light-gray p-6 pr-4"
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
                  className="body-m-bold flex cursor-pointer items-center gap-2"
                >
                  <span className="relative after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-yellow-primary">
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
