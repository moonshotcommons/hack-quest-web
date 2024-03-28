import React, { useMemo, useState } from 'react';
import Tab from './Tab';
import DailyBonus from './DailyBonus';
import BeginnerRewards from './BeginnerRewards';
import DailyQuests from './DailyQuests';
import Milestones from './Milestones';
import MoonBg from '@/public/images/mission-center/moon_bg.png';
import { BurialPoint } from '@/helper/burialPoint';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';

interface ClaimContentProp {
  missionClaim: (missionIds: string[]) => void;
}
const ClaimContent: React.FC<ClaimContentProp> = ({ missionClaim }) => {
  const missionData = useMissionCenterStore((state) => state.missionData);
  const [curIndex, setCurIndex] = useState(0);

  const tabList = useMemo(() => {
    return [
      {
        label: 'Daily Bonus',
        count: missionData?.unClaimDailyBonus?.length
      },
      {
        label: 'Beginner Rewards',
        count: missionData?.unClaimBeginnerRewards?.length
      },
      {
        label: 'Daily Quests',
        count: missionData?.unClaimDailyQuests?.length
      },
      {
        label: 'Milestones',
        count: missionData?.unClaimMilestones?.length
      }
    ];
  }, [missionData]);

  const changeTab = (i: number) => {
    BurialPoint.track(`mission-center-切换tab`, { tab: tabList[i].label });
    setCurIndex(i);
  };

  const renderContent = () => {
    switch (curIndex) {
      case 0:
        return <DailyBonus missionData={missionData.dailyBonus} missionClaim={missionClaim} />;
      case 1:
        return (
          <BeginnerRewards
            missionData={missionData.beginnerRewards}
            unClaimMissionData={missionData.unClaimBeginnerRewards}
            missionClaim={missionClaim}
          />
        );
      case 2:
        return (
          <DailyQuests
            missionData={missionData.dailyQuests}
            unClaimMissionData={missionData.unClaimDailyQuests}
            missionClaim={missionClaim}
          />
        );
      case 3:
        return (
          <Milestones missionData={missionData.milestones} unClaimMissionData={missionData.unClaimMilestones} missionClaim={missionClaim} />
        );
    }
  };

  const contentStyle = useMemo(() => {
    return !curIndex
      ? {
          background: `url(${MoonBg.src}) #FFF4CE center bottom / auto 450px no-repeat`,
          height: '699px'
        }
      : {
          background: `#fff`,
          padding: '30px',
          flex: 1
        };
  }, [curIndex]);
  return (
    <div className="flex h-full w-[calc(100%-360px)] flex-col pb-[20px] pt-[40px]">
      <Tab curIndex={curIndex} tabList={tabList} changeTab={changeTab} />
      <div
        className="no-scrollbar relative z-10 w-full overflow-y-auto overflow-x-hidden rounded-b-[10px] rounded-r-[10px]"
        style={{
          ...contentStyle,
          boxShadow: `0 5px 6px #dadada`
        }}
      >
        {missionData?.all?.length > 0 && renderContent()}
      </div>
    </div>
  );
};

export default ClaimContent;
