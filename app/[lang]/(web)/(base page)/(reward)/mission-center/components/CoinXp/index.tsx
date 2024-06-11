import { MissionDataType } from '@/service/webApi/missionCenter/type';
import Image from 'next/image';
import React from 'react';
import CoinIcon from '@/public/images/mission-center/coin_icon.png';
import XpIcon from '@/public/images/mission-center/xp_icon.png';

interface CoinXpProp {
  missionData: MissionDataType;
}

const CoinXp: React.FC<CoinXpProp> = ({ missionData }) => {
  return (
    <div className="body-m flex items-center gap-[16px] text-neutral-medium-gray">
      <div className="flex items-center gap-[4px]">
        <span>{missionData.coin ?? 0}</span>
        <Image src={CoinIcon} alt={'coin-icon'} width={20} height={20} />
      </div>
      <div className="flex items-center gap-[4px]">
        <span>{missionData.exp ?? 0}</span>
        <Image src={XpIcon} alt={'xp-icon'} width={20} height={20} />
      </div>
    </div>
  );
};

export default CoinXp;
