import Button from '@/components/Common/Button';
import {
  BeginnerRewardsType,
  MissionDataType
} from '@/service/webApi/missionCenter/type';
import React, { useMemo } from 'react';
import IconHack from '@/public/images/mission-center/icon_hack.png';
import IconMetaMask from '@/public/images/mission-center/icon_meta_mask.png';
import IconDiscord from '@/public/images/mission-center/icon_discord_communitypng.png';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import IconXp from '@/public/images/mission-center/icon_xp.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import LeftArrowIcon from '@/components/Common/Icon/LeftArrow';
import { BurialPoint } from '@/helper/burialPoint';

interface TargetCardProp {
  missionData: MissionDataType;
  missionClaim: (missionIds: string[]) => void;
  targetIcon: any;
  unClaimText: string;
  unClaimPath: string;
  isShare?: boolean;
  isScale?: boolean;
}
const TargetCard: React.FC<TargetCardProp> = ({
  missionData,
  missionClaim,
  targetIcon,
  unClaimText,
  unClaimPath,
  isShare = false,
  isScale = true
}) => {
  const router = useRouter();
  const handleUnClaim = (item: MissionDataType) => {
    BurialPoint.track(`mission-center-unClaim按钮 点击 点击`, {
      buttonName: unClaimText
    });
    if (!isShare) {
      unClaimPath.includes('http')
        ? (window.location.href = unClaimPath)
        : router.push(unClaimPath);
    } else {
    }
  };
  return (
    <div
      key={missionData.id}
      className="h-[84px] rounded-[10px] border border-[#8C8C8C] mt-[15px] relative overflow-hidden"
    >
      <div
        className="h-full bg-auth-primary-button-bg opacity-40 absolute left-0 top-0"
        style={{
          width: `${
            (missionData.progress.progress[0] /
              missionData.progress.progress[1]) *
            100
          }%`
        }}
      ></div>
      <div className="absolute w-full h-full left-0 top-0 flex justify-between items-center px-[30px] ">
        <div className="flex-row-center gap-[20px]">
          <Image src={targetIcon} width={40} alt="icon"></Image>
          <span className="text-[16px]">
            {missionData.name}
            {isScale ||
              (isShare &&
                `(${missionData.progress.progress[0]}/${missionData.progress.progress[1]})`)}
          </span>
        </div>
        <div className="flex-row-center gap-[40px]">
          <div className="w-[76px] h-[40px] leading-[40px] text-[18px] border border-[#DADADA] bg-[#F4F4F4] rounded-r-[20px] relative pr-[15px] text-right">
            <Image
              src={IconCoin}
              width={40}
              alt="icon"
              className="absolute top-[-1px] left-[-20px]"
            ></Image>
            <span>{missionData.coin}</span>
          </div>
          <div className="w-[76px] h-[40px] leading-[40px] text-[18px] border border-[#DADADA] bg-[#F4F4F4] rounded-r-[20px] relative pr-[15px] text-right">
            <Image
              src={IconXp}
              width={40}
              alt="icon"
              className="absolute top-[-1px] left-[-20px]"
            ></Image>
            <span>{missionData.exp}</span>
          </div>
          {missionData.progress?.completed ? (
            <Button
              className={`w-[164px] ml-[-20px] h-[44px] text-[#0b0b0b] 
                                  bg-auth-primary-button-bg
                                  text-auth-primary-button-text-color 
                                  border-auth-primary-button-border-color ${
                                    missionData.progress.claimed
                                      ? 'opacity-50 cursor-not-allowed'
                                      : `hover:border-auth-primary-button-border-hover-color
                                         hover:text-auth-primary-button-text-hover-color 
                                         hover:bg-auth-primary-button-hover-bg`
                                  }`}
              disabled={missionData.progress.claimed}
              onClick={() => missionClaim([missionData.id])}
            >
              {missionData.progress.claimed ? 'Claimed' : 'Claim'}
            </Button>
          ) : (
            <Button
              className={`w-[164px] p-0 ml-[-20px] h-[44px] text-[14px] text-[#0b0b0b] 
              text-auth-primary-button-text-color  border
              border-[#0b0b0b]`}
              onClick={() => handleUnClaim(missionData)}
            >
              <div className="relative flex items-center">
                {unClaimText}
                {isShare && (
                  <div className="-rotate-90">
                    <LeftArrowIcon />
                  </div>
                )}
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TargetCard;
