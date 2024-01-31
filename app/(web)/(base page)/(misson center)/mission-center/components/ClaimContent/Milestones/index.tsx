import Button from '@/components/Common/Button';
import React, { useContext, useMemo } from 'react';
import IconHack from '@/public/images/mission-center/icon_hack.png';
import TargetCard from '../component/TargetCard';
import { BurialPoint } from '@/helper/burialPoint';
import { MissionCenterContext, TabContentType } from '../../../constants/type';

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
      <div className="mb-[40px]  flex justify-between">
        <div className="w-[62%] text-neutral-black">
          {`Celebrate your progress as you complete courses. Each achievement is a step towards your success in Web 3 coding. Let's make every milestone memorable! 🚀`}
        </div>
        <Button
          className={`body-l h-[60px] w-[270px] border-auth-primary-button-border-color bg-auth-primary-button-bg text-neutral-black ${
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
