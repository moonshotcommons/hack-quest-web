import Button from '@/components/Common/Button';
import { MissionSubType } from '@/service/webApi/missionCenter/type';
import React, { useContext, useMemo } from 'react';

import TargetCard from '../component/TargetCard';
import { rewardsCardData } from './data';
import { BurialPoint } from '@/helper/burialPoint';
import { MissionCenterContext, TabContentType } from '../../../constants/type';

const BeginnerRewards: React.FC<TabContentType> = ({
  missionData,
  unClaimMissionData,
  missionClaim
}) => {
  const { missionIds, loading } = useContext(MissionCenterContext);
  const allIds = useMemo(() => {
    return unClaimMissionData.map((v) => v.id);
  }, [unClaimMissionData]);
  const handleAllClaim = () => {
    missionClaim(allIds);
    BurialPoint.track(`mission-center-beginner-rewards-claimAll 按钮点击`);
  };
  return (
    <div>
      <div className="mb-[40px] flex justify-between">
        <div className="w-[62%] text-neutral-black">
          {`We're here to help you get started on your HackQuest journey while also giving you the chance to earn rewards. Let's embark on this learning journey together! 🚀`}
        </div>
        <Button
          className={`body-l h-[60px] w-[270px] border-auth-primary-button-border-color bg-auth-primary-button-bg 
          tracking-[0.36px] 
          text-auth-primary-button-text-color text-neutral-black ${
            !allIds.length
              ? 'cursor-not-allowed opacity-50'
              : 'hover:border-auth-primary-button-border-hover-color hover:bg-auth-primary-button-hover-bg hover:text-auth-primary-button-text-hover-color'
          }`}
          disabled={!allIds.length}
          loading={missionIds.join() === allIds.join() && missionIds.length > 0}
          onClick={handleAllClaim}
        >
          Claim All ({allIds.length})
        </Button>
      </div>

      <div>
        <div className="body-l text-neutral-black">Targets to Achieve</div>
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
