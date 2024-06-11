import { MissionDataType, MissionStatus } from '@/service/webApi/missionCenter/type';
import React, { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import RewardImage from '../RewardImage';
import CoinXp from '../CoinXp';
import ClaimButton from '../ClaimButton';

interface DailyCardProp {
  missionData: MissionDataType;
  missionClaim: (ids: string[], cb?: VoidFunction) => void;
}

const DailyCard: React.FC<DailyCardProp> = ({ missionData, missionClaim }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);

  return (
    <div
      className={`card-hover flex flex-col items-center gap-[16px] rounded-[16px] border border-neutral-light-gray px-[12px] py-[24px] ${missionData.status === MissionStatus.UNCLAIM ? 'bg-yellow-extra-light' : 'bg-neutral-white'}`}
    >
      <RewardImage missionData={missionData} />
      <div
        className={`text-center ${missionData.status === MissionStatus.CLAIMED ? 'text-neutral-medium-gray' : 'text-neutral-off-black'}`}
      >
        <div className={`body-m-bold  `}>
          {t('completeQuests', {
            number: missionData?.progress?.progress?.[1]
          })}
        </div>
        <p className="body-s mt-[4px] ">{`${missionData?.progress?.progress?.[0]} / ${missionData?.progress?.progress?.[1]}`}</p>
      </div>
      <div className="mt-[4px] rounded-[100px] bg-neutral-white px-[12px] py-[4px]">
        <CoinXp missionData={missionData} />
      </div>
      <ClaimButton missionData={missionData} missionClaim={missionClaim} />
    </div>
  );
};

export default DailyCard;
