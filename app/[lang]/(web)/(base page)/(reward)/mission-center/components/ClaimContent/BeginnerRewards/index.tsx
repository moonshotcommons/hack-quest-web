import Button from '@/components/Common/Button';
import { MissionSubType } from '@/service/webApi/missionCenter/type';
import React, { useContext, useMemo } from 'react';

import TargetCard from '../component/TargetCard';
import { rewardsCardData } from './data';
import { BurialPoint } from '@/helper/burialPoint';
import { MissionCenterContext, TabContentType } from '../../../constants/type';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

const BeginnerRewards: React.FC<TabContentType> = ({ missionData, unClaimMissionData, missionClaim }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  const { missionIds } = useContext(MissionCenterContext);
  const isClaimAll = useMemo(() => {
    return missionData.filter((v) => v.progress.completed && v.progress.claimed).length === missionData?.length;
  }, [missionData]);
  const allIds = useMemo(() => {
    return unClaimMissionData.map((v) => v.id);
  }, [unClaimMissionData]);
  const handleAllClaim = () => {
    missionClaim(allIds);
    BurialPoint.track(`mission-center-beginner-rewards-claimAll 按钮点击`);
  };
  return (
    <div>
      <div className="mb-[40px] flex justify-between">
        <div className="w-[62%] text-neutral-black">{t('beginnerRewardsDescription')}</div>
        <Button
          className={`body-l h-[60px] w-[270px] border-auth-primary-button-border-color bg-auth-primary-button-bg uppercase
           text-neutral-black ${
             !allIds.length
               ? 'cursor-not-allowed opacity-50'
               : 'hover:border-auth-primary-button-border-hover-color hover:bg-auth-primary-button-hover-bg hover:text-auth-primary-button-text-hover-color'
           }`}
          disabled={!allIds.length}
          loading={missionIds.join() === allIds.join() && missionIds.length > 0}
          onClick={handleAllClaim}
        >
          {isClaimAll ? t('claimedAll') : `${t('claimAll')} (${allIds.length})`}
        </Button>
      </div>

      <div>
        <div className="body-l text-neutral-black">{t('targetsToAchieve')}</div>
        <div>
          {missionData.map((v, i) => {
            const subType = v.subType as MissionSubType;
            return (
              <TargetCard
                key={`${v}${i}`}
                missionData={v}
                missionClaim={missionClaim}
                targetIcon={rewardsCardData[subType].targetIcon}
                unClaimPath={rewardsCardData[subType].unClaimPath}
                unClaimText={t(rewardsCardData[subType].unClaimText)}
                type={rewardsCardData[subType].type}
                isScale={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BeginnerRewards;
