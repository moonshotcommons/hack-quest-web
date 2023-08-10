import React, { useContext } from 'react';
import Image from 'next/image';
import BeginnerRewardsImgDark from '@/public/images/mission-center/dark/beginner_rewards.png';
import BeginnerRewardsImgLight from '@/public/images/mission-center/light/beginner_rewards.png';
import Sphere from '@/public/images/mission-center/sphere.png';
import MetaIcon from '@/public/images/mission-center/meta_icon.svg';
import { ThemeContext } from '@/store/context/theme';
import {
  MissionDataType,
  BeginnerRewardsType
} from '@/service/webApi/missionCenter/type';

type BeginnerRewardsProp = {
  rewardData: MissionDataType[];
};
const BeginnerRewards: React.FC<BeginnerRewardsProp> = ({ rewardData }) => {
  const { theme } = useContext(ThemeContext);
  const renderIcon = (type: BeginnerRewardsType) => {
    switch (type) {
      case BeginnerRewardsType.JOIN_DISCORD:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="20"
            viewBox="0 0 25 20"
            className="text-mission-center-icon-twitter-color"
            fill="none"
          >
            <path
              opacity="0.8"
              d="M25 2.36772C24.0802 2.76969 23.0917 3.0404 22.0542 3.16243C23.1135 2.53794 23.9271 1.5484 24.3094 0.369155C23.3187 0.947498 22.2208 1.36792 21.0521 1.59454C20.1177 0.613207 18.7833 0 17.3083 0C13.9969 0 11.5635 3.04143 12.3115 6.19873C8.05 5.98851 4.27083 3.97867 1.74062 0.923913C0.396875 3.19319 1.04375 6.16181 3.32708 7.66509C2.4875 7.63843 1.69583 7.41181 1.00521 7.03343C0.948958 9.37243 2.65208 11.5607 5.11875 12.0478C4.39687 12.2406 3.60625 12.2857 2.80208 12.1339C3.45417 14.1397 5.34792 15.5988 7.59375 15.6399C5.4375 17.3041 2.72083 18.0476 0 17.7317C2.26979 19.1643 4.96667 20 7.8625 20C17.3854 20 22.7656 12.0826 22.4406 4.98154C23.4427 4.26887 24.3125 3.37982 25 2.36772Z"
              fill="currentColor"
            />
          </svg>
        );
      case BeginnerRewardsType.UPDATE_PROFILE:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-mission-center-icon-color"
            fill="none"
          >
            <path
              d="M6.66667 5.33333C6.66667 3.91885 7.22857 2.56229 8.22876 1.5621C9.22896 0.561903 10.5855 0 12 0C13.4145 0 14.771 0.561903 15.7712 1.5621C16.7714 2.56229 17.3333 3.91885 17.3333 5.33333C17.3333 6.74782 16.7714 8.10438 15.7712 9.10457C14.771 10.1048 13.4145 10.6667 12 10.6667C10.5855 10.6667 9.22896 10.1048 8.22876 9.10457C7.22857 8.10438 6.66667 6.74782 6.66667 5.33333ZM6.66667 13.3333C4.89856 13.3333 3.20286 14.0357 1.95262 15.286C0.702379 16.5362 0 18.2319 0 20C0 21.0609 0.421427 22.0783 1.17157 22.8284C1.92172 23.5786 2.93913 24 4 24H20C21.0609 24 22.0783 23.5786 22.8284 22.8284C23.5786 22.0783 24 21.0609 24 20C24 18.2319 23.2976 16.5362 22.0474 15.286C20.7971 14.0357 19.1014 13.3333 17.3333 13.3333H6.66667Z"
              fill="currentColor"
            />
          </svg>
        );
      case BeginnerRewardsType.FOLLOW_TWITTER:
    }
  };
  const renderButtonText = (type: BeginnerRewardsType) => {
    switch (type) {
      case BeginnerRewardsType.JOIN_DISCORD:
        return 'Join Now';
      case BeginnerRewardsType.UPDATE_PROFILE:
        return 'Edit My Profile';
      case BeginnerRewardsType.FOLLOW_TWITTER:
        return 'Link';
    }
  };

  const handleReward = (type: BeginnerRewardsType) => {
    switch (type) {
      case BeginnerRewardsType.JOIN_DISCORD:
        break;
      case BeginnerRewardsType.UPDATE_PROFILE:
        break;
      case BeginnerRewardsType.FOLLOW_TWITTER:
        break;
    }
  };
  return (
    <div className="h-[500px] rounded-[20px] px-[28px] py-[40px] bg-mission-center-box flex justify-between">
      <div>
        <span className="text-[16px] font-next-book-bold">Milestones</span>
        <div className="pl-[46px]">
          <Image
            src={
              theme === 'dark'
                ? BeginnerRewardsImgDark
                : BeginnerRewardsImgLight
            }
            alt="sphere"
            width={360}
            height={360}
            unoptimized
          />
        </div>
      </div>
      <div className="flex flex-col">
        {rewardData.map((item: MissionDataType, i: number) => (
          <div
            key={item.id}
            className={`relative w-[412px] mb-3 flex flex-shrink-0 justify-between h-[132px] bg-mission-center-beginner-bg rounded-[20px] px-5 py-[13px] ${
              i === 2 && 'mb-0'
            }`}
          >
            <div className="absolute left-0 top-0 w-[116px] h-[132px] text-mission-center-beginner-svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="116"
                height="132"
                viewBox="0 0 116 132"
                fill="none"
              >
                <path
                  d="M0 20C0 8.9543 8.95431 0 20 0H116L80.438 132H20C8.9543 132 0 123.046 0 112V20Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="w-[57px] h-full flex-col-center justify-between relative">
              <div
                className={`w-[57px] h-[54px]  flex-center ${
                  theme === 'dark'
                    ? "bg-[url('/images/mission-center/dark/beginner_icon_bg.svg')]"
                    : "bg-[url('/images/mission-center/light/beginner_icon_bg.svg')]"
                }`}
              >
                {renderIcon(item.type as BeginnerRewardsType)}
              </div>
              <div className="flex-col-center">
                <Image
                  src={Sphere}
                  alt="sphere"
                  width={20}
                  height={20}
                  unoptimized
                />
                <span className="font-next-book-bold">{item.exp}</span>
              </div>
            </div>
            <div className="flex flex-col justify-between w-[252px]">
              <p className="leading-[14px]">{item.description}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleReward(item.type as BeginnerRewardsType)}
                  className="base-btn w-[auto] text-mission-center-beginner-btn-color bg-mission-center-beginner-btn-bg px-[21px]"
                >
                  {renderButtonText(item.type as BeginnerRewardsType)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeginnerRewards;
