import Button from '@/components/Common/Button';
import RightBottomIcon from '@/components/Common/Icon/RightBottom';
import LearningTracksCard from '@/components/v2/LearningTrackCard';
import { Theme } from '@/constants/enum';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useGetLearningTracks } from '@/hooks/useLearningTrackHooks/useLearningTracks';
import DrakHackquest_info1 from '@/public/images/home/dark-hackquest_info1.png';
import DrakHackquest_info3 from '@/public/images/home/dark-hackquest_info3.png';
import DrakHackquest_info4 from '@/public/images/home/dark-hackquest_info4.png';
import DrakHackquest_info5 from '@/public/images/home/dark-hackquest_info5.png';
import LightButtonDeg from '@/public/images/home/light-button_deg.svg';
import CenterLogo from '@/public/images/home/light-center-logo.png';
import LightHackquest_info1 from '@/public/images/home/light-hackquest_info1.png';
import LightHackquest_info3 from '@/public/images/home/light-hackquest_info3.png';
import LightHackquest_info4 from '@/public/images/home/light-hackquest_info4.png';
import LightHackquest_info5 from '@/public/images/home/light-hackquest_info5.png';
import TeaserInfo from '@/public/images/home/teaser_info.png';
import HackquestInfoBg from '@/public/images/landing/hack_quest_info_bg.png';
import { LearningTrackCourseType } from '@/service/webApi/course/type';
import { ThemeContext } from '@/store/context/theme';
import { message } from 'antd';
import Image from 'next/image';
import { FC, useContext, useMemo } from 'react';
import { AiOutlineRight } from 'react-icons/ai';

interface HackQuestInfoProps {
  // children: ReactNode;
}
interface GotoPageButtonProps {
  isBlack: boolean;
}
const goToLogin = () => {
  const bodyEle = document.querySelector('body') as HTMLBodyElement;
  bodyEle.style.scrollBehavior = 'smooth';
  bodyEle.scrollTop = 0;
  message.warning('请先登录');
};
const GotoPageButton: React.FC<GotoPageButtonProps> = (props) => {
  const { isBlack } = props;
  const color = useMemo(() => {
    return isBlack
      ? {
          text: 'landing-hack-info-learning-btn-color',
          border: 'landing-card-login-button-border-color'
        }
      : {
          text: 'landing-banner-intr-color',
          border: 'landing-banner-intr-color'
        };
  }, []);
  return (
    <>
      <Button
        className={`mt-[40px]  border text-${color.text} border-${color.border}`}
        onClick={() => goToLogin()}
      >
        Explore Learning Tracks
      </Button>
      <Button
        icon={<AiOutlineRight />}
        iconPosition="right"
        className={`text-${color.text}`}
        onClick={() => goToLogin()}
      >
        <span className="border-b border-[#FCC409]">
          Explore Selective Courses
        </span>
      </Button>
    </>
  );
};

export const TopInfo: FC = () => {
  const userInfo = useGetUserInfo();
  const { learningTracks } = useGetLearningTracks();

  return (
    <div className="bg-landing-hack-info-bg w-full">
      <div
        className="h-[286px] w-full"
        style={{
          backgroundImage: `url(${HackquestInfoBg.src})`,
          backgroundSize: '100% auto',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      <div className="container mx-auto">
        <h1 className="text-center pt-[20px] pb-[60px] text-[54px] font-next-poster-Bold text-landing-hack-info-top-color">
          Become a Solidity Developer
        </h1>
        <div className="mb-[30px]">
          <p className="text-[28px] font-next-poster-Bold">
            {learningTracks[0]?.name}
          </p>
          <p className="text-[16px] leading-[25px] w-[569px]">
            {learningTracks[0]?.description}
          </p>
        </div>
        <div onClick={goToLogin}>
          <LearningTracksCard
            isLandingPage={true}
            learningTrack={learningTracks[0] || {}}
            status={LearningTrackCourseType.UN_ENROLL}
          />
        </div>
      </div>
      <div className="container pt-[80px] mx-auto pb-[47px] bg-landing-card-bg mt-[150px] rounded-[5rem] flex-col-center">
        <h1 className="text-text-default-color text-center font-next-poster-Bold text-[54px] tracking-[3.24px]">
          What is HackQuest?
        </h1>
        <div className="mt-[18px] text-[1rem] w-[34.875rem] text-center text-text-default-color font-next-book ">
          Learn everything you need to “hack” in Web3 while earning quest
          rewards. Unlock the world of Web3 development with our all-in-one
          developer educational platform friendly to the mass.
        </div>
        <div className="w-full  flex justify-center mt-[3rem]">
          <Image src={LightButtonDeg} alt="hackquset"></Image>
        </div>
        <GotoPageButton isBlack={true} />
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
      image: theme === Theme.Dark ? LightHackquest_info1 : DrakHackquest_info1
    },
    {
      title: 'Earn rewards, in addition to skills',
      description: `Complete quests and unlock exciting rewards: tokens, NFT learning certificates, and even airdrop qualification!`,
      image: theme === Theme.Dark ? DrakHackquest_info1 : LightHackquest_info1
    },
    {
      title: 'Build Web3 reputation',
      description: `HackQuest generates a gamified developer profile to highlight your Web3 reputation scores, interests and skill proficiency levels based on your in-app activities and GitHub histories. Build your Web3 reputation and unlock new possibilities!`,
      image: theme === Theme.Dark ? DrakHackquest_info3 : LightHackquest_info3
    },
    {
      title: 'Personalized Learning Experience',
      description: `Customize your Web3 learning experience by choosing among extended, standard, or concise modes for each learning quest based on your skill level. HackQuest is built for learners of all levels!`,
      image: theme === Theme.Dark ? DrakHackquest_info4 : LightHackquest_info4
    }
    // {
    //   title: 'Concept learning made interactive',
    //   description: `Reimagine lengthy and jargon-packed blog posts with HackQuest concept learning. Chat with Vitalik and explore Blockchain concepts like ledger, hash, and node in a fun, interactive, and quirky way.`,
    //   image: theme === Theme.Dark ? DrakHackquest_info5 : LightHackquest_info5
    // }
  ];

  return (
    <div className="container px-[6.25rem] pt-[6rem] pb-[9rem] bg-landing-card-bg  rounded-[5rem]">
      <h1 className="text-text-default-color tracking-[3.24px] text-center font-next-poster-Bold text-[54px] pb-[9.06rem]">
        Why HackQuest?
      </h1>
      <div className="flex flex-col gap-[290px]">
        {infoList.map((item, index) => {
          return (
            <div key={index} className="flex  justify-between items-center ">
              <div className={`w-[550px]`}>
                {item.image ? (
                  <Image src={item.image} alt="info"></Image>
                ) : // <div className="w-[42.3125rem] h-[20.0625rem] bg-[#202020]"></div>
                null}
              </div>
              <div className="relative flex flex-col gap-[1.25rem]">
                <div className="relative w-[20rem] top-line"></div>
                <div className="text-text-default-color">
                  <RightBottomIcon width={17} height={16}></RightBottomIcon>
                </div>
                <h1 className="w-[418px] text-text-default-color leading-[75px] text-[60px] font-next-book-bold tracking-[0.02rem]">
                  {item.title}
                </h1>
                <div className="w-[418px] text-text-default-color text-[18px] font-normal tracking-[0.36px]">
                  {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    // </div>
  );
};

export const BottomInfo: FC = () => {
  return (
    <div className="container pt-[7.5rem] pb-[80px] flex flex-col items-center  bg-neutral-dark-gray mt-[13.69rem] rounded-[5rem]">
      <h1 className="text-[#F5F5F5] w-[43.5rem] mx-auto text-center font-next-poster-Bold text-[2.5rem] leading-[110%] tracking-wider pb-[4.25rem]">
        Still not sure? Create your own token in 10 minutes and decide.
      </h1>
      <div className="relative flex justify-center mt-[2.5rem] ">
        <Image src={TeaserInfo} alt="hackquset"></Image>
        <div
          className="absolute w-[81.5%]  left-[9.6%] -bottom-[20px] mx-auto h-[7.375rem]"
          style={{
            background:
              'linear-gradient(180deg, rgba(33, 33, 33, 0.00) 0%, #212121 100%)'
          }}
        ></div>
      </div>
      <div className="mt-[2.64rem] flex-col-center">
        <GotoPageButton isBlack={false} />
      </div>
    </div>
  );
};

const HackQuestInfo: FC<HackQuestInfoProps> = (props) => {
  // const { theme } = useContext(ThemeContext);
  return (
    <div className="flex flex-col items-center">
      <TopInfo></TopInfo>
      <div className="w-[100vw] flex justify-center py-[150px]">
        <Image src={CenterLogo} alt="hackquest"></Image>
      </div>
      <CenterInfo></CenterInfo>
      <BottomInfo></BottomInfo>
    </div>
  );
};

export default HackQuestInfo;
