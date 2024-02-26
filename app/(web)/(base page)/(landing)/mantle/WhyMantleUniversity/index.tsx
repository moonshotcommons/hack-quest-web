import { FC } from 'react';
import HackquestoInfo1 from '@/public/images/mantle/hackquest_info1.webp';
import HackquestoInfo2 from '@/public/images/mantle/hackquest_info2.webp';
import HackquestoInfo3 from '@/public/images/mantle/hackquest_info3.webp';
import HackquestoInfo4 from '@/public/images/mantle/hackquest_info4.webp';
import Image from 'next/image';

interface WhyMantleUniversityProps {}

const WhyMantleUniversity: FC<WhyMantleUniversityProps> = (props) => {
  const infoList = [
    {
      title: 'Easy to follow, quick to test',
      description: `Each course is broken into 3-5 minute sessions with a quest to test understanding. Short lesson + quick action = retention!`,
      image: HackquestoInfo1
    },
    {
      title: 'Earn rewards, in addition to skills',
      description: `Complete quests and unlock exciting rewards: tokens, NFT learning certificates, and even airdrop qualification!`,
      image: HackquestoInfo2
    },
    {
      title: 'Build Web3 reputation',
      description: `HackQuest generates a developer profile to highlight your Web3 reputation, interests and skill proficiency levels based on your in-app and GitHub activities.`,
      image: HackquestoInfo3
    },
    {
      title: 'Earn rewards, in addition to skills',
      description: `Complete quests and unlock exciting rewards: tokens, NFT learning certificates, and even airdrop qualification!`,
      image: HackquestoInfo4
    }
    // {
    //   title: 'Concept learning made interactive',
    //   description: `Reimagine lengthy and jargon-packed blog posts with HackQuest concept learning. Chat with Vitalik and explore Blockchain concepts like ledger, hash, and node in a fun, interactive, and quirky way.`,
    //   image: theme === Theme.Dark ? DrakHackquest_info5 : LightHackquest_info5
    // }
  ];

  return (
    <div className="container mx-auto flex max-w-[77.5rem] flex-col items-center gap-4 text-center">
      <h3 className="text-[48px] font-medium leading-[110%] -tracking-[1.92px] text-white">
        Why Mantle University?
      </h3>
      <div className="mt-8 flex w-full flex-wrap gap-8 [&>div]:w-[calc((100%-32px)/2)]">
        {infoList.map((item) => {
          return (
            <div
              key={item.title}
              className="h-[33.375rem] rounded-[15px] border border-[#202020]"
            >
              <div className="relative h-[324px] w-full">
                <Image
                  src={item.image}
                  alt="image"
                  className="object-contain"
                ></Image>
              </div>
              <div className="px-[1.6875rem] pb-[1.625rem] pt-[1.875rem]">
                <h3 className="text-[2rem] leading-[110%] -tracking-[.12rem] text-white">
                  {item.title}
                </h3>
                <p className="mt-[1.375rem] text-[1.375rem] leading-[140%] text-[#C4C4C4]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyMantleUniversity;
