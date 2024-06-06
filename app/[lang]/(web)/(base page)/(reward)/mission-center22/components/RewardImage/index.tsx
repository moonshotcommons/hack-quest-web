import React from 'react';
import RewardIcon from '@/public/images/mission-center/reward_icon.png';
import Image from 'next/image';
import { MissionDataType, MissionStatus } from '@/service/webApi/missionCenter/type';
import CompletedIcon from '@/components/Common/Icon/Completed';

interface RewardImageProp {
  missionData: MissionDataType;
}

const RewardImage: React.FC<RewardImageProp> = ({ missionData }) => {
  return (
    <div className="relative rounded-[8px] bg-yellow-light p-[8px]">
      <Image src={RewardIcon} alt={'reward-icon'} width={32} height={34} />
      {missionData.status === MissionStatus.CLAIMED && (
        <div className="absolute right-0 top-0 translate-x-[50%] translate-y-[-50%]">
          <CompletedIcon />
        </div>
      )}
    </div>
  );
};

export default RewardImage;
