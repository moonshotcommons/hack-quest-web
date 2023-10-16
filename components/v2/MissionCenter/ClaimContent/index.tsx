import React, { useMemo, useState } from 'react';
import { TabListType } from '../type';
import Tab from './Tab';
import DailyBonus from './DailyBonus';
import BeginnerRewards from './BeginnerRewards';
import DailyQuests from './DailyQuests';
import Milestones from './Milestones';
import BannerBg from '@/public/images/landing/banner_bg.png';
import { MissionDataStateType } from '@/store/redux/modules/missionCenter';
import { BurialPoint } from '@/helper/burialPoint';

interface ClaimContentProp {
  missions: MissionDataStateType;
  missionClaim: (missionIds: string[]) => void;
}
const ClaimContent: React.FC<ClaimContentProp> = ({
  missions,
  missionClaim
}) => {
  const [curIndex, setCurIndex] = useState(0);
  const tabList = useMemo(() => {
    return [
      {
        label: 'Daily Bonus',
        count: missions?.unClaimDailyBonus?.length
      },
      {
        label: 'Beginner Rewards',
        count: missions?.unClaimBeginnerRewards?.length
      },
      {
        label: 'Daily Quests',
        count: missions?.unClaimDailyQuests?.length
      },
      {
        label: 'Milestones',
        count: missions?.unClaimMilestones?.length
      }
    ];
  }, [missions]);

  const changeTab = (i: number) => {
    if (i > 1) return;
    BurialPoint.track(`mission-center-切换tab`, { tab: tabList[i].label });
    setCurIndex(i);
  };

  const renderContent = () => {
    switch (curIndex) {
      case 0:
        return (
          <DailyBonus
            missionData={missions.dailyBonus}
            unClaimMissionData={missions.unClaimDailyBonus}
            missionClaim={missionClaim}
          />
        );
      case 1:
        return (
          <BeginnerRewards
            missionData={missions.beginnerRewards}
            unClaimMissionData={missions.unClaimBeginnerRewards}
            missionClaim={missionClaim}
          />
        );
      case 2:
        return (
          <DailyQuests
            missionData={missions.dailyQuests}
            unClaimMissionData={missions.unClaimDailyQuests}
            missionClaim={missionClaim}
          />
        );
      case 3:
        return (
          <Milestones
            missionData={missions.milestones}
            unClaimMissionData={missions.unClaimDailyQuests}
            missionClaim={missionClaim}
          />
        );
    }
  };

  const contentStyle = useMemo(() => {
    return !curIndex
      ? {
          background: `url(${BannerBg.src}) center  / 100% auto`,
          height: '699px'
        }
      : {
          background: `#fff`,
          padding: '30px',
          flex: 1
        };
  }, [curIndex]);
  return (
    <div className="w-[calc(100vw-400px)] pr-[40px] h-full flex flex-col py-[40px]">
      <Tab curIndex={curIndex} tabList={tabList} changeTab={changeTab} />
      <div
        className=" w-full overflow-x-hidden overflow-y-auto no-scrollbar rounded-b-[10px]"
        style={{
          ...contentStyle,
          boxShadow: `0 1px 6px #dadada`
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ClaimContent;
