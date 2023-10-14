import Button from '@/components/Common/Button';
import { MissionDataType } from '@/service/webApi/missionCenter/type';
import React, { useMemo } from 'react';
import IconHack from '@/public/images/mission-center/icon_hack.png';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import IconXp from '@/public/images/mission-center/icon_xp.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import TargetCard from '../Comonent/TargetCard';
import { TabContentType } from '../../type';

const Milestones: React.FC<TabContentType> = ({
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
          {`Celebrate your progress as you complete courses and earn exciting rewards. Each achievement is a step towards your Web 3 coding success. Let's make every milestone memorable! 🚀`}
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
          {missionData.map((v, i) => (
            <TargetCard
              key={`${v}${i}`}
              missionData={v}
              missionClaim={missionClaim}
              targetIcon={IconHack}
              unClaimPath={'/home'}
              unClaimText={'Go to Dashboard'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Milestones;
