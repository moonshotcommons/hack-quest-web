import Button from '@/components/Common/Button';
import { MissionDataType, MissionStatus, MissionSubType } from '@/service/webApi/missionCenter/type';
import React, { useContext, useMemo, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { rewardsCardData, RewardsCardType } from '../../constants/data';
import message from 'antd/es/message';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import { useRedirect } from '@/hooks/router/useRedirect';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import MenuLink from '@/constants/MenuLink';
import { useUserStore } from '@/store/zustand/userStore';

interface ClaimButtonProp {
  missionData: MissionDataType;
  missionClaim: (ids: string[], cb?: VoidFunction) => void;
}

const ClaimButton: React.FC<ClaimButtonProp> = ({ missionData, missionClaim }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  const [loading, setLoading] = useState(false);
  const { updateMissionDataAll } = useGetMissionData();
  const userInfo = useUserStore((state) => state.userInfo);
  const { redirectToUrl } = useRedirect();
  const unInfo = useMemo(() => {
    const subType = missionData.subType as MissionSubType;
    return {
      unClaimPath: rewardsCardData[subType]?.unClaimPath || MenuLink.DASHBOARD,
      type: rewardsCardData[subType]?.type
    };
  }, [missionData]);
  const handleUnComplete = async () => {
    switch (unInfo.type) {
      case RewardsCardType.DISCORD:
        setLoading(true);
        try {
          const discordInfo = await webApi.userApi.getDiscordInfo();
          if (!discordInfo.isConnect) {
            message.info('Please bind first discord account!');
            setTimeout(() => {
              redirectToUrl(`${MenuLink.USER_PROFILE}/${userInfo?.username}`);
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
      default:
        unInfo.unClaimPath?.includes('http') ? window.open(unInfo.unClaimPath) : redirectToUrl(unInfo.unClaimPath);
    }
  };

  const handleClaim = () => {
    setLoading(true);
    missionClaim([missionData.id], () => {
      setLoading(false);
    });
  };

  const handleClick = () => {
    if (loading) return;
    switch (missionData.status) {
      case MissionStatus.UNCOMPLETED:
        return handleUnComplete();
      case MissionStatus.UNCLAIM:
        return handleClaim();
      default:
        return null;
    }
  };
  return (
    <Button
      loading={loading}
      className={`button-text-s h-[34px] w-[140px] uppercase text-neutral-off-black ${missionData.status === MissionStatus.UNCOMPLETED && 'border border-neutral-off-black'} ${missionData.status === MissionStatus.UNCLAIM && 'bg-yellow-primary'} ${missionData.status === MissionStatus.CLAIMED && 'cursor-not-allowed border border-neutral-off-black opacity-[0.5]'} `}
      onClick={handleClick}
    >
      {missionData.status === MissionStatus.UNCOMPLETED && t('goNow')}
      {missionData.status === MissionStatus.UNCLAIM && t('claim')}
      {missionData.status === MissionStatus.CLAIMED && t('claimed')}
    </Button>
  );
};

export default ClaimButton;
