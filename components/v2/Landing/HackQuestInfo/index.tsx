import Button from '@/components/Common/Button';
import LearningTracksCard from '@/components/v2/LearningTrackCard';
import { BurialPoint } from '@/helper/burialPoint';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useGetLearningTracks } from '@/hooks/useLearningTrackHooks/useLearningTracks';
import LightButtonDeg from '@/public/images/home/light-button_deg.svg';
import TeaserInfo from '@/public/images/home/teaser_info.png';
import HackquestInfoBg from '@/public/images/landing/hack_quest_info_bg.png';
import { LearningTrackCourseType } from '@/service/webApi/course/type';
import { ThemeContext } from '@/store/context/theme';
import { message } from 'antd';
import Image from 'next/image';
import { FC, useContext, useMemo } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import WhyL1 from '@/public/images/landing/why_h_1_l.png';
import WhyR1 from '@/public/images/landing/why_h_1_r.png';
import WhyL2 from '@/public/images/landing/why_h_2_l.png';
import WhyR2 from '@/public/images/landing/why_h_2_r.png';
import WhyL3 from '@/public/images/landing/why_h_3_l.png';
import WhyR3 from '@/public/images/landing/why_h_3_r.png';
import WhyL4 from '@/public/images/landing/why_h_4_l.png';
import WhyR4 from '@/public/images/landing/why_h_4_r.png';
import { useRouter } from 'next/router';
import { MenuLink } from '../../Layout/Navbar/type';
import { Menu, QueryIdType } from '../../Breadcrumb/type';

interface HackQuestInfoProps {
  // children: ReactNode;
}
interface GotoPageButtonProps {
  isBlack: boolean;
  direction: 'top' | 'bottom';
}
const goToLogin = () => {
  const contentWrapEle = document.querySelector(
    '#content-scroll-wrap'
  ) as HTMLDivElement;
  if (!contentWrapEle) return;
  contentWrapEle.style.scrollBehavior = 'smooth';
  contentWrapEle.scrollTop = 0;
  message.warning('Please log in first');
};
const GotoPageButton: React.FC<GotoPageButtonProps> = (props) => {
  const { isBlack, direction } = props;
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
        onClick={() => {
          goToLogin();
          BurialPoint.track(
            `landing-${direction} Explore Learning Tracks按钮点击`
          );
        }}
      >
        Explore Learning Tracks
      </Button>
      <Button
        icon={<AiOutlineRight />}
        iconPosition="right"
        className={`text-${color.text}`}
        onClick={() => {
          goToLogin();
          BurialPoint.track(
            `landing-${direction} Explore Selective Courses按钮点击`
          );
        }}
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
        <div
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
      </div>
      <div className="container pt-[80px] mx-auto pb-[47px] bg-landing-card-bg mt-[150px] rounded-[10px] flex-col-center">
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
        <GotoPageButton isBlack={true} direction="top" />
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
      image: [
        {
          img: WhyL1,
          width: 416
        },
        {
          img: WhyR1,
          width: 354
        }
      ]
    },
    {
      title: 'Earn rewards, in addition to skills',
      description: `Complete quests and unlock exciting rewards: tokens, NFT learning certificates, and even airdrop qualification!`,
      image: [
        {
          img: WhyL2,
          width: 465
        },
        {
          img: WhyR2,
          width: 281
        }
      ]
    },
    {
      title: 'Build Web3 reputation',
      description: `HackQuest generates a gamified developer profile to highlight your Web3 reputation scores, interests and skill proficiency levels based on your in-app activities and GitHub histories. Build your Web3 reputation and unlock new possibilities!`,
      image: [
        {
          img: WhyL3,
          width: 463
        },
        {
          img: WhyR3,
          width: 349
        }
      ]
    },
    {
      title: 'Personalized Learning Experience',
      description: `Customize your Web3 learning experience by choosing among extended, standard, or concise modes for each learning quest based on your skill level. HackQuest is built for learners of all levels!`,
      image: [
        {
          img: WhyL4,
          width: 535
        },
        {
          img: WhyR4,
          width: 297
        }
      ]
    }
    // {
    //   title: 'Concept learning made interactive',
    //   description: `Reimagine lengthy and jargon-packed blog posts with HackQuest concept learning. Chat with Vitalik and explore Blockchain concepts like ledger, hash, and node in a fun, interactive, and quirky way.`,
    //   image: theme === Theme.Dark ? DrakHackquest_info5 : LightHackquest_info5
    // }
  ];

  return (
    <div className="container   mt-[150px]">
      <h1 className="text-text-default-color tracking-[3.24px] text-center font-next-poster-Bold text-[54px] mb-[50px]">
        Why HackQuest?
      </h1>
      <div className="flex flex-wrap gap-[40px]  ">
        {infoList.map((item, index) => {
          return (
            <div
              key={index}
              className="w-[calc(50%-20px)] h-[750px] pt-[50px] px-[55px] bg-landing-card-bg rounded-[10px]"
            >
              <div className="w-full relative h-[410px]">
                <Image
                  src={item.image[0].img}
                  width={item.image[0].width}
                  alt="demo"
                  className={`absolute left-0 ${
                    index <= 1 ? 'bottom-0' : 'top-0'
                  }`}
                ></Image>
                <Image
                  src={item.image[1].img}
                  width={item.image[1].width}
                  alt="demo"
                  className={`absolute right-0 ${
                    index <= 1 ? 'top-0' : 'bottom-0'
                  }`}
                ></Image>
              </div>
              <div className="mt-[70px]">
                <p className="text-[30px] leading-[42.5px] tracking-[0.68px] font-next-book-bold mb-[22px]">
                  {item.title}
                </p>
                <p className="text-[16px] leading-[28.8px] tracking-[0.36px] font-next-book">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    // </div>
  );
};

export const HackQuestHackathon: FC = () => {
  const router = useRouter();
  return (
    <div className="container py-[80px] bg-landing-card-bg rounded-[10px] flex-col-center font-next-book mt-[150px]">
      <div className="text-text-default-color tracking-[3.24px] text-center font-next-poster-Bold text-[54px] ">
        HackQuest Hackathon
      </div>
      <div className="w-[560px] my-[30px]">
        {`Explore ongoing hackathons, uncover past projects, and dive into the world of innovation. Your journey through the realm of creativity begins here!`}
      </div>
      <div className="flex h-[152px] mb-[50px]">
        <div className="h-full w-[360px] text-center flex flex-col justify-between border-r-[0.5px] border-r-[#000]">
          <p className="text-[68px] text-[#000] leading-[108px] tracking-[0.2px]">
            8
          </p>
          <p className="text-[18px] text-[#8C8C8C] tracking-[0.36px]">
            Hackathon
          </p>
        </div>
        <div className="h-full w-[360px] text-center flex flex-col justify-between border-r-[0.5px] border-r-[#000]">
          <p className="text-[68px] text-[#000] leading-[108px] tracking-[0.2px]">
            68
          </p>
          <p className="text-[18px] text-[#8C8C8C] tracking-[0.36px]">
            Projects
          </p>
        </div>
        <div className="h-full w-[360px] text-center flex flex-col justify-between">
          <p className="text-[68px] text-[#000] leading-[108px] tracking-[0.2px]">{`2,560`}</p>
          <p className="text-[18px] text-[#8C8C8C] tracking-[0.36px]">
            Participants
          </p>
        </div>
      </div>
      <div className="flex  items-center gap-[40px]">
        <Button
          className={`border text-landing-hack-info-learning-btn-color border-landing-card-login-button-border-color`}
          onClick={() => {
            router.push(MenuLink.HACKATHON);
            BurialPoint.track(`landing Explore Hackathons按钮点击`);
          }}
        >
          Explore Hackathons
        </Button>
        <Button
          icon={<AiOutlineRight />}
          iconPosition="right"
          className={`text-landing-hack-info-learning-btn-color`}
          onClick={() => {
            router.push(
              `${MenuLink.PROJECTS}?menu=${Menu.PROJECTS}&${QueryIdType.PROJECT_ID}=projects`
            );
            BurialPoint.track(`landing Explore Projects按钮点击`);
          }}
        >
          <span className="border-b border-[#FCC409]">Explore Projects</span>
        </Button>
      </div>
    </div>
  );
};

export const BottomInfo: FC = () => {
  return (
    <div className="container pt-[7.5rem] pb-[80px] flex flex-col items-center  bg-neutral-dark-gray mt-[150px] rounded-[10px]">
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
        <GotoPageButton isBlack={false} direction="bottom" />
      </div>
    </div>
  );
};

const HackQuestInfo: FC<HackQuestInfoProps> = (props) => {
  // const { theme } = useContext(ThemeContext);
  return (
    <div className="flex flex-col items-center">
      <TopInfo></TopInfo>
      {/* <div className="w-[100%] flex justify-center py-[150px]">
        <Image src={CenterLogo} alt="hackquest"></Image>
      </div> */}
      <CenterInfo></CenterInfo>
      <HackQuestHackathon></HackQuestHackathon>
      <BottomInfo></BottomInfo>
    </div>
  );
};

export default HackQuestInfo;
