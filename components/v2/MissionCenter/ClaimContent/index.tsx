import React, { useMemo, useState } from 'react';
import { TabListType } from '../type';
import Tab from './Tab';
import DailyBonus from './DailyBonus';
import BeginnerRewards from './BeginnerRewards';
import DailyQuests from './DailyQuests';
import Milestones from './Milestones';
import BannerBg from '@/public/images/landing/banner_bg.png';
import { BurialPoint } from '@/helper/burialPoint';
import { useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';

interface ClaimContentProp {
  missionClaim: (missionIds: string[]) => void;
}
const ClaimContent: React.FC<ClaimContentProp> = ({ missionClaim }) => {
  const { missionData } = useSelector((state: AppRootState) => {
    return {
      missionData: state.missionCenter?.missionData
    };
  });
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
        return (
          <DailyBonus
            missionData={missionData.dailyBonus}
            missionClaim={missionClaim}
          />
        );
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
          <Milestones
            missionData={missionData.milestones}
            unClaimMissionData={missionData.unClaimDailyQuests}
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
    <div className="w-[calc(100%-360px)] h-full flex flex-col pt-[40px] pb-[20px]">
      <Tab curIndex={curIndex} tabList={tabList} changeTab={changeTab} />
      <div
        className="relative z-10 w-full overflow-x-hidden overflow-y-auto no-scrollbar rounded-b-[10px]"
        style={{
          ...contentStyle,
          boxShadow: `0 5px 6px #dadada`
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ClaimContent;
