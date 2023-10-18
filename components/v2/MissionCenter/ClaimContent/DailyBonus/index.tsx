import { MissionDataType } from '@/service/webApi/missionCenter/type';
import React, { useMemo, useState } from 'react';
import MoonFace from '@/public/images/mission-center/moon_face.png';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import IconXp from '@/public/images/mission-center/icon_xp.png';
import IconLock from '@/public/images/mission-center/icon_lock.png';
import Pit from '@/public/images/mission-center/pit.png';
import PitM from '@/public/images/mission-center/pit_m.png';
import Flag from '@/public/images/mission-center/flag.png';
import Qmark from '@/public/images/mission-center/q_mark.png';
import Mperson from '@/public/images/mission-center/m_person.png';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import {
  ChangeState,
  ScrollContainer
} from '@/components/Common/ScrollContainer';
import ScrollControl from './ScrollControl';
import { TabContentType } from '../../type';

const DailyBonus: React.FC<Omit<TabContentType, 'unClaimMissionData'>> = ({
  missionData,
  missionClaim
}) => {
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();
  const dealedMissionData = useMemo(() => {
    const mData =
      [...missionData]?.sort(
        (a: MissionDataType, b: MissionDataType) =>
          a?.progress?.progress?.[0] - b?.progress?.progress?.[0]
      ) || [];
    const completedLen = missionData.filter((v) => v.progress.completed).length;
    return {
      mData,
      completedLen
    };
  }, [missionData]);
  const renderClaimContent = (item: MissionDataType, i: number) => {
    const completed = item.progress?.completed;
    const claimed = item.progress?.claimed;
    if (completed) {
      return (
        <div
          key={i}
          className="w-[293px]  flex-col-center h-full justify-between pb-[20px]"
        >
          <div
            className={`border rounded-[20px]  bg-[#131313] w-[240px] h-[300px] 
                  border-[#E7A600] flex-col-center justify-between pt-[30px] pb-[20px] `}
            style={{
              boxShadow: `0 0 10px #FFD850`
            }}
          >
            <div className="flex-col-center">
              <div className="text-[24px]">{`Day ${i + 1}`}</div>
              <div className="w-[165px] flex justify-between mt-[20px]">
                <div>
                  <Image src={IconCoin} width={60} alt="iconCoin" />
                  <div className="w-[60px] h-[28px] rounded-[20px] mt-[10px] flex-center bg-[#3E3E3E]">
                    {item.coin}
                  </div>
                </div>
                <div>
                  <Image src={IconXp} width={60} alt="iconXp" />
                  <div className="w-[60px] h-[28px] rounded-[20px] mt-[10px] flex-center bg-[#3E3E3E]">
                    {item.exp}
                  </div>
                </div>
              </div>
            </div>
            <Button
              className={`w-[164px] text-[16px]  h-[44px] bg-auth-primary-button-bg
                      border-auth-primary-button-border-color p-0 text-[#0b0b0b] ${
                        claimed
                          ? 'cursor-not-allowed opacity-50'
                          : `hover:border-auth-primary-button-border-hover-color 
                            hover:text-auth-primary-button-text-hover-color 
                            hover:bg-auth-primary-button-hover-bg  `
                      }`}
              disabled={claimed}
              onClick={() => missionClaim([item.id])}
            >
              {claimed ? 'Claimed' : 'Claim'}
            </Button>
          </div>
          <div
            className="w-[293px] h-[104px] relative"
            style={{
              backgroundImage: `url(${!claimed ? PitM.src : Pit.src})`,
              backgroundSize: `100% 100%`
            }}
          >
            {dealedMissionData.completedLen === i + 1 && (
              <div className="absolute right-[-120px] top-[-185px]">
                <Image src={Mperson} width={190} alt="Mperson" className="" />
                {claimed ? (
                  <div className="absolute right-[-35px] top-[25px]">
                    <div className="flex-row-center gap-[8px]">
                      <Image
                        src={IconCoin}
                        width={20}
                        alt="iconCoin"
                        className=""
                      />
                      <span className="text-[16px]">{`X${item.coin}`}</span>
                    </div>
                    <div className="flex-row-center gap-[8px] mt-[10px]">
                      <Image
                        src={IconXp}
                        width={20}
                        alt="iconCoin"
                        className=""
                      />
                      <span className="text-[16px]">{`X${item.exp}`}</span>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={Qmark}
                    width={50}
                    alt="flag"
                    className="absolute right-[10px] top-[12px]"
                  />
                )}
              </div>
            )}

            {claimed && (
              <Image
                src={Flag}
                width={80}
                alt="flag"
                className="absolute left-[65px] top-[-55px]"
              />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={i}
          className={`border rounded-[20px]  bg-[#131313] w-[184px] h-[230px] border-[#8C8C8C]
              flex-col-center justify-between pt-[30px] pb-[30px] `}
        >
          <div className="flex-col-center">
            <div className="text-[18px]">{`Day ${i + 1}`}</div>
            <div className="w-[104px] flex justify-between mt-[20px]">
              <div>
                <Image src={IconCoin} width={40} alt="iconCoin" />
                <div className="w-[40px] h-[20px] text-[12px] rounded-[20px] mt-[8px] flex-center bg-[#3E3E3E]">
                  {item.coin}
                </div>
              </div>
              <div>
                <Image src={IconXp} width={40} alt="iconXp" />
                <div className="w-[40px] h-[20px] text-[12px] rounded-[20px] mt-[8px] flex-center bg-[#3E3E3E]">
                  {item.exp}
                </div>
              </div>
            </div>
          </div>
          <Image
            src={IconLock}
            width={26}
            alt="iconLock"
            className="cursor-not-allowed"
          />
        </div>
      );
    }
  };
  return (
    <div className="text-[#fff] h-full flex flex-col overflow-hidden">
      <div className="w-full flex-1 overflow-y-auto overflow-x-hidden no-scrollbar ">
        <div className="pt-[30px] w-full overflow-x-hidden">
          <div className="flex px-[30px] items-center justify-between mb-[20px]">
            <span className="text-[24px] font-next-book-bold">
              Daily Login Rewards
            </span>
          </div>
          <div className="relative">
            <ScrollContainer
              onChange={(state: any) => setScrollContainerState(state)}
            >
              <div
                className={`py-[10px] pl-[10px]  flex gap-[20px] overflow-x-hidden h-[619px] ${
                  dealedMissionData.completedLen === missionData.length
                    ? 'pr-[250px]'
                    : 'pr-[30px]'
                }`}
                style={{
                  backgroundImage: `url(${MoonFace.src})`,
                  backgroundPosition: `0 bottom`,
                  backgroundSize: `100% 154px`,
                  backgroundRepeat: 'repeat-x'
                }}
              >
                {dealedMissionData.mData.map((v, i) =>
                  renderClaimContent(v, i)
                )}
              </div>
            </ScrollContainer>
            <div className="absolute left-[33px] bottom-[35px] z-40">
              <ScrollControl changeState={scrollContainerState}></ScrollControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyBonus;
