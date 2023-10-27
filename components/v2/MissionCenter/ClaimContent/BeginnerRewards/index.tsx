import Button from '@/components/v2/Common/Button';
import { MissionSubType } from '@/service/webApi/missionCenter/type';
import React, { useContext, useMemo } from 'react';

import TargetCard from '../Comonent/TargetCard';
import { TabContentType } from '../../type';
import { rewardsCardData } from './data';
import { BurialPoint } from '@/helper/burialPoint';
import { MissionCenterContext } from '@/components/v2/MissionCenter/type';

const BeginnerRewards: React.FC<TabContentType> = ({
  missionData,
  unClaimMissionData,
  missionClaim
}) => {
  const { missionIds } = useContext(MissionCenterContext);
  const allIds = useMemo(() => {
    return unClaimMissionData.map((v) => v.id);
  }, [unClaimMissionData]);
  const handleAllClaim = () => {
    missionClaim(allIds);
    BurialPoint.track(`mission-center-beginner-rewards-claimAll 按钮点击`);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-[40px]">
        <div className="text-[#000] w-[62%]">
          {`We're here to help you get started on your HackQuest journey while also giving you the chance to earn rewards. Let's embark on this learning journey together! 🚀`}
        </div>
        <Button
          className={`w-[270px] h-[60px] text-[18px] text-[#0b0b0b] bg-auth-primary-button-bg 
          text-auth-primary-button-text-color 
          border-auth-primary-button-border-color tracking-[0.36px] ${
            !allIds.length
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:border-auth-primary-button-border-hover-color hover:text-auth-primary-button-text-hover-color hover:bg-auth-primary-button-hover-bg'
          }`}
          disabled={!allIds.length}
          loading={missionIds.join() === allIds.join() && missionIds.length > 0}
          onClick={handleAllClaim}
        >
          Claim All ({allIds.length})
        </Button>
      </div>

      <div>
        <div className="text-[18px] text-[#000]">Targets to Achieve</div>
        <div>
          {missionData.map((v, i) => {
            const subType = v.subType as MissionSubType;
            return (
              <TargetCard
                key={`${v}${i}`}
                missionData={v}
                missionClaim={missionClaim}
                targetIcon={rewardsCardData[subType].targetIcon}
                unClaimPath={rewardsCardData[subType].unClaimPath}
                unClaimText={rewardsCardData[subType].unClaimText}
                type={rewardsCardData[subType].type}
                isScale={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BeginnerRewards;
