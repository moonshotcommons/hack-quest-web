import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Ring from '../Ring';
import Sphere from '@/public/images/mission-center/sphere.png';
import { ThemeContext } from '@/store/context/theme';
import { MissionDataType } from '@/service/webApi/missionCenter/type';
import { useRouter } from 'next/router';
type QuestsType = {
  questsData: MissionDataType[];
  missionClaim: (missionIds: string[]) => void;
};
const Quests: React.FC<QuestsType> = ({ questsData, missionClaim }) => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const claimedRingPercent = theme === 'dark' ? 1 : 0;
  const [isClaim, setIsClaim] = useState(false);
  const [claimData, setClaimData] = useState<MissionDataType[]>([]);
  useEffect(() => {
    if (questsData.some((v: MissionDataType) => v?.progress.completed)) {
      setIsClaim(true);
      const cData = questsData.filter(
        (v: MissionDataType) => v.progress.completed && !v.progress.claimed
      );
      setClaimData(cData);
    } else {
      setIsClaim(false);
    }
  }, [questsData]);

  const handleClaim = () => {
    if (!claimData.length) return;
    const missionIds = claimData.map((v: MissionDataType) => v.id);
    missionClaim(missionIds);
  };
  return (
    <div className="bg-mission-center-box h-[220px] rounded-[20px] flex">
      <div className="relative h-full w-[189px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="189"
          height="220"
          viewBox="0 0 189 220"
          className="text-mission-center-quests absolute left-0 top-0"
          fill="currentColor"
        >
          <path d="M0 20C0 8.9543 8.9543 0 20 0H188.426L128.78 220H20C8.9543 220 0 211.046 0 200V20Z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="142"
          height="115"
          viewBox="0 0 142 115"
          className="text-mission-center-quests-d absolute left-0 bottom-0"
          fill="currentColor"
        >
          <path d="M141.739 67.2027L128.78 115H20C8.9543 115 0 106.046 0 95V17.2623C15.0458 6.40044 33.5254 0 53.5 0C95.6215 0 131.095 28.4618 141.739 67.2027Z" />
        </svg>
        <p className="absolute left-7 top-10 text-[16px] leading-[18px] font-bold">
          Daily <br /> Quests
        </p>
      </div>
      <div className="flex flex-1 flex-row-center justify-between pl-[10px]">
        {questsData.map((item: MissionDataType) => (
          <div className="w-[138px] flex-col-center" key={item.id}>
            <div
              className={`w-[138px] h-[138px] mb-[20px] relative quest-mission-center-box flex-center`}
            >
              <div className="absolute w-full h-full left-0 top-0 pointer-events-none">
                <Ring
                  radius={69}
                  percent={
                    item.progress.claimed
                      ? claimedRingPercent
                      : item.progress.progress[0] / item.progress.progress[1]
                  }
                />
              </div>
              {item.progress.claimed ? (
                <div className="flex items-center justify-center w-[122px] h-[122px] border-[0.5px] border-mission-center-quests-box rounded-[50%] leading-[15px] text-[14px] bg-[url('/images/mission-center/claimed_btn_bg.svg')]">
                  <button className="flex-center w-[79px] h-[40px] bg-claimed text-mission-center-claimed border border-mission-center-claimed rounded-[12px] cursor-not-allowed ">
                    Claimed
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-[122px] h-[122px] border-[0.5px] border-mission-center-quests-box rounded-[50%] leading-[15px] text-[14px]  hover:bg-mission-center-quests-box-hover hover:text-mission-center-quests-box-hover">
                  <div className="flex-col-center">
                    <p className="mb-[12px] text-left w-[60px]">{`${item.name}`}</p>
                    <p>{`${item.progress.progress[0]}/${item.progress.progress[1]}`}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-center">
              <Image
                src={Sphere}
                alt="sphere"
                width={20}
                height={20}
                unoptimized
              />
              <span className="ml-1">{item.exp}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-col-center justify-center w-[24%] h-full">
        <button
          onClick={handleClaim}
          className={`base-btn w-[53.56%] h-[39px] mb-[12px] ${
            !isClaim || !claimData.length
              ? 'text-mission-center-claimed-d bg-mission-center-claimed-d cursor-not-allowed'
              : 'bg-mission-center-tab-btn-claimed-bg text-mission-center-tab-btn-claimed-color'
          }`}
        >
          {isClaim && !claimData.length ? 'Claimed' : 'Claim'}
        </button>
        <button
          className="base-btn-bg w-[53.56%]"
          onClick={() => router.push('/courses')}
        >
          Start Learning
        </button>
      </div>
    </div>
  );
};

export default Quests;
