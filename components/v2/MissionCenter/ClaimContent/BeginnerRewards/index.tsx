import Button from '@/components/Common/Button';
import { MissionSubType } from '@/service/webApi/missionCenter/type';
import React, { useMemo } from 'react';

import { useRouter } from 'next/router';
import TargetCard from '../Comonent/TargetCard';
import { TabContentType } from '../../type';
import { rewardsCardData } from './data';

const BeginnerRewards: React.FC<TabContentType> = ({
  missionData,
  unClaimMissionData,
  missionClaim
}) => {
  const allIds = useMemo(() => {
    return unClaimMissionData.map((v) => v.id);
  }, [unClaimMissionData]);
  return (
    <div>
      <div className="flex items-center justify-between mb-[40px]">
        <div className="text-[#000] w-[62%]">
          {`This special section is designed for newcomers, helping you ease into
          HackQuest while earning rewards. From profile updates to social
          connections, we're here to make your start as smooth as possible.
          Let's embark on this learning journey together! 🚀`}
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
          onClick={() => missionClaim(allIds)}
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
                isShare={rewardsCardData[subType].isShare}
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
