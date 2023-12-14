import RightIcon from '@/components/Common/Icon/Right';
import SkipIcon from '@/components/Common/Icon/Skip';
import Image from 'next/image';
import Link from 'next/link';
import DarkButtonDeg from '@/public/images/home/dark-button_deg.svg';
import LightButtonDeg from '@/public/images/home/light-button_deg.svg';
import TeaserInfo from '@/public/images/home/teaser_info.png';
import { FC, useContext } from 'react';
import RightBottomIcon from '@/components/Common/Icon/RightBottom';
import { CourseType } from '@/service/webApi/course/type';
import DrakHackquest_info1 from '@/public/images/home/dark-hackquest_info1.png';
import DrakHackquest_info2 from '@/public/images/home/dark-hackquest_info2.png';
import DrakHackquest_info3 from '@/public/images/home/dark-hackquest_info3.png';
import DrakHackquest_info4 from '@/public/images/home/dark-hackquest_info4.png';
import DrakHackquest_info5 from '@/public/images/home/dark-hackquest_info5.png';
import LightHackquest_info1 from '@/public/images/home/light-hackquest_info1.png';
import LightHackquest_info2 from '@/public/images/home/light-hackquest_info2.png';
import LightHackquest_info3 from '@/public/images/home/light-hackquest_info3.png';
import LightHackquest_info4 from '@/public/images/home/light-hackquest_info4.png';
import LightHackquest_info5 from '@/public/images/home/light-hackquest_info5.png';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import Button from '@/components/Common/Button';
import { ThemeContext } from '@/store/context/theme';
import { Theme } from '@/constants/enum';

interface HackQuestInfoProps {
  // children: ReactNode;
}

export const TopInfo: FC = () => {
  const userInfo = useGetUserInfo();
  const { theme } = useContext(ThemeContext);
  return (
    <div className="w-[100rem] h-[36.5625rem] bg-landing-card-bg -translate-x-[50%] ml-[50%] mt-[13.69rem] rounded-[5rem]">
      <h1 className="text-text-default-color text-center font-next-poster-Bold text-[2.5rem] mt-[5.31rem]">
        What is HackQuest?
      </h1>
      <div className="mt-[2.5rem] text-[1rem] w-[34.875rem] text-center mx-auto text-text-default-color font-next-book ">
        Learn everything you need to “hack” in Web3 while earning quest rewards.
        Unlock the world of Web3 development with our all-in-one developer
        educational platform friendly to the mass.
      </div>
      <div className="w-full mx-auto flex justify-center mt-[3rem]">
        {theme === Theme.Dark && (
          <Image src={DarkButtonDeg} alt="hackquset"></Image>
        )}
        {theme === Theme.Light && (
          <Image src={LightButtonDeg} alt="hackquset"></Image>
        )}
      </div>
      <div className="gap-[2.5rem] w-full flex justify-center items-center mt-[2.64rem]">
        <Link href={'/courses'}>
          <div className="flex w-fit text-text-default-color font-next-book text-[1.25rem] items-center gap-[0.31rem]">
            <div>
              <span>Explore All Course</span>
              <span className="block h-[.125rem] w-full bg-primary-color"></span>
            </div>
            <SkipIcon></SkipIcon>
          </div>
        </Link>

        {!userInfo && (
          <Link href={'/auth/login'}>
            <Button
              icon={<RightIcon />}
              iconPosition="right"
              className="
                border
                text-landing-card-login-button-text-color
                bg-landing-card-login-button-bg
                border-landing-card-login-button-border-color
                "
            >
              Login
            </Button>
          </Link>
        )}
        {userInfo && (
          <Link href={'/dashboard'}>
            <Button
              icon={<RightIcon />}
              iconPosition="right"
              className="
                border
                text-landing-card-login-button-text-color
                bg-landing-card-login-button-bg
                border-landing-card-login-button-border-color
                transition-all
                duration-200
                ease-linear
                "
            >
              Dashboard
            </Button>
          </Link>
        )}
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
      image: theme === Theme.Dark ? DrakHackquest_info1 : LightHackquest_info1
    },
    {
      title: 'Earn rewards, in addition to skills',
      description: `Complete quests and unlock exciting rewards: tokens, NFT learning certificates, and even airdrop qualification!`,
      image: theme === Theme.Dark ? DrakHackquest_info2 : LightHackquest_info2
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
    },
    {
      title: 'Concept learning made interactive',
      description: `Reimagine lengthy and jargon-packed blog posts with HackQuest concept learning. Chat with Vitalik and explore Blockchain concepts like ledger, hash, and node in a fun, interactive, and quirky way.`,
      image: theme === Theme.Dark ? DrakHackquest_info5 : LightHackquest_info5
    }
  ];

  const infoImages = [
    '/images/home/hackquest_info1.png',
    '/images/home/hackquest_info2.png',
    '/images/home/hackquest_info3.png',
    '/images/home/hackquest_info4.png'
  ];

  return (
    <div className="w-[100rem] px-[6.25rem] pt-[6rem] pb-[9rem] bg-landing-card-bg -translate-x-[50%] ml-[50%] mt-[13.69rem] rounded-[5rem]">
      <h1 className="text-text-default-color  text-center font-next-poster-Bold text-[2.5rem] pb-[9.06rem]">
        Why HackQuest?
      </h1>
      {/* <div className="flex justify-between"> */}
      {/* <div>
          <div className="mt-[2.5625rem]">
            <Image
              src={infoImages[0]}
              alt="hackquest"
              width={550}
              height={418}
            ></Image>
          </div>
          <div className="mt-[35rem]">
            <Image
              src={infoImages[2]}
              alt="hackquest"
              width={677}
              height={366}
            ></Image>
          </div>
          <div className="mt-[12rem]">
            <Image
              src={infoImages[1]}
              alt="hackquest"
              width={677}
              height={341.5}
            ></Image>
          </div>

          <div className="mt-[12rem]">
            <Image
              src={infoImages[3]}
              alt="hackquest"
              width={547}
              height={324}
            ></Image>
          </div>
        </div> */}
      <div className="flex flex-col gap-[2.5rem]">
        {infoList.map((item, index) => {
          return (
            <div
              key={index}
              className="flex w-[79.8125rem] h-[26.8125rem] justify-between items-center"
            >
              <div
                className={`w-[41.4375rem] h-[22.0625rem] ${
                  index === 0 ? '-mt-32' : ''
                }`}
              >
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
                <h1 className="w-[18rem] text-text-default-color text-[2rem] font-next-book-bold tracking-[0.02rem]">
                  {item.title}
                </h1>
                <div className="w-[18.375rem] text-text-default-color text-[1rem] font-normal tracking-[0.01rem]">
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
    <div className="w-[100rem] py-[7.5rem] flex flex-col  justify-center bg-neutral-dark-gray -translate-x-[50%] ml-[50%] mt-[13.69rem] rounded-[5rem]">
      <h1 className="text-[#F5F5F5] w-[43.5rem] mx-auto text-center font-next-poster-Bold text-[2.5rem] leading-[110%] tracking-wider pb-[4.25rem]">
        Still not sure? Create your own token in 10 minutes and decide.
      </h1>
      <div className="relative mx-auto flex justify-center mt-[2.5rem] ">
        <Image src={TeaserInfo} alt="hackquset"></Image>
        <div
          className="absolute w-[62.125rem]  left-[50%] -translate-x-[50%] bottom-0 mx-auto h-[7.375rem]"
          style={{
            background:
              'linear-gradient(180deg, rgba(13, 13, 13, 0.00) 0%, #0D0D0D 100%)'
          }}
        ></div>
      </div>
      <div className="gap-[2.5rem] items-center w-full flex justify-center mt-[2.64rem]">
        <Link href={'/courses'}>
          <div className="flex w-fit text-[#F5F5F5] font-next-book text-[1.25rem] items-center gap-[0.31rem]">
            <div>
              <span>Explore All Course</span>
              <span className="block h-[.125rem] w-full bg-primary-color"></span>
            </div>
            <SkipIcon></SkipIcon>
          </div>
        </Link>
        <Link href={`/courses?courseType=${CourseType.TEASER}`}>
          <div className="flex items-center w-fit px-[2.5rem] py-[1.25rem] font-next-book text-[#F5F5F5] text-[1rem] rounded-[5rem] border border-solid border-[#F5F5F5] gap-[0.62rem] hover:text-black hover:bg-[#D9D9D9] cursor-pointer ">
            <div>Try teaser course</div>
            <RightIcon></RightIcon>
          </div>
        </Link>
      </div>
    </div>
  );
};

const HackQuestInfo: FC<HackQuestInfoProps> = (props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <TopInfo></TopInfo>
      <div className="w-[100vw] z-[999] -translate-x-[50%] ml-[50%] flex justify-center pt-[12.8125rem]">
        <img
          src={`/images/home/${theme}-center-logo.png`}
          alt="hackquest"
          className=""
        ></img>
      </div>
      <CenterInfo></CenterInfo>
      <BottomInfo></BottomInfo>
    </>
  );
};

export default HackQuestInfo;
