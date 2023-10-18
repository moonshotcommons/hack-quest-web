import Button from '@/components/v2/Common/Button';
import { MissionDataType } from '@/service/webApi/missionCenter/type';
import React, { useContext, useMemo } from 'react';
import IconHack from '@/public/images/mission-center/icon_hack.png';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import IconXp from '@/public/images/mission-center/icon_xp.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import TargetCard from '../Comonent/TargetCard';
import { TabContentType } from '../../type';
import { BurialPoint } from '@/helper/burialPoint';
import { MissionCenterContext } from '@/pages/mission-center/type';

const DailyQuests: React.FC<TabContentType> = ({
  missionData,
  unClaimMissionData,
  missionClaim
}) => {
  const { missionIds } = useContext(MissionCenterContext);
  const allIds = useMemo(() => {
    return unClaimMissionData.map((v) => v.id);
  }, [unClaimMissionData]);
  const handleAllClaim = () => {
    BurialPoint.track(`mission-center-daily-quests-claimAll 按钮点击`);
    missionClaim(allIds);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-[40px]">
        <div className="text-[#000] w-[62%]">
          <p>{`Your coding adventure awaits with daily challenges to conquer. Complete tasks and be rewarded daily. Keep the momentum going and see what awaits! 💡`}</p>
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
          onClick={() => handleAllClaim}
        >
          Claim All ({allIds.length})
        </Button>
      </div>

      <div>
        <div className="text-[18px] text-[#000]">Targets to Achieve</div>
        <div>
          {missionData.map((v, i) => (
            <TargetCard
              key={`${v}${i}`}
              missionData={v}
              missionClaim={missionClaim}
              targetIcon={IconHack}
              unClaimPath={'/home'}
              unClaimText={'Go to Learning'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyQuests;
