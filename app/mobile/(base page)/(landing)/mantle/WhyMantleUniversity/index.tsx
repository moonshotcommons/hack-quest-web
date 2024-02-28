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
      title: 'Personalized learning experience',
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
    <div className="mx-auto flex w-full max-w-[77.5rem] flex-col items-center gap-4 px-5 text-center">
      <h3 className="text-[36px] font-medium leading-[110%] -tracking-[1.92px] text-white">
        Why Mantle University?
      </h3>
      <div className="mt-4 flex w-full flex-col gap-4">
        {infoList.map((item) => {
          return (
            <div
              key={item.title}
              className="w-full rounded-[15px] border border-[#202020]"
            >
              <div className="relative w-full pt-[calc(44.87178%+40px)]">
                <Image src={item.image} alt="image" fill></Image>
              </div>
              <div className="p-4">
                <h3 className="text-[1.375rem] leading-[110%] -tracking-[.12rem] text-white">
                  {item.title}
                </h3>
                <p className="mt-[.625rem] text-[1.125rem] leading-[140%] text-[#C4C4C4]">
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
