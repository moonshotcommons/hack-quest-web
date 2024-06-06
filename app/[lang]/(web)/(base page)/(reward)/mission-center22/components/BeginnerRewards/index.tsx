import React, { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { MissionDataType } from '@/service/webApi/missionCenter/type';
import TargetCard from '../TargetCard';

interface BeginnerRewardsProp {
  missionDatas: MissionDataType[];
  missionClaim: (ids: string[], cb?: VoidFunction) => void;
}

const BeginnerRewards: React.FC<BeginnerRewardsProp> = ({ missionDatas, missionClaim }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  return (
    <div>
      <div className="text-h35 mb-[24px] text-neutral-off-black">{t('beginnerRewards')}</div>
      <div className="flex flex-col gap-[32px] rounded-[24px] border border-neutral-light-gray bg-neutral-white p-[24px]">
        {missionDatas.map((m) => (
          <div key={m.id} className="w-full">
            <TargetCard missionData={m} missionClaim={missionClaim} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeginnerRewards;
