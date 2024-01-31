import Button from '@/components/Common/Button';
import { MissionDataType } from '@/service/webApi/missionCenter/type';
import React, { useContext, useState } from 'react';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import IconXp from '@/public/images/mission-center/icon_xp.png';
import Image from 'next/image';
import LeftArrowIcon from '@/components/Common/Icon/LeftArrow';
import { BurialPoint } from '@/helper/burialPoint';
import { RewardsCardType } from '../BeginnerRewards/data';
import webApi from '@/service';
import PopBox from '@/components/Web/Business/InviteCodeCard/PopBox';
import {
  ShareWrap,
  shareList
} from '@/components/Web/Business/InviteCodeCard/constant';
import { useRedirect } from '@/hooks/useRedirect';
import { MissionCenterContext } from '../../../constants/type';
import { useUserStore } from '@/store/zustand/userStore';
import { ProfileHandleType } from '@/app/(web)/(base page)/(profile)/user/profile/constants/type';
import { message } from 'antd';
import { errorMessage } from '@/helper/ui';

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
  const userInfo = useUserStore((state) => state.userInfo);
  const [showShare, setShowShare] = useState(false);
  const [loading, setLoading] = useState(false);
  const { missionIds, updateMissionDataAll } = useContext(MissionCenterContext);
  const { redirectToUrl } = useRedirect();
  const handleUnClaim = async () => {
    BurialPoint.track(`mission-center-unClaim按钮 点击 点击`, {
      buttonName: unClaimText
    });
    switch (type) {
      case RewardsCardType.DISCORD:
        setLoading(true);
        // handleClaim();
        debugger;
        try {
          const discordInfo = await webApi.userApi.getDiscordInfo();
          if (!discordInfo.isConnect) {
            message.info('Please bind first discord account!');
            setTimeout(() => {
              redirectToUrl(
                `/user/profile?type=${ProfileHandleType.PERSONAL_EDIT}`
              );
            }, 1000);

            return;
          }
        } catch (e) {
          errorMessage(e);
        }

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
          : redirectToUrl(unClaimPath);
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
      className={`relative mt-[15px] h-[84px]  rounded-[10px] border ${
        missionData.progress?.completed
          ? 'border-yellow-primary'
          : 'border-neutral-medium-gray'
      }`}
    >
      <div
        className="absolute left-0 top-0 h-full rounded-[10px] bg-auth-primary-button-bg opacity-40"
        style={{
          width: `${
            (missionData.progress.progress[0] /
              missionData.progress.progress[1]) *
            100
          }%`
        }}
      ></div>
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-between px-[30px] ">
        <div className="flex-row-center gap-[20px]">
          <Image src={targetIcon} width={40} alt="icon"></Image>
          <span className="text-[16px]">
            {missionData.name}
            {(isScale || type === RewardsCardType.SHARE) &&
              `(${missionData.progress.progress[0]}/${missionData.progress.progress[1]})`}
          </span>
        </div>
        <div className="flex-row-center gap-[40px]">
          <div className="relative h-[40px] w-[76px] rounded-r-[20px] border border-neutral-light-gray bg-neutral-off-white pr-[15px] text-right text-[18px] leading-[40px]">
            <Image
              src={IconCoin}
              width={40}
              alt="icon"
              className="absolute left-[-20px] top-[-1px]"
            ></Image>
            <span>{missionData.coin}</span>
          </div>
          <div className="relative h-[40px] w-[76px] rounded-r-[20px] border border-neutral-light-gray bg-neutral-off-white pr-[15px] text-right text-[18px] leading-[40px]">
            <Image
              src={IconXp}
              width={40}
              alt="icon"
              className="absolute left-[-20px] top-[-1px]"
            ></Image>
            <span>{missionData.exp}</span>
          </div>
          {missionData.progress?.completed ? (
            <Button
              className={`ml-[-20px] h-[44px] w-[164px] border-auth-primary-button-border-color
                          bg-auth-primary-button-bg
                          text-neutral-black ${
                            missionData.progress.claimed
                              ? 'cursor-not-allowed opacity-50 '
                              : `hover:border-auth-primary-button-border-hover-color
                                  hover:bg-auth-primary-button-hover-bg
                                  hover:text-auth-primary-button-text-hover-color`
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
                className={`ml-[-20px] h-[44px] w-[164px] border border-neutral-black p-0
              text-[14px]  text-auth-primary-button-text-color
              text-neutral-black`}
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
                <PopBox className="left-[-45px] top-[-260px]">
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
