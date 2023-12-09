import LearningTracksCard from '@/components/Mantle/LearningTrackCard';
import { BurialPoint } from '@/helper/burialPoint';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useGetLearningTracks } from '@/hooks/useLearningTrackHooks/useLearningTracks';
import TeaserInfo from '@/public/images/home/teaser_info.png';
import HackquestoInfo1 from '@/public/images/mantle/hackquest_info1.png';
import HackquestoInfo2 from '@/public/images/mantle/hackquest_info2.png';
import HackquestoInfo3 from '@/public/images/mantle/hackquest_info3.png';
import HackquestoInfo4 from '@/public/images/mantle/hackquest_info4.png';

import { goToLogin } from '@/helper/utils';
import useIsPc from '@/hooks/useIsPc';
import { LearningTrackCourseType } from '@/service/webApi/course/type';
import { ThemeContext } from '@/store/context/theme';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import Button from '../../Common/Button';
import LearningTrackWrapCard from '../components/LearningTrackWrapCard';
import Progress from '../components/Progress';
import TipsModal from '../components/TipsModal';
import DeveloperCard from './DeveloperCard';

interface HackQuestInfoProps {
  // children: ReactNode;
}
interface GotoPageButtonProps {
  isBlack: boolean;
  direction: 'top' | 'bottom';
}

const GotoPageButton: React.FC<GotoPageButtonProps> = (props) => {
  const { isBlack, direction } = props;
  const isPc = useIsPc();
  const [tipsOpen, setTipsOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          BurialPoint.track(
            `landing-${direction} Explore Learning Tracks按钮点击`
          );
          if (!isPc()) {
            setTipsOpen(true);
            return;
          }
          goToLogin();
        }}
      >
        Explore Mantle Learning Tracks
      </Button>
      <Button
        icon={<AiOutlineRight />}
        iconPosition="right"
        className={`text-white text-[18px] pt-[20px]`}
        onClick={() => {
          BurialPoint.track(
            `landing-${direction} Explore Selective Courses按钮点击`
          );
          if (!isPc()) {
            setTipsOpen(true);
            return;
          }
          goToLogin();
        }}
      >
        Explore Electives
      </Button>
      <TipsModal open={tipsOpen} onClose={() => setTipsOpen(false)} />
    </>
  );
};

export const TopInfo: FC = () => {
  const userInfo = useGetUserInfo();
  const { learningTracks } = useGetLearningTracks();
  const isPc = useIsPc();
  const [tipsOpen, setTipsOpen] = useState(false);
  return (
    <div className="bg-black w-full slab:mt-[80px]">
      <div className="container mx-auto  slab:w-full slab:px-[20px]">
        <h1 className="text-center pb-[40px] text-[54px] slab:text-[28px] font-bold text-white">
          Become a Solidity Developer
        </h1>
        <div className="flex justify-center">
          <p className="w-[638px] mb-[30px] slab:text-[12px] text-white leading-[160%]">
            {`Don't know where to start? Pick a learning track! Leaning Track
          provides a series of core + elective courses that help you master one
          topic and explore in the related field.`}
          </p>
        </div>
        <div
          className="slab:hidden"
          onClick={() => {
            goToLogin();
            BurialPoint.track('landing-learning track卡片点击');
          }}
        >
          <LearningTracksCard
            isLandingPage={true}
            learningTrack={learningTracks[0] || {}}
            status={LearningTrackCourseType.UN_ENROLL}
          />
        </div>
        <div
          className="hidden slab:flex justify-center"
          onClick={() => {
            BurialPoint.track('landing-learning track卡片点击');
            if (!isPc()) {
              setTipsOpen(true);
              return;
            }
            goToLogin();
          }}
        >
          <LearningTrackWrapCard learningTrack={learningTracks[0] || {}} />
        </div>
      </div>
      <TipsModal open={tipsOpen} onClose={() => setTipsOpen(false)} />
    </div>
  );
};

export const MantelDeveloperJourney: FC = () => {
  return (
    <div className="text-white text-center">
      <h2 className="text-[54px] slab:text-[28px] font-bold">
        Mantle Developer Quest
      </h2>
      <p className="leading-[160%] mt-[40px] slab:text-[12px]">
        Developers reach 200 points can claim Mantle learning certificate.
      </p>
      <div className="relative mt-[30px]">
        <Progress></Progress>
        {/* <Image
          src={MilestoneProgressIcon}
          alt="Mantle Developer Icon"
          className="absolute bottom-0 left-[0.5%] w-[2.1%] slab:w-[3%] slab:bottom-[7%] slab:left-[2%]"
        ></Image>

        <Image
          src={MilestoneProgress}
          alt="Mantle Developer Journey"
          className="mt-[30px] slab:hidden"
        ></Image>
        <Image
          src={MilestoneProgressWap}
          alt="Mantle Developer Journey"
          className="mt-[30px] hidden slab:block"
        ></Image> */}
      </div>

      <div className="mt-[60px] flex flex-wrap gap-x-[40px] gap-y-[37px] slab:gap-x-[12px] slab:gap-y-[24px]">
        <DeveloperCard
          title="Join Mantle Developer Community"
          description="30 Mantle developer points"
        ></DeveloperCard>
        <DeveloperCard
          title="Finish Mantle Learning Track"
          description="100 Mantle developer points"
        ></DeveloperCard>
        <DeveloperCard
          title="Learn Solidity Syntax"
          description="50 Mantle developer points"
        ></DeveloperCard>
        <DeveloperCard
          title="Follow Mantle Twitter"
          description="30 Mantle developer points"
        ></DeveloperCard>
        <DeveloperCard
          title="Learn How to Deploy a Project on Mantle Testnet"
          className="px-[53px]"
          description="50 Mantle developer points"
        ></DeveloperCard>
        <DeveloperCard
          title="Create Mantle Developer profile"
          description="30 Mantle developer points"
        ></DeveloperCard>
      </div>
    </div>
  );
};

export const CenterInfo: FC = () => {
  const { theme } = useContext(ThemeContext);
  const infoList = [
    {
      title: 'Easy to follow, quick to test',
      description: `Each course is broken into 3-5 minute sessions with a quest to test understanding. Short lesson + quick action = retention!`,
      image: (
        <Image
          src={HackquestoInfo1}
          alt="mantle"
          className="scale-[1.02]"
        ></Image>
      )
    },
    {
      title: 'Earn rewards, in addition to skills',
      description: `Complete quests and unlock exciting rewards: tokens, NFT learning certificates, and even airdrop qualification!`,
      image: (
        <Image
          src={HackquestoInfo2}
          alt="mantle"
          className="scale-[1.04]"
        ></Image>
      )
    },
    {
      title: 'Build Web3 reputation',
      description: `HackQuest generates a gamified developer profile to highlight your Web3 reputation scores, interests and skill proficiency levels based on your in-app activities and GitHub histories. Build your Web3 reputation and unlock new possibilities!`,
      image: (
        <Image
          src={HackquestoInfo3}
          alt="mantle"
          className="scale-[1.05]"
        ></Image>
      )
    },
    {
      title: 'Personalized Learning Experience',
      description: `Customize your Web3 learning experience by choosing among extended, standard, or concise modes for each learning quest based on your skill level. HackQuest is built for learners of all levels!`,
      image: (
        <Image
          src={HackquestoInfo4}
          alt="mantle"
          className="scale-[1.05]"
        ></Image>
      )
    }
    // {
    //   title: 'Concept learning made interactive',
    //   description: `Reimagine lengthy and jargon-packed blog posts with HackQuest concept learning. Chat with Vitalik and explore Blockchain concepts like ledger, hash, and node in a fun, interactive, and quirky way.`,
    //   image: theme === Theme.Dark ? DrakHackquest_info5 : LightHackquest_info5
    // }
  ];

  return (
    <div className="mt-[120px] container slab:w-full slab:px-[20px] slab:mt-[80px]">
      <h2 className="mb-[65px] text-white text-center text-[54px] slab:text-[28px]  font-bold">
        Why Mantle Learn?
      </h2>
      <div className="flex w-full gap-[40px] wap:flex-col slab:gap-[32px] container slab:w-full  flex-wrap">
        {infoList.map((info) => {
          return (
            <div
              key={info.title}
              className="flex w-[calc((100%-40px)/2)] slab:w-[calc((100%-32px)/2)] wap:w-full "
            >
              <div className="w-full  border border-[#3A3A3A] rounded-[15px]">
                <div className="w-full  overflow-hidden rounded-t-[15px]">
                  {info.image}
                </div>
                <div className="px-[32px] py-[30px] text-white">
                  <p className="leading-[125%] slab:w-full tracking-[0.68px] font-medium text-[34px] slab:text-[24px] mt-[30px] slab:mt-0  break-words">
                    {info.title}
                  </p>
                  <p className="leading-[160%] slab:text-[12px] tracking-[0.36px] text-[18px] mt-[22px]">
                    {info.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const BottomInfo: FC = () => {
  return (
    <div className="container slab:w-full slab:px-[20px] mx-auto">
      <div
        className=" pt-[64px] pb-[80px] flex flex-col items-center mt-[187px] rounded-[15px] border border-[#274542]"
        style={{
          background:
            'linear-gradient(13deg, rgba(24, 49, 48, 0.75) 9.57%, #000 42.83%, #000403 67.77%, #020F0E 92.38%)'
        }}
      >
        <h1 className="text-[#F5F5F5] w-[43.5rem] slab:w-full slab:px-[20px] mx-auto text-center font-bold text-[2.5rem] slab:text-[32px] pb-[4.25rem]">
          Still not sure? Create your own token in 10 minutes and decide.
        </h1>
        <div className="flex-col-center">
          <GotoPageButton isBlack={true} direction="bottom" />
        </div>
        <div className="relative flex justify-center mt-[2.5rem] slab:mt-[60px] ">
          <Image src={TeaserInfo} alt="hackquset"></Image>
          <div
            className="absolute w-[81.5%]  left-[9.6%] -bottom-[20px] mx-auto h-[7.375rem]"
            style={{
              background:
                'linear-gradient(180deg, rgba(33, 33, 33, 0.00) 0%, #212121 100%)'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const HackQuestInfo: FC<HackQuestInfoProps> = (props) => {
  // const { theme } = useContext(ThemeContext);
  return (
    <div className="flex flex-col items-center">
      <TopInfo></TopInfo>
      <div className="mt-[180px] slab:mt-[80px] container slab:w-full slab:px-[20px]">
        <MantelDeveloperJourney></MantelDeveloperJourney>
      </div>
      <CenterInfo></CenterInfo>
      <BottomInfo></BottomInfo>
    </div>
  );
};

export default HackQuestInfo;
