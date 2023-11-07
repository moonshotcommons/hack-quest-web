import Button from '@/components/v2/Common/Button';
import { MissionDataType } from '@/service/webApi/missionCenter/type';
import React, { useContext, useEffect, useState } from 'react';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import IconXp from '@/public/images/mission-center/icon_xp.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import LeftArrowIcon from '@/components/Common/Icon/LeftArrow';
import { BurialPoint } from '@/helper/burialPoint';
import { RewardsCardType } from '../BeginnerRewards/data';
import webApi from '@/service';
import { MissionCenterContext } from '@/components/v2/MissionCenter/type';
import PopBox from '@/components/v2/Home/InviteCodeCard/PopBox';
import {
  ShareWrap,
  shareList
} from '@/components/v2/Home/InviteCodeCard/constant';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';

interface TargetCardProp {
  missionData: MissionDataType;
  missionClaim: (missionIds: string[], fn?: VoidFunction) => void;
  targetIcon: any;
  unClaimText: string;
  unClaimPath: string;
  type?: RewardsCardType;
  isScale?: boolean;
}
const TargetCard: React.FC<TargetCardProp> = ({
  missionData,
  missionClaim,
  targetIcon,
  unClaimText,
  unClaimPath,
  type,
  isScale = true
}) => {
  const userInfo = useGetUserInfo();
  const [showShare, setShowShare] = useState(false);
  // const [missionData, setmissionData] = useState<MissionDataType | Record<string, any>>(
  //   missionData
  // );
  const [loading, setLoading] = useState(false);
  const { missionIds, updateMissionDataAll } = useContext(MissionCenterContext);
  const router = useRouter();
  const handleUnClaim = () => {
    BurialPoint.track(`mission-center-unClaim按钮 点击 点击`, {
      buttonName: unClaimText
    });
    switch (type) {
      case RewardsCardType.DISCORD:
        setLoading(true);
        handleClaim();
        webApi.missionCenterApi
          .getMissionDiscord()
          .then((res) => {
            updateMissionDataAll();
            window.open(res.url);
          })
          .finally(() => {
            setLoading(false);
          });
        break;
      case RewardsCardType.SHARE:
        setShowShare(!showShare);
        break;
      default:
        unClaimPath.includes('http')
          ? window.open(unClaimPath)
          : router.push(unClaimPath);
    }
  };

  const handleClaim = () => {
    // changeClaim();
    missionClaim([missionData.id]);
  };

  // const changeClaim = () => {
  //   const newData = JSON.parse(JSON.stringify(missionData));
  //   newData.progress.claimed = true;
  //   setmissionData(newData);
  // };
  // useEffect(() => {
  //   setmissionData(missionData);
  // }, [missionData]);

  return (
    <div
      key={missionData.id}
      className={`h-[84px] rounded-[10px] border  mt-[15px] relative ${
        missionData.progress?.completed
          ? 'border-[#ffd850]'
          : 'border-[#8C8C8C]'
      }`}
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
            {(isScale || type === RewardsCardType.SHARE) &&
              `(${missionData.progress.progress[0]}/${missionData.progress.progress[1]})`}
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
                          border-auth-primary-button-border-color ${
                            missionData.progress.claimed
                              ? 'opacity-50 cursor-not-allowed '
                              : `hover:border-auth-primary-button-border-hover-color
                                  hover:text-auth-primary-button-text-hover-color 
                                  hover:bg-auth-primary-button-hover-bg`
                          }`}
              disabled={missionData.progress.claimed}
              loading={missionIds.includes(missionData.id)}
              onClick={() => handleClaim()}
            >
              {missionData.progress.claimed ? 'Claimed' : 'Claim'}
            </Button>
          ) : (
            <div className="relative">
              <Button
                className={`w-[164px] p-0 ml-[-20px] h-[44px] text-[14px] text-[#0b0b0b] 
              text-auth-primary-button-text-color  border
              border-[#0b0b0b]`}
                loading={loading}
                onClick={() => handleUnClaim()}
              >
                <div className="flex items-center">
                  {unClaimText}
                  {type === RewardsCardType.SHARE && (
                    <div
                      className={`${showShare ? 'rotate-90' : '-rotate-90'}`}
                    >
                      <LeftArrowIcon />
                    </div>
                  )}
                </div>
              </Button>
              {type === RewardsCardType.SHARE && showShare && (
                <PopBox className="top-[-260px] left-[-45px]">
                  {shareList(userInfo?.inviteCode || '').map((item) => {
                    return (
                      <ShareWrap
                        key={item.name}
                        name={item.name}
                        component={item.component}
                        icon={item.icon}
                        props={item.props}
                      ></ShareWrap>
                    );
                  })}
                </PopBox>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TargetCard;
