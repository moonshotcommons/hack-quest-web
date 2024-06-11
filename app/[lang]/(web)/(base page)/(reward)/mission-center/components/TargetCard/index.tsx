import { MissionDataType, MissionStatus } from '@/service/webApi/missionCenter/type';
import React from 'react';
import RewardImage from '../RewardImage';
import CoinXp from '../CoinXp';
import ClaimButton from '../ClaimButton';

interface TargetCardProp {
  missionData: MissionDataType;
  missionClaim: (ids: string[], cb?: VoidFunction) => void;
}

const TargetCard: React.FC<TargetCardProp> = ({ missionData, missionClaim }) => {
  return (
    <div
      className={`flex items-center justify-between gap-[16px] rounded-[16px]  bg-neutral-white p-[12px] ${missionData.status === MissionStatus.UNCLAIM ? 'bg-yellow-extra-light' : 'bg-neutral-white'}`}
    >
      <div className="flex items-center gap-[24px]">
        <RewardImage missionData={missionData} />
        <div>
          <div
            className={`mb-[4px] text-center ${missionData.status === MissionStatus.CLAIMED ? 'text-neutral-medium-gray' : 'text-neutral-off-black'}`}
          >
            <div className={`body-m-bold  `}>{missionData?.name}</div>
          </div>
          <CoinXp missionData={missionData} />
        </div>
      </div>
      <ClaimButton missionData={missionData} missionClaim={missionClaim} />
    </div>
  );
};

export default TargetCard;
