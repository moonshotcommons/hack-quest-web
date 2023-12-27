import Button from '@/components/v2/Common/Button';
import React, { useContext, useMemo } from 'react';
import IconHack from '@/public/images/mission-center/icon_hack.png';
import TargetCard from '../component/TargetCard';
import { TabContentType } from '../../type';
import { BurialPoint } from '@/helper/burialPoint';
import { MissionCenterContext } from '@/components/v2/MissionCenter/type';

const Milestones: React.FC<TabContentType> = ({
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
    BurialPoint.track(`mission-center-milestones-claimAll 按钮点击`);
  };
  return (
    <div>
      <div className="flex  justify-between mb-[40px]">
        <div className="text-[#000] w-[62%]">
          {`Celebrate your progress as you complete courses. Each achievement is a step towards your success in Web 3 coding. Let's make every milestone memorable! 🚀`}
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
          {missionData.map((v, i) => (
            <TargetCard
              key={`${v}${i}`}
              missionData={v}
              missionClaim={missionClaim}
              targetIcon={IconHack}
              unClaimPath={'/dashboard'}
              unClaimText={'Go to Learning'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Milestones;
