import { MissionDataType } from '@/service/webApi/missionCenter/type';
import React, { useEffect, useRef, useState } from 'react';
import MoonFace from '@/public/images/mission-center/moon_face1.png';
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
import { TabContentType } from '../../../constants/type';

const DailyBonus: React.FC<Omit<TabContentType, 'unClaimMissionData'>> = ({
  missionData,
  missionClaim
}) => {
  const [curIndex, setCurIndex] = useState(-1);
  const [refreshTime, setRefreshTime] = useState('');
  const [dealedMissionData, setDealedMissionData] = useState<{
    mData: MissionDataType[];
    completedLen: number;
  }>({
    mData: [],
    completedLen: 0
  });
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();
  const scrollContainerRef = useRef<any>();
  const isTranslate = useRef(false);
  const handleClaim = (i: number) => {
    setCurIndex(i);
    missionClaim([dealedMissionData.mData[i].id], () => {
      // let newData = JSON.parse(JSON.stringify(dealedMissionData));
      // newData.mData[i].progress.claimed = true;
      // setDealedMissionData(newData);
      setCurIndex(-1);
    });
  };
  const renderClaimContent = (item: MissionDataType, i: number) => {
    const completed = item.progress?.completed;
    const claimed = item.progress?.claimed;
    if (completed) {
      return (
        <div
          key={i}
          className="flex-col-center  h-full w-[293px] justify-between pb-[20px]"
        >
          <div
            className={`flex-col-center h-[300px]  w-[240px] justify-between rounded-[20px]
                  border border-[#E7A600] bg-[var(--neutral-off-black)] pb-[20px] pt-[30px] `}
            style={{
              boxShadow: `0 0 10px var(--yellow-primary)`
            }}
          >
            <div className="flex-col-center">
              <div className="text-[24px] text-[#fff] ">{`Day ${i + 1}`}</div>
              <div className="mt-[20px] flex w-[165px] justify-between">
                <div>
                  <Image src={IconCoin} width={60} alt="iconCredits" />
                  <div className="flex-center mt-[10px] h-[28px] w-[60px] rounded-[20px] bg-neutral-off-white">
                    {item.coin}
                  </div>
                </div>
                <div>
                  <Image src={IconXp} width={60} alt="iconXp" />
                  <div className="flex-center mt-[10px] h-[28px] w-[60px] rounded-[20px] bg-neutral-off-white">
                    {item.exp}
                  </div>
                </div>
              </div>
            </div>
            <Button
              className={`h-[44px] w-[164px]  border-auth-primary-button-border-color bg-auth-primary-button-bg
                      p-0 text-[16px] text-neutral-black ${
                        claimed
                          ? 'cursor-not-allowed opacity-50'
                          : `hover:border-auth-primary-button-border-hover-color
                            hover:bg-auth-primary-button-hover-bg
                            hover:text-auth-primary-button-text-hover-color  `
                      }`}
              disabled={claimed}
              loading={curIndex === i}
              onClick={() => handleClaim(i)}
            >
              {claimed ? 'Claimed' : 'Claim'}
            </Button>
          </div>
          <div
            className="relative h-[104px] w-[293px]"
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
                        alt="iconCredits"
                        className=""
                      />
                      <span className="text-[16px]">{`X${item.coin}`}</span>
                    </div>
                    <div className="flex-row-center mt-[10px] gap-[8px]">
                      <Image
                        src={IconXp}
                        width={20}
                        alt="iconXP"
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
          className={`flex-col-center h-[230px]  w-[184px] justify-between rounded-[20px] border
              border-neutral-medium-gray bg-[var(--neutral-off-black)] pb-[30px] pt-[30px] `}
        >
          <div className="flex-col-center">
            <div className="text-[18px] text-[#fff] ">{`Day ${i + 1}`}</div>
            <div className="mt-[20px] flex w-[104px] justify-between">
              <div>
                <Image src={IconCoin} width={40} alt="iconCredits" />
                <div className="flex-center mt-[8px] h-[20px] w-[40px] rounded-[20px] bg-neutral-off-white text-[12px]">
                  {item.coin}
                </div>
              </div>
              <div>
                <Image src={IconXp} width={40} alt="iconXp" />
                <div className="flex-center mt-[8px] h-[20px] w-[40px] rounded-[20px] bg-neutral-off-white text-[12px]">
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

  useEffect(() => {
    if (isTranslate.current) return;
    if (
      scrollContainerState &&
      scrollContainerState?.listWidth > 1200 &&
      dealedMissionData.completedLen > 0
    ) {
      const { containerWidth, listWidth } = scrollContainerState;
      let translateX = 313 * (dealedMissionData.completedLen - 1);
      if (listWidth - Math.abs(translateX) < containerWidth) {
        translateX = listWidth - containerWidth;
      }
      scrollContainerRef.current?.handlesetTranslateX(translateX * -1);
      isTranslate.current = true;
    }
  }, [dealedMissionData.completedLen, scrollContainerState]);

  useEffect(() => {
    const mData =
      [...missionData]?.sort(
        (a: MissionDataType, b: MissionDataType) =>
          a?.progress?.progress?.[0] - b?.progress?.progress?.[0]
      ) || [];
    const completedLen = missionData.filter((v) => v.progress.completed).length;
    setRefreshTime(`${6 - completedLen}d${24 - new Date().getHours()}h`);
    setDealedMissionData({
      mData,
      completedLen
    });
  }, [missionData]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="no-scrollbar w-full flex-1 overflow-y-auto overflow-x-hidden ">
        <div className="w-full overflow-x-hidden pt-[30px]">
          <div className="mb-[20px] flex items-center justify-between px-[30px]">
            <span className="font-next-book-bold text-[24px]">
              Daily Login Rewards
            </span>
            <span className="text-[18px]">
              Rewards Refresh In: {refreshTime}
            </span>
          </div>
          <div className="relative">
            <ScrollContainer
              ref={scrollContainerRef}
              onChange={(state: any) => setScrollContainerState(state)}
            >
              <div
                className={`flex h-[619px]  gap-[20px] overflow-x-hidden py-[10px] pl-[10px] ${
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
            <div className="absolute bottom-[25px] left-[33px] z-40">
              <ScrollControl changeState={scrollContainerState}></ScrollControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyBonus;
